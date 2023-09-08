import { RecipeInterface } from "./recipe";

export class RecipeStorage {
  readonly #key = "recipes";
  readonly #storage = localStorage;

  getAll(): RecipeInterface[] | null {
    const str = this.#storage.getItem(this.#key);

    if (!str) return null;

    const parsed = JSON.parse(str);
    return parsed;
  }

  saveAll(recipes: RecipeInterface[]): boolean {
    this.#storage.setItem(this.#key, JSON.stringify(recipes));
    return true;
  }
}
