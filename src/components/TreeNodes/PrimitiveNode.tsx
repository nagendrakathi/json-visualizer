import React from "react";
import { Handle, Position } from "reactflow";
import { TreeNodeData } from "@/lib/generateTree";

export default function PrimitiveNode({ data }: { data: TreeNodeData }) {
  const isHighlighted = data.isHighlighted;

  return (
    <div
      className={`px-6 py-3 rounded-2xl shadow-md border-0 transition-all min-w-[100px] outline-none focus:outline-none ${
        isHighlighted
          ? "bg-red-500 scale-110"
          : "bg-[#e6a964]"
      }`}
      title={`Path: ${data.path}\nValue: ${data.label}`}
    >
      <Handle type="target" position={Position.Top} className="bg-gray-400!" />
      <div className="text-white font-semibold text-base truncate max-w-sm">
        {data.label}
      </div>
    </div>
  );
}
