// After ES6, ECMAScript has the `class` keyword
// which works as a syntactic sugar
// over the prototype-based object orientation

//#region The New Way (ES6 Classes):

class Person1 {}

const p1 = new Person1();

// these output true
console.log(p1 instanceof Person1);
console.log(new Person1() instanceof Person1);

//#endregion

//#region The Old Way (Prototype-based):

function Person2() {}

const p2 = new Person2();

// these output true
console.log(p2 instanceof Person2);
console.log(new Person2() instanceof Person2);

//#endregion

// Let's add more to the code above

//#region ES6 class approach

class Person3 {
  // We have to declare the members
  // like this in TypeScript
  // but there's a better way
  // which I'll show later below
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Define a method within the class.
  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`,
    );
  }
}

// Create an instance of the "Person" class.
const john = new Person3("John", 30);

// Call the "greet" method on the instance.
john.greet(); // Outputs: "Hello, my name is John and I'm 30 years old."

//#endregion

//#region Prototype-based approach

function Person4(name: string, age: number) {
  this.name = name;
  this.age = age;
}

Person4.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
};

const jane = new Person4("Jane", 25);

jane.greet(); // Outputs: "Hello, my name is Jane and I'm 25 years old."

//#endregion

// Recommendations:
// 1. It's better to use an object as the only argument
//    to class constructor in some scenarios.
// 2. It's better to use access modifiers
//    (public, private or protected) to replace
//    the separate member declarations.
// 3. Use TypeScript `interface` & `implements`.

// #region Code for the recommendations above

// Using one argument only:

class Person5 {
  // Say no to this
  name: string;
  age: number;

  constructor(props: { name: string; age: number }) {
    this.name = props.name;
    this.age = props.age;
  }

  greet() {
    console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old`);
  }
}

// Using access modifiers only:

class Person6 {
  constructor(private name: string, private age: string) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old`);
  }
}

// Using interface and implements:

interface PersonInterface {
  name: string;
  age: number;
}

class Person7 implements PersonInterface {
  constructor(private person: PersonInterface) {}

  get name(): string {
    return this.person.name;
  }

  set name(newName: string) {
    this.person.name = newName;
  }

  get age(): number {
    return this.person.age;
  }

  set age(newAge: number) {
    this.person.age = newAge;
  }

  greet() {
    console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old`);
  }
}

//#endregion

//#region ES6 class-based inheritance

// In TS, one interface can extend another interface
interface ProgrammerInterface extends PersonInterface {
  languages: string[];
}

// Use `extends` to inherit
class Programmer extends Person7 {
  constructor(private programmer: ProgrammerInterface) {
    // Call the constructor
    // of the super class Person7
    super({ ...programmer });

    this.languages = programmer.languages;
  }

  get languages(): string[] {
    return this.programmer.languages;
  }

  set languages(langs: string[]) {
    this.programmer.languages = langs;
  }

  // Override the greet method to include the languages
  greet() {
    console.log(
      `Hello, I'm ${this.name}, ${
        this.age
      } years old, and I code in ${this.languages.join(", ")}.`,
    );
  }
}

const adasProps = {
  name: "Ada",
  age: 18,
  languages: ["Assembly", "C", "ECMAScript", "TypeScript", "Rust"],
};

const ada = new Programmer(adasProps);

ada.greet();

//#endregion

/**
 *
 * What if you need to replace the console.log
 * in the greet() method?
 * Will you make a class inherit from a Logger class? 😅
 * You shouldn't!
 * Multiple inheritance isn't supported in ES.
 *
 */

//#region Composition over Inheritance

// Create a simple logger class
class Logger {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}

// Use composition to add logging to a class
class LoggableProgrammer extends Programmer {
  protected logger = new Logger();

  constructor(props: ProgrammerInterface) {
    super(props);
  }

  greet() {
    this.logger.log(
      `Hello, I'm ${this.name}, ${
        this.age
      } years old, and I code in ${this.languages.join(", ")}.`,
    );
  }
}

const loggableAda = new LoggableProgrammer(adasProps);

loggableAda.greet();

//#endregion

//#region Private features of ES classes

// `private` is from TS but doesn't guarantee private access
// Instead you should use # as a prefix to the properties
// Read more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields

class ProgrammerWithHiddenTalent extends LoggableProgrammer {
  #talent: string[];

  constructor(props: ProgrammerInterface & { addedTalent: string[] }) {
    super(props);
    this.#talent = props.addedTalent;
  }

  showTalent() {
    // You can use private fields inside the class
    this.logger.log(this.#talent.join(", "));
  }
}

const programmer = {
  ...adasProps,
  addedTalent: ["Solving problems"],
};

// This gives an error
// console.log(new ProgrammerWithHiddenTalent(programmer).#talent);

// This is fine
new ProgrammerWithHiddenTalent(programmer).showTalent();

//#endregion
