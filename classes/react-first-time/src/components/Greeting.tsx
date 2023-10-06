import { Dispatch, SetStateAction } from "react";

type Props = {
  name: string;
  color: string;
};

export function Greeting({ name, color }: Props) {
  return <h1 style={{ color: color }}>Hi, {name}</h1>;
}

type GreetingFormProps = {
  setName: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<string>>;
};

export function GreetingForm({ setName, setColor }: GreetingFormProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Name:</label>
      <input onChange={(event) => setName(event.target.value)} />

      <label>Color:</label>
      <input onChange={(event) => setColor(event.target.value)} />
    </div>
  );
}
