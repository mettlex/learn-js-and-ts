"use client";

export function ControlButtons() {
  function transferToRight() {
    console.log("TODO: move to right");
  }

  function transferToLeft() {
    console.log("TODO: move to left");
  }

  return (
    <section className="flex flex-col gap-5 pt-10">
      <button
        onClick={() => {
          transferToRight();
        }}
        className="bg-purple-400 hover:bg-purple-600 h-6 w-6 rounded"
      >
        {">"}
      </button>

      <button
        onClick={() => {
          transferToLeft();
        }}
        className="bg-purple-400 hover:bg-purple-600 h-6 w-6 rounded"
      >
        {"<"}
      </button>
    </section>
  );
}
