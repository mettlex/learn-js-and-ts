class Me {
  #age;

  constructor() {
    this.#age = 29;

    console.log(this.#age);
  }

  updateAge() {
    this.#age = 10;
  }

  showAge() {
    return this.#age;
  }
}

const itsme = new Me();

itsme.updateAge();

console.log(itsme.showAge());
