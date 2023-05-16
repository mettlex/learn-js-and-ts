const input = document.getElementById("text");
const button = document.getElementById("btn");
const ul = document.getElementById("list");

button.addEventListener("click", () => {
  if (input.value === "") {
    return;
  }

  const item = document.createElement("li");

  const paragraph = document.createElement("p");
  const div = document.createElement("button");

  let done = false;

  paragraph.addEventListener("click", (event) => {
    if (!done) {
      event.target.style.textDecoration = "line-through";
      done = true;
    } else {
      event.target.style.textDecoration = "";
      done = false;
    }
  });

  paragraph.textContent = input.value;
  div.textContent = "delete";

  div.addEventListener("click", () => {
    item.remove();
  });

  item.appendChild(paragraph);
  item.appendChild(div);

  input.value = "";

  ul.appendChild(item);
});
