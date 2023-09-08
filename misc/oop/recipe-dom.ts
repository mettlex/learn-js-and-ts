import { RecipeInterface } from "./recipe";
import { RecipeCollection, RecipeWithId } from "./crudl";
import { RecipeStorage } from "./recipe-storage";

class RecipeDOM {
  readonly recipeCollection: RecipeCollection = new RecipeCollection();
  readonly storage = new RecipeStorage();
  readonly container = document.getElementById(
    "recipe-container",
  ) as HTMLDivElement;

  // Method to display a recipe on the DOM
  renderRecipe(recipe: RecipeWithId): void {
    // Create the recipe element
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe");

    // Set the recipe title
    const titleElement = document.createElement("h2");
    titleElement.textContent = recipe.name;
    recipeElement.appendChild(titleElement);

    // Set the recipe details
    const detailsElement = document.createElement("ul");

    // Ingredients
    const ingredientsElement = document.createElement("li");
    const ingredientsTitleElement = document.createElement("h3");
    ingredientsTitleElement.textContent = "Ingredients";
    const ingredientsListElement = document.createElement("ul");

    // Add each ingredient to the list
    recipe.ingredients.forEach((ingredient) => {
      const ingredientElement = document.createElement("li");
      ingredientElement.textContent = ingredient;
      ingredientsListElement.appendChild(ingredientElement);
    });

    ingredientsElement.appendChild(ingredientsTitleElement);
    ingredientsElement.appendChild(ingredientsListElement);
    detailsElement.appendChild(ingredientsElement);

    // Instructions
    const instructionsElement = document.createElement("li");
    const instructionsTitleElement = document.createElement("h3");
    instructionsTitleElement.textContent = "Instructions";
    const instructionsListElement = document.createElement("ol");

    // Add each instruction to the list
    recipe.instructions.forEach((instruction) => {
      const instructionElement = document.createElement("li");
      instructionElement.textContent = instruction;
      instructionsListElement.appendChild(instructionElement);
    });

    instructionsElement.appendChild(instructionsTitleElement);
    instructionsElement.appendChild(instructionsListElement);
    detailsElement.appendChild(instructionsElement);

    // Cooking Time
    const cookingTimeElement = document.createElement("li");
    cookingTimeElement.textContent = `Cooking Time: ${recipe.cookingTime} minutes`;
    detailsElement.appendChild(cookingTimeElement);

    // Servings
    const servingsElement = document.createElement("li");
    servingsElement.textContent = `Servings: ${recipe.servings}`;
    detailsElement.appendChild(servingsElement);

    // Assign a unique id to the recipe element
    recipeElement.id = recipe.id.toString();

    // Create an edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit Recipe";
    recipeElement.appendChild(editButton);

    // Add event listener to the edit button
    editButton.addEventListener("click", () => {
      this.editRecipe(recipe);
    });

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Recipe";
    recipeElement.appendChild(deleteButton);

    // Add event listener to the delete button
    deleteButton.addEventListener("click", () => {
      this.deleteRecipe(recipe);
      this.saveRecipes();
    });

    // Author
    if (recipe.author) {
      const authorElement = document.createElement("li");
      authorElement.textContent = `Author: ${recipe.author}`;
      detailsElement.appendChild(authorElement);
    }

    // Notes
    if (recipe.notes) {
      const notesElement = document.createElement("li");
      notesElement.textContent = `Notes: ${recipe.notes}`;
      detailsElement.appendChild(notesElement);
    }

    // Add the details to the recipe element
    recipeElement.appendChild(detailsElement);

    // Add the recipe element to the container
    this.container.prepend(recipeElement);
  }

  // Method to clear the recipe container
  clearRecipeContainer(): void {
    this.container.innerHTML = "";
  }

  // Method to display all recipes on the DOM
  renderAllRecipes(): void {
    // Clear the recipe container first
    this.clearRecipeContainer();

    // Get all the recipes from the recipe list
    const recipes = this.recipeCollection.getAll();

    // Display each recipe
    recipes.forEach((recipe) => {
      this.renderRecipe(recipe);
    });
  }

