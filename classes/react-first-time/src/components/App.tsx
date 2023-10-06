import "./App.css";
import { useState } from "react";
import { GreetingForm, Greeting } from "./Greeting";

function App() {
  const [name, setName] = useState("Mom!");
  const [color, setColor] = useState("lightblue");

  return (
    <div className="card">
      <GreetingForm setName={setName} setColor={setColor} />

      <Greeting name={name} color={color} />
    </div>
  );
}

export default App;
