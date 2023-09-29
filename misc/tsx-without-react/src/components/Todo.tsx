import { createElement } from "../lib/tsx";
import { useId } from "../lib/utils";
import { sendUpdateEvent } from "../lib/event";

// Model
type Todo = {
  content: string;
  complete: boolean;
};

type TodoState = {
  inputText: string;
  todos: (Todo | null)[];
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

export const todoFormId = useId("todo-form");

// View
export function Todo({ todos: safeTodos }: TodoProps) {
  todoState.todos = safeTodos;

  return (
    <div>
      <h3>Todos</h3>

      <form
        id={todoFormId}
        style={{
          margin: "10px",
        }}
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

export const todoDeleteButtonIds: string[] = [];
export const todoToggleContainerIds: string[] = [];

function TodoItem({ todo }: { todo: Todo }) {
  const id = useNextTodoId();

  const todoDeleteButtonId = `delete-btn-${id}`;

  todoDeleteButtonIds.push(todoDeleteButtonId);

  const todoToggleContainerId = `toggle-${id}`;

  todoToggleContainerIds.push(todoToggleContainerId);

  return (
    <li id={id} style={{ margin: "10px" }}>
      <button id={todoDeleteButtonId}>🗑️</button>

      <span
        id={todoToggleContainerId}
        style={{
          margin: "10px",
          textDecoration: todo.complete && "line-through",
          cursor: "pointer",
          userSelect: "none",
        }}
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

  const element = document.createElement("li");

  element.innerHTML = <TodoItem todo={todo} />;

  const li = element.firstChild as HTMLLIElement;

  if (li) {
    container.appendChild(li);

    const todoDeleteButtonId =
      todoDeleteButtonIds[todoDeleteButtonIds.length - 1];

    const todoToggleContainerId =
      todoToggleContainerIds[todoToggleContainerIds.length - 1];

    document
      .getElementById(todoToggleContainerId as string)
      ?.addEventListener("click", handleTodoToggleClick);

    document
      .getElementById(todoDeleteButtonId as string)
      ?.addEventListener("click", handleTodoDeleteButtonClick);
  }
}

export function deleteTodo(index: number) {
  todoState.todos[index] = null;
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

export function handleTodoFormSubmit(this: HTMLElement, event: SubmitEvent) {
  event.preventDefault();
  sendUpdateEvent({
    type: "ADD_TODO",
    element: this,
  });
}

export function handleTodoDeleteButtonClick(this: HTMLButtonElement) {
  sendUpdateEvent({
    type: "DELETE_TODO",
    element: this.closest("li") as HTMLLIElement,
  });
}

export function handleTodoToggleClick(this: HTMLSpanElement) {
  sendUpdateEvent({
    type: "TOGGLE_TODO",
    element: this.closest("li") as HTMLLIElement,
  });
}
