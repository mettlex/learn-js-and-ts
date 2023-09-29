import {
  addTodo,
  addTodoElement,
  deleteTodo,
  deleteTodoElement,
  toggleTodo,
  toggleTodoElement,
} from "../components/Todo";

type EventData = {
  type: "DELETE_TODO" | "ADD_TODO" | "TOGGLE_TODO";
  element: HTMLElement;
};

class UpdateEvent extends Event {
  constructor(public data?: EventData) {
    super("update");
  }
}

export function sendUpdateEvent(data: EventData) {
  window.dispatchEvent(new UpdateEvent(data));
}

window.addEventListener("update", (event: UpdateEvent) => {
  const { data } = event;

  if (!data || !event.data) return;

  switch (data.type) {
    case "DELETE_TODO": {
      const element = event.data.element;

      deleteTodo(+element.id.replace("todo-", "") - 1);
      deleteTodoElement(element.id.toString());

      break;
    }

    case "ADD_TODO": {
      const element = event.data.element as HTMLFormElement;

      const content = new FormData(element).get("todo-content") as string;

      const todo = {
        complete: false,
        content,
      };

      addTodo(todo);
      addTodoElement(todo);

      element.reset();

      break;
    }

    case "TOGGLE_TODO": {
      const element = event.data.element;

      const index = +element.id.replace("todo-", "") - 1;

      toggleTodo(index);
      toggleTodoElement(index, element);

      break;
    }

    default: {
      data.type satisfies never;
      break;
    }
  }
});
