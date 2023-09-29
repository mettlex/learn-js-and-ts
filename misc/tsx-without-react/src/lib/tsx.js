// @ts-check

const ESCAPED_REGEX = /[<"'&]/;
const CAMEL_REGEX = /[a-z][A-Z]/;

/** @type {import('./tsx').escapeHtml} */
let escapeHtml = function (value) {
  if (typeof value !== "string") {
    value = value.toString();
  }

  // This is a optimization to avoid the whole conversion process when the
  // string does not contain any uppercase characters.
  if (!ESCAPED_REGEX.test(value)) {
    return value;
  }

  const length = value.length;
  let escaped = "";

  let start = 0;
  let end = 0;

  // Escapes double quotes to be used inside attributes
  // Faster than using regex
  // https://jsperf.app/kakihu
  for (; end < length; end++) {
    // https://wonko.com/post/html-escaping
    switch (value[end]) {
      case "&":
        escaped += value.slice(start, end) + "&amp;";
        start = end + 1;
        continue;
      // We don't need to escape > because it is only used to close tags.
      // https://stackoverflow.com/a/9189067
      case "<":
        escaped += value.slice(start, end) + "&lt;";
        start = end + 1;
        continue;
      case '"':
        escaped += value.slice(start, end) + "&#34;";
        start = end + 1;
        continue;
      case "'":
        escaped += value.slice(start, end) + "&#39;";
        start = end + 1;
        continue;
    }
  }

  // Appends the remaining string.
  escaped += value.slice(start, end);

  return escaped;
};

/* c8 ignore next 2 */
// @ts-ignore - bun runtime have its own escapeHTML function.
if (typeof Bun !== "undefined") escapeHtml = Bun.escapeHTML;

/** @type {import('./tsx').attributesToString} */
function attributesToString(attributes) {
  const keys = Object.keys(attributes);
  const length = keys.length;

  let key, value, type, end, start;
  let result = "";
  let index = 0;

  for (; index < length; index++) {
    key = keys[index];

    // Skips all @kitajs/html specific attributes.
    if (key === "children" || key === "safe") {
      continue;
    }

    // Event handlers are irrelevant
    if (key.startsWith("on")) {
      continue;
    }

    // @ts-ignore - this indexing is safe.
    value = attributes[key];

    // React className compatibility.
    if (key === "className") {
      // @ts-expect-error - both were provided, so use the class attribute.
      if (attributes.class !== undefined) {
        continue;
      }

      key = "class";
    }

    if (key === "style") {
      result += ' style="' + styleToString(value) + '"';
      continue;
    }

    type = typeof value;

    if (type === "boolean") {
      // Only add the attribute if the value is true.
      if (value) {
        result += " " + key;
      }

      continue;
    }

    if (value === null || value === undefined) {
      continue;
    }

    result += " " + key;

    if (type !== "string") {
      // Non objects are
      if (type !== "object") {
        result += '="' + value.toString() + '"';
        continue;

        // Dates are always safe
      } else if (value instanceof Date) {
        result += '="' + value.toISOString() + '"';
        continue;
      }

      // The object may have a overridden toString method.
      // Which results in a non escaped string.
      value = value.toString();
    }

    end = value.indexOf('"');

    // This is a optimization to avoid having to look twice for the " character.
    // And make the loop already start in the middle
    if (end === -1) {
      result += '="' + value + '"';
      continue;
    }

    result += '="';

    const length = value.length;
    start = 0;

    // Escapes double quotes to be used inside attributes
    // Faster than using regex
    // https://jsperf.app/kakihu
    for (; end < length; end++) {
      if (value[end] === '"') {
        result += value.slice(start, end) + "&#34;";
        start = end + 1;
      }
    }

    // Appends the remaining string.
    result += value.slice(start, end) + '"';
  }

  return result;
}

/**
 * @type {import('./tsx').contentsToString}
 * @returns {any}
 */
function contentsToString(contents, escape) {
  const length = contents.length;

  let result = "";
  let content;
  let index = 0;

  for (; index < length; index++) {
    content = contents[index];

    if (typeof content !== "string") {
      // Ignores non 0 falsy values
      if (!content && content !== 0) {
        continue;
      }

      if (Array.isArray(content)) {
        content = contentsToString(content);
      }

      // @ts-expect-error - Also accepts thenable objects, not only promises
      // https://jsperf.app/zipuvi
      if (content.then) {
        // @ts-expect-error - this is a promise
        return content.then(function resolveAsyncContent(resolved) {
          return contentsToString(
            [result, resolved]
              // if we also pass escape here, it would double escape this result
              // with the above call.
              .concat(contents.slice(index + 1)),
            escape,
          );
        });
      }
    }

    result += content;
  }

  // escapeHtml is faster with longer strings, that's
  // why we escape the entire result once
  if (escape === true) {
    return escapeHtml(result);
  }

  return result;
}

/**
 * Just to stop TS from complaining about the type.
 *
 * @type {import('./tsx').createElement}
 * @param {any} name
 * @returns {any}
 */
export function createElement(name, attrs, ...children) {
  // Adds the children to the attributes if it is not present.
  if (attrs === null) {
    attrs = { children };
  }

  // Calls the element creator function if the name is a function
  if (typeof name === "function") {
    // In case the children attributes is not present, add it as a property.
    if (attrs.children === undefined) {
      // When only a single child is present, unwrap it.
      if (children.length > 1) {
        attrs.children = children;
      } else {
        attrs.children = children[0];
      }
    }

    return name(attrs);
  }

  // Switches the tag name when this custom `tag` is present.
  if (name === "tag") {
    name = String(attrs.of);
    delete attrs.of;
  }

  if (children.length === 0) {
    return "<" + name + attributesToString(attrs) + "/>";
  }

  let contents = contentsToString(children, attrs.safe);

  // Faster than checking if `children instanceof Promise`
  // https://jsperf.app/zipuvi
  if (typeof contents === "string") {
    return (
      "<" +
      name +
      attributesToString(attrs) +
      ">" +
      contents +
      "</" +
      name +
      ">"
    );
  }

  return contents.then(function asyncChildren(child) {
    return (
      "<" + name + attributesToString(attrs) + ">" + child + "</" + name + ">"
    );
  });
}

/** @type {import('./tsx').styleToString} */
function styleToString(style) {
  // Faster escaping process that only looks for the " character.
  // As we use the " character to wrap the style string, we need to escape it.
  if (typeof style === "string") {
    let end = style.indexOf('"');

    // This is a optimization to avoid having to look twice for the " character.
    // And make the loop already start in the middle
    if (end === -1) {
      return style;
    }

    const length = style.length;

    let escaped = "";
    let start = 0;

    // Escapes double quotes to be used inside attributes
    // Faster than using regex
    // https://jsperf.app/kakihu
    for (; end < length; end++) {
      if (style[end] === '"') {
        escaped += style.slice(start, end) + "&#34;";
        start = end + 1;
      }
    }

    // Appends the remaining string.
    escaped += style.slice(start, end);

    return escaped;
  }

  const keys = Object.keys(style);
  const length = keys.length;

  let key, value, end, start;
  let index = 0;
  let result = "";

  for (; index < length; index++) {
    key = keys[index];
    // @ts-ignore - this indexing is safe.
    value = style[key];

    if (value === null || value === undefined) {
      continue;
    }

    result += toKebabCase(key) + ":";

    // Only needs escaping when the value is a string.
    if (typeof value !== "string") {
      result += value.toString() + ";";
      continue;
    }

    end = value.indexOf('"');

    // This is a optimization to avoid having to look twice for the " character.
    // And make the loop already start in the middle
    if (end === -1) {
      result += value + ";";
      continue;
    }

    const length = value.length;
    start = 0;

    // Escapes double quotes to be used inside attributes
    // Faster than using regex
    // https://jsperf.app/kakihu
    for (; end < length; end++) {
      if (value[end] === '"') {
        result += value.slice(start, end) + "&#34;";
        start = end + 1;
      }
    }

    // Appends the remaining string.
    result += value.slice(start, end) + ";";
  }

  return result;
}

/** @type {import('./tsx').toKebabCase} */
function toKebabCase(camel) {
  // This is a optimization to avoid the whole conversion process when the
  // string does not contain any uppercase characters.
  if (!CAMEL_REGEX.test(camel)) {
    return camel;
  }

  const length = camel.length;

  let start = 0;
  let end = 0;
  let kebab = "";
  let prev = true;
  let curr = isUpper(camel, 0);
  let next;

  for (; end < length; end++) {
    next = isUpper(camel, end + 1);

    // detects the start of a new camel case word and avoid lowercasing abbreviations.
    if (!prev && curr && !next) {
      kebab += camel.slice(start, end) + "-" + camel[end].toLowerCase();
      start = end + 1;
    }

    prev = curr;
    curr = next;
  }

  // Appends the remaining string.
  kebab += camel.slice(start, end);

  return kebab;
}

/** @type {import('./tsx').isUpper} */
function isUpper(input, index) {
  const code = input.charCodeAt(index);
  return code >= 65 /* A */ && code <= 90; /* Z */
}
