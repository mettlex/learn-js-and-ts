"use client";

type ControlButtonsProps = {
  transferToRight: () => void;
  transferToLeft: () => void;
};

export function ControlButtons({
  transferToRight,
  transferToLeft,
}: ControlButtonsProps) {
  return (
    <section className="flex flex-col gap-5 pt-10">
      <button
        onClick={() => {
          transferToRight();
        }}
        className="bg-blue-400 hover:bg-blue-600 h-6 w-6 rounded"
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
