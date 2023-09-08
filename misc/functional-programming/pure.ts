import { AppAction, AppState, Todo } from "./types";

// pure function
function reduceAppState(action: AppAction, state: AppState): AppState {
  switch (action.actionType) {
    case "ADD_TODO":
      const newTodo: Todo = { id: state.nextId, text: action.text };
      const newTodos = [...state.todos, newTodo];

      return { todos: newTodos, nextId: state.nextId + 1 };

    case "EDIT_TODO":
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo,
      );

      return { ...state, todos: updatedTodos };

    case "DELETE_TODO":
      const filteredTodos = state.todos.filter((todo) => todo.id !== action.id);

      return { ...state, todos: filteredTodos };

    default:
      return state;
  }
}

// pure function
export function dispatchAction(action: AppAction, state: AppState): AppState {
  const newState = reduceAppState(action, state);

  return newState;
}
