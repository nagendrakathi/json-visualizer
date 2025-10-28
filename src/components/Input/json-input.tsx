import React from "react";

export default function JsonInput() {
  return (
    <textarea
      name="json-input"
      id="json-input"
      title="json-input"
      placeholder="Enter JSON here..."
      className="resize-none mt-5 w-full h-full p-5 text-foreground outline-none border-2 border-primary/30 rounded-lg bg-transparent"
    ></textarea>
  );
}