  // Method to load recipes from the recipe list and display them on the DOM
  loadRecipes(): void {
    // Clear the recipe container first
    this.clearRecipeContainer();

    // Simulate loading recipes from an API or database
    // In this example, we'll add some hardcoded recipes
    const defaultRecipes = [
      {
        name: "Pasta Carbonara",
        ingredients: ["Spaghetti", "Bacon", "Parmesan", "Eggs", "Pepper"],
        instructions: [
          "Cook the spaghetti according to the instructions on the package.",
          "Cook the bacon until crispy, then chop it into small pieces.",
          "Mix the eggs, grated Parmesan, and freshly ground black pepper in a bowl.",
          "Drain the cooked spaghetti and add it to the pan with the bacon.",
          "Add the egg mixture to the spaghetti and bacon, stirring quickly to coat the pasta.",
          "Serve immediately.",
        ],
        cookingTime: 20,
        servings: 4,
        author: "John Doe",
        notes: "You can add some chopped parsley as a garnish.",
      },
      // Add more recipes here...
    ];

    const recipes: RecipeInterface[] = this.storage.getAll() || defaultRecipes;

    // Add each recipe to the recipe list
    recipes.forEach((recipe) => {
      this.recipeCollection.addRecipe(recipe);
    });

    // Display all recipes
    this.renderAllRecipes();
  }

