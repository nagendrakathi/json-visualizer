import React from "react";
import SearchInput from "./Input/search-input";
import Button from "./Input/button";

export default function Visuals() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex items-center">
        <label htmlFor="json-path" className="mr-2">
          Search by Path:
        </label>
        <SearchInput />
        <Button label="Search" classnames="ml-2"/>
      </div>
    </div>
  );
}
