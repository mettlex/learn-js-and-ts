export interface RecipeInterface {
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
}

export class Recipe implements RecipeInterface {
  name: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  author?: string | undefined;
  notes?: string | undefined;

  constructor(props: RecipeInterface) {
    this.name = props.name;
    this.ingredients = props.ingredients;
    this.instructions = props.instructions;
    this.cookingTime = props.cookingTime;
    this.servings = props.servings;
    this.author = props.author;
    this.notes = props.notes;
  }
}
