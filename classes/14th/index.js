// Runtimes: Node.js & Deno : back-end (server-side)
// Web Browser : front-end (client-side)

// this keyword

console.log(this); // different for different runtimes

// window, global -> globalThis

console.log(globalThis); // works for all runtimes

// Inheritence:

class Hero {
  constructor() {
    this.health = 100;
  }
}

class Aron extends Hero {
  constructor() {
    super();
    this.attack = 90;
    this.defence = 50;
  }
}

class Mike extends Hero {
  constructor() {
    super();
    this.attack = 60;
    this.defence = 90;
  }
}

new Aron().health;
new Mike().health;

new Aron().attack;
new Mike().attack;
