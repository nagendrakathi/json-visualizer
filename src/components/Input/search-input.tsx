"use client";
import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
}

export default function SearchInput({ value, onChange, onEnter }: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <input
      type="text"
      className="text-foreground outline-none border-2 border-primary/30 rounded-lg bg-transparent p-2 flex-1 min-w-[200px] focus:border-primary/60 transition"
      placeholder="e.g., $.user.address.city or $.items[0].name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
