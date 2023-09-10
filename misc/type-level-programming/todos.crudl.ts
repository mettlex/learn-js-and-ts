import type { CRUDL } from "./crudl";
import type { Option } from "./option";
import { none, option, some } from "./option";

type Todo = { id: number; text: string; complete: boolean };
type Todos = Todo[];

type TodoCRUDL = CRUDL<Todo, Todo["id"], Todos>;

export class TodoModel implements TodoCRUDL {
  #todos: Todos = [];

  create(todo: Todo): Todo {
    this.#todos.push(todo);
    return todo;
  }

  read(key: number): Option<Todo> {
    return option(this.#todos.find((x) => x.id === key));
  }

  update(key: number, value: Todo): Option<Todo> {
    const index = this.#todos.findIndex((todo) => todo.id === key);

    if (index === -1) {
      return none;
    }

    this.#todos[index] = value;

    return some(value);
  }

  delete(key: number): boolean {
    const index = this.#todos.findIndex((x) => x.id === key);

    if (index === -1) {
      return false;
    }

    this.#todos.splice(index, 1);

    return true;
  }

  list() {
    return this.#todos;
  }
}
