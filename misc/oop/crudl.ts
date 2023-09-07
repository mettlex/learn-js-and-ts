import { Recipe, RecipeInterface } from "./recipe";

export class RecipeList {
  #recipes: Recipe[] = [];

  // CREATE
  addRecipe(props: RecipeInterface): Recipe {
    const newRecipe = new Recipe(props);

    this.#recipes.push(newRecipe);

    return newRecipe;
  }

  // READ
  readRecipe(recipeName: string): Recipe | undefined {
    return this.#recipes.find((recipe) => recipe.name === recipeName);
  }

  // UPDATE
  updateRecipe(
    recipeName: string,
    updatedProps: Partial<RecipeInterface>,
  ): Recipe | undefined {
    const recipeToUpdate = this.readRecipe(recipeName);

    const index = this.#recipes.findIndex((r) => r.name === recipeName);

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
  deleteRecipe(recipeName: string): boolean {
    const recipeIndex = this.#recipes.findIndex(
      (recipe) => recipe.name === recipeName,
    );

    if (recipeIndex === -1) {
      return false;
    }

    this.#recipes.splice(recipeIndex, 1);

    return true;
  }

  // LIST
  listRecipes(): Recipe[] {
    return this.#recipes;
  }
}
