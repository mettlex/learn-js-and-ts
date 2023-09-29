import { createElement } from "./lib/tsx";
import {
  Counter,
  decrement,
  decrementButtonId,
  increment,
  incrementButtonId,
} from "./components/Counter";
import {
  Todo,
  handleTodoDeleteButtonClick,
  handleTodoFormSubmit,
  handleTodoToggleClick,
  todoDeleteButtonIds,
  todoFormId,
  todoToggleContainerIds,
} from "./components/Todo";

const basic = document.createElement("div");

// Do not use .innerHTML like this
// This is just a demo for understanding
basic.innerHTML = <button>Basic Example. Click Me!</button>;

// We don't want a div wrapping the button
if (basic.firstChild) {
  // render firstChild which is the button
  document.body.appendChild(basic.firstChild).addEventListener("click", () => {
    alert("It works!");
  });
}

//#region Counter Example

const container = document.createElement("div");

container.innerHTML = <Counter />;

const counterElement = container.firstChild;

if (counterElement) {
  document.body.appendChild(counterElement);

  document
    .getElementById(incrementButtonId)
    ?.addEventListener("click", increment);

  document
    .getElementById(decrementButtonId)
    ?.addEventListener("click", decrement);
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

const todoElement = todo.firstChild;

if (todoElement) {
  document.body.appendChild(todoElement);

  todoDeleteButtonIds.forEach((x) => {
    document
      .getElementById(x)
      ?.addEventListener("click", handleTodoDeleteButtonClick);
  });

  todoToggleContainerIds.forEach((x) => {
    document
      .getElementById(x)
      ?.addEventListener("click", handleTodoToggleClick);
  });

  document
    .getElementById(todoFormId)
    ?.addEventListener("submit", handleTodoFormSubmit);
}

//#endregion Todo Example
