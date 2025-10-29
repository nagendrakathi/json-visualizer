import React, { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { TreeNodeData, NODE_COLORS } from "@/lib/generateTree";

function CustomNode({ data }: NodeProps<TreeNodeData>) {
  const { label, nodeType, isHighlighted, path, isPrimitiveValue } = data;

  const backgroundColor = isHighlighted
    ? NODE_COLORS.highlighted
    : NODE_COLORS[nodeType];

  // Determine if this node should have handles
  const hasTargetHandle = nodeType !== 'root';
  const hasSourceHandle = nodeType === 'root' || 
                          nodeType === 'object' || 
                          nodeType === 'array' || 
                          (nodeType === 'primitive' && !isPrimitiveValue); // Primitive key nodes have source handles

  return (
    <div
      style={{
        background: backgroundColor,
        color: 'white',
        border: 'none',
        borderRadius: '16px',
        padding: '12px 24px',
        fontSize: '14px',
        fontWeight: '600',
        minWidth: '100px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        transform: isHighlighted ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.3s ease',
      }}
      title={`Path: ${path}\nType: ${nodeType}`}
    >
      {hasTargetHandle && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: '#9ca3af' }}
        />
      )}
      <div>{label}</div>
      {hasSourceHandle && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: '#9ca3af' }}
        />
      )}
    </div>
  );
}

export default memo(CustomNode);
