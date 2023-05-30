class App {
  constructor() {
    this.incrementButton = document.createElement("button");
    this.decrementButton = document.createElement("button");
    this.numberElement = document.createElement("p");
    this.n = Number(this.numberElement.textContent);

    // this.render();
    this.attachClickHandlers();
  }

  attachClickHandlers() {
    this.incrementButton.addEventListener("click", () => {
      this.n++;
      this.refreshNumber();
    });

    this.decrementButton.addEventListener("click", () => {
      this.n--;
      this.refreshNumber();
    });
  }

  refreshNumber() {
    this.numberElement.textContent = this.n;
  }

  render() {
    const container = document.createElement("div");

    container.classList.add("app");

    this.incrementButton.innerText = "+";
    this.decrementButton.innerText = "-";
    this.numberElement.innerText = "0";

    container.appendChild(this.incrementButton);
    container.appendChild(this.numberElement);
    container.appendChild(this.decrementButton);

    document.body.appendChild(container);
  }

  hide() {
    document.getElementsByClassName("app")[0].remove();
  }
}

// `app` is an instance
const app = new App();

// flag variable
let appIsShown = false;

const launchButton = document.createElement("button");

launchButton.textContent = "Launch App";
launchButton.style.width = "90vw";

launchButton.onclick = () => {
  // toggle the boolean value
  appIsShown = !appIsShown;

  if (appIsShown) {
    app.render();
    launchButton.textContent = "Hide App";
  } else {
    app.hide();
    launchButton.textContent = "Show App";
  }
};

document.body.appendChild(launchButton);
