// "use client";
import React, { useState } from "react";
import Button from "./button";

export default function InputSection({
  handleInputChange,
  value,
  handleGenrateTree,
}: {
  handleInputChange: (newValue: string) => void;
  value: string;
  handleGenrateTree?: () => void;
}) {
  return (
    <div className="w-full h-130 flex flex-col gap-3">
      <h2>Paste or type your JSON here</h2>
      <textarea
        name="json-input"
        id="json-input"
        title="json-input"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Enter JSON here..."
        className="resize-none mt-4 w-full h-full p-5 text-foreground outline-none border-2 border-primary/30 rounded-lg bg-transparent"
      ></textarea>
      <button
        type="button"
        className="bg-foreground/70 focus-ring ring w-fit self-center px-10 py-2 rounded-md text-background hover:bg-foreground/60 transition duration-150 ease-in-out cursor-pointer"
        onClick={handleGenrateTree}
      >
        Generate Tree
      </button>
    </div>
  );
}
