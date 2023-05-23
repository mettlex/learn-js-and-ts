// OOP

// const todoList = [];

// const todo1 = new Todo("Have water", true);
// const todo2 = new Todo("Have dinner", false);
// const todo3 = new Todo("Have dinner", false, "Andaje");

// todoList.push(todo1);
// todoList.push(todo2);
// todoList.push(todo3);

// console.log(todoList.length);
// console.log(todoList);

class Todo {
  constructor(text, done) {
    this.text = text;
    this.done = done;
  }
}

class Reminder extends Todo {
  constructor(text, done, time) {
    super(text, done);

    // override an existing property
    this.done = !done;
    
    // extend a new property
    this.time = time;
  }
}

const reminder1 = new Reminder("Wake up early", false, "08:00 AM");

console.log(reminder1);
