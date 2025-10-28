"use client";
import React, { useState } from "react";
import JsonInput from "./Input/json-input";
import Button from "./Input/button";

export default function InputSection() {
  const [jsonData, setJsonData] = useState<string>("");
  return (
    <div className="w-full h-130 flex flex-col gap-3">
      <h2>Paste or type your JSON here</h2>
      <JsonInput
        value={jsonData}
        handleChange={(newValue: string) => setJsonData(newValue)}
      />
      <Button label="Visualize JSON" />
    </div>
  );
}
