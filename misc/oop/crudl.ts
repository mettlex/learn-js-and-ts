import { Recipe, RecipeInterface } from "./recipe";

export interface RecipeWithId extends RecipeInterface {
  id: number;
}

export class RecipeCollection {
  #recipes: RecipeWithId[] = [];

  // CREATE
  addRecipe(props: RecipeInterface): Recipe {
    const newRecipe = new Recipe(props);

    this.#recipes.push({
      ...newRecipe,
      id: this.getNextId(),
    });

    return newRecipe;
  }

  // READ
  readRecipe(recipeId: number) {
    return this.#recipes.find((recipe) => recipe.id === recipeId);
  }

  // UPDATE
  updateRecipe(
    recipeId: number,
    updatedProps: Partial<RecipeInterface>,
  ): Recipe | undefined {
    const recipeToUpdate = this.readRecipe(recipeId);

    const index = this.#recipes.findIndex((r) => r.id === recipeId);

    if (!recipeToUpdate) {
      return undefined;
    }

    const updatedRecipe = {
      ...recipeToUpdate,
      ...updatedProps,
    };

    this.#recipes[index] = updatedRecipe;

    return updatedRecipe;
  }

  // DELETE
  deleteRecipe(recipeId: number): boolean {
    const recipeIndex = this.#recipes.findIndex(
      (recipe) => recipe.id === recipeId,
    );

    if (recipeIndex === -1) {
      return false;
    }

    this.#recipes.splice(recipeIndex, 1);

    return true;
  }

  // LIST
  getAll(): RecipeWithId[] {
    return this.#recipes;
  }

  getNextId(): number {
    const lastRecipe = this.#recipes[this.#recipes.length - 1];

    let id = 0;

    if (lastRecipe) {
      id = lastRecipe.id + 1;
    }

    return id;
  }
}
