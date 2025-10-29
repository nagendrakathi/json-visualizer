"use client";
import React from "react";

const SAMPLE_JSON = `{
  "user": {
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "country": "USA"
    }
  },
  "items": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99
    },
    {
      "id": 2,
      "name": "Mouse",
      "price": 29.99
    }
  ],
  "active": true
}`;

export default function InputSection({
  handleInputChange,
  value,
  handleGenrateTree,
  error,
}: {
  handleInputChange: (newValue: string) => void;
  value: string;
  handleGenrateTree?: () => void;
  error?: string;
}) {
  return (
    <div className="w-full h-130 flex flex-col gap-3">
      <h2 className="text-xl font-semibold">Paste or type your JSON here</h2>
      <textarea
        name="json-input"
        id="json-input"
        title="json-input"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={SAMPLE_JSON}
        className={`resize-none mt-4 w-full h-full p-5 text-foreground outline-none border-2 rounded-lg bg-transparent font-mono text-sm ${
          error ? "border-red-500" : "border-primary/30"
        }`}
      ></textarea>
      {error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
          {error}
        </div>
      )}
      <button
        type="button"
        className="bg-foreground/70 focus-ring ring w-fit self-center px-10 py-2 rounded-md text-background hover:bg-foreground/60 transition duration-150 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleGenrateTree}
        disabled={!value.trim()}
      >
        Generate Tree
      </button>
    </div>
  );
}
