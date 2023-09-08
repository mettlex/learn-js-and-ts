import { AppState, Store } from "./types";

const initialState: AppState = { todos: [], nextId: 1 };

export const store: Store = {
  globalState: initialState,
  getGlobalState() {
    return this.globalState;
  },
  setGlobalState(state: AppState) {
    this.globalState = state;
  },
};
