import React from "react";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      {" "}
      <h1 className="text-2xl text-foreground tracking-tight font-medium">
        Json Visualizer
      </h1>
      <ThemeToggle />{" "}
    </header>
  );
}
