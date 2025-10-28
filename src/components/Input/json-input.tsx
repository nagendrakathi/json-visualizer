import { JsonInputProps } from "@/types";
import React from "react";

export default function JsonInput({ value, handleChange }: JsonInputProps) {
  return (
    <textarea
      name="json-input"
      id="json-input"
      title="json-input"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Enter JSON here..."
      className="resize-none mt-4 w-full h-full p-5 text-foreground outline-none border-2 border-primary/30 rounded-lg bg-transparent"
    ></textarea>
  );
}