  // Method to render a form for creating new recipes
  renderNewRecipeForm(): void {
    // Create the form element
    const formElement = document.createElement("form");
    formElement.id = "new-recipe-form";

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      // Get form data
      const formData = new FormData(formElement);
      const name = formData.get("name") as string;
      const ingredients = (formData.get("ingredients") as string).split(",");
      const instructions = (formData.get("instructions") as string).split("\n");
      const cookingTime = parseInt(formData.get("cookingTime") as string);
      const servings = parseInt(formData.get("servings") as string);
      const author = formData.get("author") as string;
      const notes = formData.get("notes") as string;

      // Create a new recipe object
      const newRecipe: RecipeWithId = {
        id: this.recipeCollection.getNextId(),
        name,
        ingredients,
        instructions,
        cookingTime,
        servings,
        author,
        notes,
      };

      // Add the new recipe to the recipe list
      this.recipeCollection.addRecipe(newRecipe);

      // Clear the form
      formElement.reset();

      // Render the new recipe
      this.renderRecipe(newRecipe);

      // Save to storage
      this.saveRecipes();
    });

    // Create an input for the recipe name
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.placeholder = "Recipe Name";
    formElement.appendChild(nameInput);

    // Create a textarea for the ingredients
    const ingredientsInput = document.createElement("textarea");
    ingredientsInput.name = "ingredients";
    ingredientsInput.placeholder = "Ingredients (separated by commas)";
    formElement.appendChild(ingredientsInput);

    // Create a textarea for the instructions
    const instructionsInput = document.createElement("textarea");
    instructionsInput.name = "instructions";
    instructionsInput.placeholder = "Instructions (separated by line breaks)";
    formElement.appendChild(instructionsInput);

    // Create an input for the cooking time
    const cookingTimeInput = document.createElement("input");
    cookingTimeInput.type = "number";
    cookingTimeInput.name = "cookingTime";
    cookingTimeInput.placeholder = "Cooking Time (in minutes)";
    formElement.appendChild(cookingTimeInput);

    // Create an input for the servings
    const servingsInput = document.createElement("input");
    servingsInput.type = "number";
    servingsInput.name = "servings";
    servingsInput.placeholder = "Servings";
    formElement.appendChild(servingsInput);

    // Create an input for the author
    const authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.name = "author";
    authorInput.placeholder = "Author";
    formElement.appendChild(authorInput);

    // Create a textarea for the notes
    const notesInput = document.createElement("textarea");
    notesInput.name = "notes";
    notesInput.placeholder = "Notes";
    formElement.appendChild(notesInput);

    // Create a submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Create Recipe";
    formElement.appendChild(submitButton);

    // Add the form to the container
    this.container.appendChild(formElement);
  }

  saveRecipes(): void {
    this.storage.saveAll(this.recipeCollection.getAll());
  }

  // Method to delete a recipe
  deleteRecipe(recipe: RecipeWithId): void {
    // Remove the recipe from the recipe list
    this.recipeCollection.deleteRecipe(recipe.id);

    // Remove the recipe element from the DOM
    const recipeElement = document.getElementById(recipe.id.toString());

    if (recipeElement) {
      recipeElement.remove();
    }
  }

  // Method to edit a recipe
  editRecipe(recipe: RecipeWithId): void {
    // Get the recipe element from the DOM
    const recipeElement = document.getElementById(recipe.id.toString());

    if (recipeElement) {
      // Clear the recipe element
      recipeElement.innerHTML = "";

      // Render the edit form
      const formElement = this.renderEditRecipeForm(recipe);
      recipeElement.appendChild(formElement);
    }
  }

  // Method to render a form for editing a recipe
  renderEditRecipeForm(recipe: RecipeWithId): HTMLFormElement {
    // Create the form element
    const formElement = document.createElement("form");
    formElement.id = `edit-recipe-form-${recipe.id}`;

    // Create an input for the recipe name
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.value = recipe.name;
    formElement.appendChild(nameInput);

    // Create a textarea for the ingredients
    const ingredientsInput = document.createElement("textarea");
    ingredientsInput.name = "ingredients";
    ingredientsInput.value = recipe.ingredients.join(", ");
    formElement.appendChild(ingredientsInput);

    // Create a textarea for the instructions
    const instructionsInput = document.createElement("textarea");
    instructionsInput.name = "instructions";
    instructionsInput.value = recipe.instructions.join("\n");
    formElement.appendChild(instructionsInput);

    // Create an input for the cooking time
    const cookingTimeInput = document.createElement("input");
    cookingTimeInput.type = "number";
    cookingTimeInput.name = "cookingTime";
    cookingTimeInput.value = recipe.cookingTime.toString();
    formElement.appendChild(cookingTimeInput);

    // Create an input for the servings
    const servingsInput = document.createElement("input");
    servingsInput.type = "number";
    servingsInput.name = "servings";
    servingsInput.value = recipe.servings.toString();
    formElement.appendChild(servingsInput);

    // Create an input for the author
    const authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.name = "author";
    if (recipe.author) authorInput.value = recipe.author;
    formElement.appendChild(authorInput);

    // Create a textarea for the notes
    const notesInput = document.createElement("textarea");
    notesInput.name = "notes";
    if (recipe.notes) notesInput.value = recipe.notes;
    formElement.appendChild(notesInput);

    // Create a submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Update Recipe";
    formElement.appendChild(submitButton);

    // Add event listener to the form
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      // Get form data
      const formData = new FormData(formElement);
      const name = formData.get("name") as string;
      const ingredients = (formData.get("ingredients") as string).split(",");
      const instructions = (formData.get("instructions") as string).split("\n");
      const cookingTime = parseInt(formData.get("cookingTime") as string);
      const servings = parseInt(formData.get("servings") as string);
      const author = formData.get("author") as string;
      const notes = formData.get("notes") as string;

      // Update the recipe object
      const updatedRecipe: RecipeWithId = {
        ...recipe,
        name,
        ingredients,
        instructions,
        cookingTime,
        servings,
        author,
        notes,
      };

      // Update the recipe in the recipe list
      this.recipeCollection.updateRecipe(recipe.id, updatedRecipe);

      // Re-render the recipe
      this.renderRecipe(updatedRecipe);

      // save to storage
      this.saveRecipes();

      // we no longer need the edit form
      formElement.remove();
    });

    return formElement;
  }
}

// Create an instance of the RecipeDOM class
const app = new RecipeDOM();

// Load and display recipes on page load
window.addEventListener("load", () => {
  app.loadRecipes();
  app.renderNewRecipeForm();
});
