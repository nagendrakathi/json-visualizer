import React from "react";
import JsonInput from "./Input/json-input";

export default function InputSection() {
  return (
    <div className="w-full h-130 flex flex-col gap-5">
      <h2>Paste or type your JSON here</h2>
      <JsonInput />
      <button
        type="button"
        name="visualize"
        id="visualize"
        className="bg-foreground/70 w-fit self-center px-10 py-2 rounded-md text-background hover:bg-foreground/60 transition duration-150 ease-in-out cursor-pointer"
      >
        Visualize JSON
      </button>
    </div>
  );
}
