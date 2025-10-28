import React from "react";
import SearchInput from "./Input/search-input";

export default function Visualizer() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex items-center gap-4">
        <label htmlFor="json-path" className="mr-2">
          Search by JSON Path:
        </label>
        <SearchInput />
        <button
          type="button"
          className="bg-foreground/70 w-fit self-center px-10 py-2.5 rounded-md text-background hover:bg-foreground/60 transition duration-150 ease-in-out cursor-pointer"
        >
          Search
        </button>
      </div>
    </div>
  );
}
