import "@kitajs/html/register";

import { iifeForEvent } from "./lib/utils";
import { Counter } from "./components/Counter";
import { Todo } from "./components/Todo";

const basic = document.createElement("div");

// Do not use .innerHTML like this
// This is just a demo for understanding
basic.innerHTML = (
  <button
    onclick={iifeForEvent(() => {
      alert("It works!");
    })}
  >
    Basic Example. Click Me!
  </button>
);

// We don't want a div wrapping the button
if (basic.firstChild) {
  // render firstChild which is the button
  document.body.appendChild(basic.firstChild);
}

//#region Counter Example

const app = document.createElement("div");

app.innerHTML = <Counter />;

if (app.firstChild) {
  document.body.appendChild(app.firstChild);
}

//#endregion Counter Example

//#region Todo Example

const todo = document.createElement("div");

todo.innerHTML = (
  <Todo
    todos={[
      { complete: true, content: "Todo 1" },
      { complete: false, content: "Todo 2" },
    ]}
  />
);

if (todo.firstChild) {
  document.body.appendChild(todo.firstChild);
}

//#endregion Todo Example
