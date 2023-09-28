import { createElement } from "../lib/tsx";
import { iifeForEvent, useId } from "../lib/utils";

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

// We should do something better than this! See: Todo.tsx
window.counterState = counterState;
window.updateCountElement = updateCountElement;

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

function IncrementButton() {
  return (
    <button
      onclick={iifeForEvent(() => {
        // Update State
        window.counterState.count += 1;

        // Update View
        window.updateCountElement();
      })}
      style={{ margin: "5px" }}
    >
      ➕1️⃣
    </button>
  );
}

function DecrementButton() {
  return (
    <button
      onclick={iifeForEvent(() => {
        // Update State
        window.counterState.count -= 1;

        // Update View
        window.updateCountElement();
      })}
      style={{ margin: "5px" }}
    >
      ➖1️⃣
    </button>
  );
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

// Need to be in global scope
declare global {
  interface Window {
    counterState: typeof counterState;
    updateCountElement: typeof updateCountElement;
  }
}
