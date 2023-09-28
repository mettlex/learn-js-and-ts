// @ts-ignore
import { createElement } from "../lib/tsx";
import { iifeForEvent, useId } from "../lib/utils";
import { sendUpdateEvent } from "../lib/event";

// Model
type Todo = {
  content: string;
  complete: boolean;
};

type TodoState = {
  inputText: string;
  todos: Todo[];
  nextId: number;
};

// State
export const todoState: TodoState = {
  inputText: "",
  todos: [],
  nextId: 0,
};

const listContainerId = useId("todos");

type TodoProps = {
  todos: Todo[];
};

window.sendUpdateEvent = sendUpdateEvent;

// View
export function Todo({ todos: safeTodos }: TodoProps) {
  todoState.todos = safeTodos;

  return (
    <div>
      <h3>Todos</h3>

      <form
        style={{
          margin: "10px",
        }}
        onsubmit={iifeForEvent(function (this: HTMLFormElement, event) {
          event.preventDefault();
          window.sendUpdateEvent({
            type: "ADD_TODO",
            element: this,
          });
        })}
      >
        <button type="submit">➕</button>

        <input
          style={{
            margin: "10px",
          }}
          type="text"
          name="todo-content"
          required="true"
        ></input>
      </form>

      <ol id={listContainerId} style={{ marginTop: "20px" }}>
        {safeTodos.map((todo) => (
          <TodoItem todo={todo} />
        ))}
      </ol>
    </div>
  );
}

function TodoItem({ todo }: { todo: Todo }) {
  const id = useNextTodoId();

  return (
    <li id={id} style={{ margin: "10px" }}>
      <button
        onclick={iifeForEvent(function (this: HTMLButtonElement) {
          // Recommended: Send Update Event
          window.sendUpdateEvent({
            type: "DELETE_TODO",
            element: this.closest("li") as HTMLLIElement,
          });
        })}
      >
        🗑️
      </button>

      <span
        style={{
          margin: "10px",
          textDecoration: todo.complete && "line-through",
          cursor: "pointer",
          userSelect: "none",
        }}
        onclick={iifeForEvent(function (this: HTMLSpanElement) {
          window.sendUpdateEvent({
            type: "TOGGLE_TODO",
            element: this.closest("li") as HTMLLIElement,
          });
        })}
        safe
      >
        {todo.content}
      </span>
    </li>
  );
}

export function addTodo(todo: Todo) {
  todoState.todos.push(todo);
}

export function addTodoElement(todo: Todo) {
  const container = document.getElementById(
    listContainerId,
  ) as HTMLOListElement;

  const li = document.createElement("li");

  li.innerHTML = (<TodoItem todo={todo} />) as string;

  container.appendChild(li.firstChild!);
}

export function deleteTodo(index: number) {
  todoState.todos.splice(index, 1);
}

export function deleteTodoElement(todoId: string) {
  const element = document.getElementById(todoId);

  if (element) {
    element.remove();
  }
}

export function toggleTodo(index: number) {
  const todo = todoState.todos[index];

  if (!todo) {
    return;
  }

  todo.complete = !todo.complete;
}

export function toggleTodoElement(index: number, todoElement: HTMLElement) {
  const todo = todoState.todos[index];

  if (!todo) {
    return;
  }

  (todoElement.querySelector("span") as HTMLSpanElement).style.textDecoration =
    todo.complete ? "line-through" : "";
}

function useNextTodoId() {
  return "todo-" + (++todoState.nextId).toString();
}
