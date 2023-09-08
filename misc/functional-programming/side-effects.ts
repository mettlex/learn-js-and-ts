import { dispatchAction } from "./pure";
import { store } from "./store";
import { Todo, AppState, AppAction, AppEffect } from "./types";

// fn with side-effect
function performSideEffect(effect: AppEffect): void {
  switch (effect.effectType) {
    case "CLEAR_INPUT":
      effect.textInput.value = "";
      return;

    case "RENDER":
      const { state, action } = effect;
      mutateDOM(state, action);
      return;

    case "MUTATE_STATE":
      store.setGlobalState(effect.newState);
      return;

    case "SAVE":
      localStorage.setItem("TODO_APP_STATE", JSON.stringify(effect.state));

      return;

    case "LOAD":
      const savedStateJson = localStorage.getItem("TODO_APP_STATE");

      if (!savedStateJson) {
        return;
      }

      const savedState = JSON.parse(savedStateJson) as AppState;

      store.setGlobalState(savedState);

      return;

    default:
      return;
  }
}

// fn with side-effect
function createTodoElement(todo: Todo, state: AppState): HTMLDivElement {
  const container = document.createElement("div");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const textContainer = document.createElement("span");

  container.id = `todo-${todo.id}`;
  container.classList.add("todo");
  textContainer.textContent = todo.text;
  editButton.textContent = "Edit";
  deleteButton.textContent = "Delete";

  editButton.addEventListener("click", () => {
    const text = prompt("Edit Todo", todo.text);

    if (!text) {
      return;
    }

    const action = { actionType: "EDIT_TODO", id: todo.id, text } as const;

    const newState = dispatchAction(action, state);

    performSideEffect({
      effectType: "MUTATE_STATE",
      newState,
    });

    performSideEffect({
      effectType: "RENDER",
      state: newState,
      action,
    });

    performSideEffect({
      effectType: "SAVE",
      state: newState,
    });
  });

  deleteButton.addEventListener("click", () => {
    const action = { actionType: "DELETE_TODO", id: todo.id } as const;

    const newState = dispatchAction(action, state);

    performSideEffect({
      effectType: "MUTATE_STATE",
      newState,
    });

    performSideEffect({
      effectType: "RENDER",
      state: newState,
      action,
    });

    performSideEffect({
      effectType: "SAVE",
      state: newState,
    });
  });

  container.appendChild(textContainer);
  container.appendChild(editButton);
  container.appendChild(deleteButton);

  return container;
}

// fn with side-effect
export function mutateDOM(newState: AppState, action: AppAction): void {
  const todosContainer = document.querySelector("#todos-container-fp");

  if (!todosContainer) return;

  if (action.actionType === "ADD_TODO") {
    const freshTodo = newState.todos[newState.todos.length - 1];
    todosContainer.appendChild(createTodoElement(freshTodo, newState));
    return;
  }

  if (action.actionType === "EDIT_TODO") {
    const element = todosContainer.querySelector(`#todo-${action.id} span`);
    if (element) element.textContent = action.text;
    return;
  }

  if (action.actionType === "DELETE_TODO") {
    const element = todosContainer.querySelector(`#todo-${action.id}`);
    if (element) element.remove();
    return;
  }

  if (action.actionType === "LOAD_TODOS") {
    const state = store.getGlobalState();
    state.todos.forEach((todo) => {
      todosContainer.appendChild(createTodoElement(todo, state));
    });
    return;
  }

  if (action.actionType === "RESET") {
    todosContainer.innerHTML = "";
    return;
  }
}

// DOM-Specific Closures Below:

export function handleFormSubmit(event: SubmitEvent) {
  event.preventDefault();

  const textInput = document.querySelector(
    "#text-input-fp",
  ) as HTMLInputElement | null;

  if (!textInput) return;

  const text = textInput.value.trim();

  if (!text) return;

  const action = { actionType: "ADD_TODO", text } as const;

  const newState = dispatchAction(action, store.getGlobalState());

  performSideEffect({
    effectType: "MUTATE_STATE",
    newState,
  });

  performSideEffect({
    effectType: "RENDER",
    state: newState,
    action,
  });

  performSideEffect({
    textInput,
    effectType: "CLEAR_INPUT",
  });

  performSideEffect({
    effectType: "SAVE",
    state: newState,
  });
}

export function hydrate() {
  const state = store.getGlobalState();
  const textInput = document.querySelector(
    "#text-input-fp",
  ) as HTMLInputElement | null;

  if (!textInput) return;

  performSideEffect({
    effectType: "RENDER",
    action: {
      actionType: "RESET",
    },
    state,
  });

  performSideEffect({
    effectType: "LOAD",
  });

  performSideEffect({
    effectType: "RENDER",
    action: {
      actionType: "LOAD_TODOS",
    },
    state,
  });

  performSideEffect({
    textInput,
    effectType: "CLEAR_INPUT",
  });
}

export function initTodoApp() {
  const form = document.querySelector("#form-fp") as HTMLFormElement | null;
  const textInput = document.querySelector(
    "#text-input-fp",
  ) as HTMLInputElement | null;

  if (!form || !textInput) return;

  form.addEventListener("submit", handleFormSubmit);

  hydrate();

  return {
    textInput,
  };
}
