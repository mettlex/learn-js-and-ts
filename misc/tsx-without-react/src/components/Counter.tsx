import { createElement } from "../lib/tsx";
import { useId } from "../lib/utils";

// Model
type CounterState = {
  count: number;
};

// State
export const counterState: CounterState = {
  count: 0,
};

const containerId = useId("count");

type CounterProps = {
  count?: number;
};

// View
export function Counter({ count = 0 }: CounterProps) {
  counterState.count = count;

  return (
    <div style={{ marginTop: "20px" }}>
      <IncrementButton />
      <span id={containerId}>{counterState.count}</span>
      <DecrementButton />
    </div>
  );
}

let counterContainer: HTMLElement | null;

function getCounterContainer() {
  if (counterContainer) {
    return counterContainer;
  }

  counterContainer = document.getElementById(containerId);

  return counterContainer;
}

export const incrementButtonId = "inc-btn";

function IncrementButton() {
  return (
    <button id={incrementButtonId} style={{ margin: "5px" }}>
      ➕1️⃣
    </button>
  );
}

export function increment() {
  // Update State
  counterState.count += 1;

  // Update View
  updateCountElement();
}

export const decrementButtonId = "dec-btn";

function DecrementButton() {
  return (
    <button id={decrementButtonId} style={{ margin: "5px" }}>
      ➖1️⃣
    </button>
  );
}

export function decrement() {
  // Update State
  counterState.count -= 1;

  // Update View
  updateCountElement();
}

// Update
function updateCountElement() {
  const container = getCounterContainer();

  if (!container) {
    return;
  }

  container.textContent = counterState.count.toString();

  container.style.color = counterState.count % 2 === 0 ? "purple" : "blue";
}
