const input = document.getElementById("todo-text");
const button = document.getElementById("btn");
const ul = document.getElementById("list");

class Todo {
  constructor(text, done) {
    this.text = text;
    this.done = done;
  }

  edit(event) {
    if (!this.done) {
      event.target.style.textDecoration = "line-through";
      this.done = true;
    } else {
      event.target.style.textDecoration = "";
      this.done = false;
    }
  }
}

const KEY = "todos";

const todos = JSON.parse(localStorage.getItem(KEY) || "[]");

// load saved todos
for (let i = 0; i < todos.length; i++) {
  const todo = todos[i];

  const item = document.createElement("li");

  const paragraph = document.createElement("p");
  const deleteButton = document.createElement("button");

  // READ
  if (todo.done) {
    paragraph.style.textDecoration = "line-through";
  }

  paragraph.addEventListener("click", (event) => {
    // EDIT TODO
    if (!todos[i].done) {
      event.target.style.textDecoration = "line-through";
      todos[i].done = true;
    } else {
      event.target.style.textDecoration = "";
      todos[i].done = false;
    }

    save(todos);
  });

  // READ
  paragraph.textContent = todo.text;
  deleteButton.textContent = "delete";

  deleteButton.addEventListener("click", () => {
    // DELETE TODO

    // delete from todos array
    todos.splice(
      todos.findIndex((x) => x.text === todo.text),
      1
    );

    item.remove(); // remove from UI

    save(todos);
  });

  item.appendChild(paragraph);
  item.appendChild(deleteButton);

  ul.appendChild(item);
}

// create new todo
function handleSave(event) {
  event.preventDefault();

  // const todo = {
  //   text: input.value,
  //   done: false,
  // };

  // create todo
  const todo = new Todo(input.value, false);

  const item = document.createElement("li");

  const paragraph = document.createElement("p");
  const deleteButton = document.createElement("button");

  paragraph.addEventListener("click", (event) => {
    // EDIT TODO
    todo.edit(event);

    save(todos);
  });

  paragraph.textContent = todo.text;
  deleteButton.textContent = "delete";

  deleteButton.addEventListener("click", () => {
    // DELETE TODO

    // delete from todos array
    todos.splice(
      todos.findIndex((x) => x.text === todo.text),
      1
    );

    item.remove(); // remove from UI

    save(todos);
  });

  item.appendChild(paragraph);
  item.appendChild(deleteButton);

  input.value = "";

  ul.appendChild(item);

  // CREATE TODO
  todos.push(todo);
  save(todos);
}

function save(todos) {
  localStorage.setItem(KEY, JSON.stringify(todos));
}
