import React from "react";

export default function SearchInput() {
  return (
    <input
      type="text"
      className="text-foreground outline-none border-2 border-primary/30 rounded-lg bg-transparent p-2 w-1/3"
      placeholder="($.user.address.city, items[0].name)"
    ></input>
  );
}
