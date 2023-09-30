import "./App.css";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <button onClick={() => setCount((count) => count - 1)}>
        count: {count}
      </button>

      <button onClick={() => setCount((count) => count + 1)}>
        count: {count}
      </button>
    </div>
  );
}

export default App;
