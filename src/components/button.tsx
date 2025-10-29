import cn from "@/lib/lib";
import { ButtonProps } from "@/types";
import React from "react";

export default function Button({ label, classnames }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "bg-foreground/70 focus-ring ring w-fit self-center px-10 py-2 rounded-md text-background hover:bg-foreground/60 transition duration-150 ease-in-out cursor-pointer",
        classnames
      )}

    >
      {label}
    </button>
  );
}
