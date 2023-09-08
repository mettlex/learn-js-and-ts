export type Todo = {
  id: number;
  text: string;
};

export type AppState = {
  todos: Todo[];
  nextId: number;
};

export type AppAction =
  | { actionType: "ADD_TODO"; text: string }
  | { actionType: "EDIT_TODO"; id: number; text: string }
  | { actionType: "DELETE_TODO"; id: number }
  | { actionType: "LOAD_TODOS" }
  | { actionType: "RESET" };

export type AppEffect =
  | { effectType: "INCREMENT_ID" }
  | { effectType: "CLEAR_INPUT"; textInput: HTMLInputElement }
  | {
      effectType: "RENDER";
      state: AppState;
      action: AppAction;
    }
  | {
      effectType: "MUTATE_STATE";
      newState: AppState;
    }
  | {
      effectType: "SAVE";
      state: AppState;
    }
  | {
      effectType: "LOAD";
    };

export type Store = {
  globalState: AppState;
  getGlobalState: () => AppState;
  setGlobalState: (state: AppState) => void;
};
