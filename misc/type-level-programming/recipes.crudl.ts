import { CRUDL } from "./crudl";

type Recipe = {
  // The name of the recipe.
  name: string;

  // The list of ingredients required for the recipe.
  ingredients: string[];

  // The preparation steps for making the recipe.
  instructions: string[];

  // The total cooking time in minutes.
  cookingTime: number;

  // The number of servings the recipe yields.
  servings: number;

  // Optional: The author or creator of the recipe.
  author?: string;

  // Optional: Any additional notes or tips for the recipe.
  notes?: string;
};

type RecipeCRUDL = CRUDL<Recipe, Recipe["name"], Recipe[]>;
