import React, { memo, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { TreeNodeData, NODE_COLORS } from "@/lib/generateTree";
import toast from "react-hot-toast";

function CustomNode({ data }: NodeProps<TreeNodeData>) {
  const { label, nodeType, isHighlighted, path, value } = data;
  const [isHovered, setIsHovered] = useState(false);

  const backgroundColor = isHighlighted
    ? NODE_COLORS.highlighted
    : NODE_COLORS[nodeType];

  const hasTargetHandle = nodeType !== 'root';
  const hasSourceHandle = nodeType === 'root' || 
                          nodeType === 'object' || 
                          nodeType === 'array';

  const handleClick = () => {
    navigator.clipboard.writeText(path);
    toast.success(`Copied: ${path}`);
  };

  const getValueDisplay = () => {
    if (nodeType === 'primitive') {
      if (value === null) return 'null';
      if (typeof value === 'string') return `"${value}"`;
      return String(value);
    }
    if (typeof value === 'object' && value !== null) {
      return Array.isArray(value) ? `Array[${value.length}]` : 'Object';
    }
    return String(value);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        boxShadow: isHovered 
          ? '0 4px 12px rgba(0,0,0,0.25)' 
          : '0 2px 8px rgba(0,0,0,0.15)',
        transform: isHighlighted ? 'scale(1.1)' : isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
      }}
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
      
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1f2937',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        >
          <div style={{ marginBottom: '4px' }}>
            <strong>Path:</strong> {path}
          </div>
          <div>
            <strong>Value:</strong> {getValueDisplay()}
          </div>
          <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>
            Click to copy path
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #1f2937',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default memo(CustomNode);
