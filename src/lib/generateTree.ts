import { Node, Edge } from 'reactflow';

export interface TreeNodeData {
  label: string;
  nodeType: 'root' | 'object' | 'array' | 'primitive';
  path: string;
  isHighlighted: boolean;
}

export const NODE_COLORS = {
  root: '#8B5CF6',
  object: '#7dd3c0',
  array: '#10B981',
  primitive: '#F59E0B',
  highlighted: '#EF4444',
};

const HORIZONTAL_SPACING = 200;
const VERTICAL_SPACING = 120;

export const generateTreeNodes = (
  jsonData: unknown,
  rootKey: string | null = null,
  rootPath: string = '$'
): { nodes: Node<TreeNodeData>[]; edges: Edge[] } => {
  const nodes: Node<TreeNodeData>[] = [];
  const edges: Edge[] = [];
  let nodeCounter = 0;

  const createNode = (
    value: unknown,
    key: string | null,
    currentPath: string,
    parentId: string | null,
    isRootLevel: boolean = false
  ): string => {
    const nodeId = `node-${nodeCounter++}`;
    let nodeType: TreeNodeData['nodeType'];
    let label: string;

    if (value === null || typeof value !== 'object') {
      nodeType = 'primitive';
      label = key !== null ? key : 'value';
    } else if (Array.isArray(value)) {
      nodeType = 'array';
      label = key !== null ? key : '[]';
    } else {
      nodeType = isRootLevel ? 'root' : 'object';
      label = key !== null ? key : (isRootLevel ? 'root' : '{}');
    }

    const backgroundColor = nodeType === 'root' 
      ? NODE_COLORS.root 
      : NODE_COLORS[nodeType];

    nodes.push({
      id: nodeId,
      type: 'default',
      position: { x: 0, y: 0 },
      data: {
        label,
        nodeType,
        path: currentPath,
        isHighlighted: false,
      },
      style: {
        background: backgroundColor,
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        fontSize: '13px',
        fontWeight: '500',
        minWidth: '80px',
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      },
    });

    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#9ca3af', strokeWidth: 2 },
      });
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const childPath = `${currentPath}[${index}]`;
        createNode(item, `[${index}]`, childPath, nodeId);
      });
    } else if (value !== null && typeof value === 'object') {
      const objValue = value as Record<string, unknown>;
      Object.keys(objValue).forEach((k) => {
        const childPath = `${currentPath}.${k}`;
        createNode(objValue[k], k, childPath, nodeId);
      });
    } else if (nodeType === 'primitive') {
      const valueNodeId = `node-${nodeCounter++}`;
      const displayValue = value === null ? 'null' : (typeof value === 'string' ? `"${value}"` : String(value));
      
      nodes.push({
        id: valueNodeId,
        type: 'default',
        position: { x: 0, y: 0 },
        data: {
          label: displayValue,
          nodeType: 'primitive',
          path: currentPath,
          isHighlighted: false,
        },
        style: {
          background: NODE_COLORS.primitive,
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          fontSize: '13px',
          fontWeight: '500',
          minWidth: '80px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
      });

      edges.push({
        id: `edge-${nodeId}-${valueNodeId}`,
        source: nodeId,
        target: valueNodeId,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#9ca3af', strokeWidth: 2 },
      });
    }

    return nodeId;
  };

  createNode(jsonData, rootKey, rootPath, null, true);

  return { nodes, edges };
};

export const calculateNodePositions = (
  nodes: Node<TreeNodeData>[],
  edges: Edge[]
): Node<TreeNodeData>[] => {
  const levelNodes: Map<number, string[]> = new Map();
  const nodeLevel: Map<string, number> = new Map();
  const childrenMap: Map<string, string[]> = new Map();

  edges.forEach(edge => {
    if (!childrenMap.has(edge.source)) {
      childrenMap.set(edge.source, []);
    }
    childrenMap.get(edge.source)!.push(edge.target);
  });

  const queue: [string, number][] = [];
  const rootNode = nodes[0]?.id;
  if (rootNode) {
    queue.push([rootNode, 0]);
    nodeLevel.set(rootNode, 0);
  }

  while (queue.length > 0) {
    const [nodeId, level] = queue.shift()!;
    
    if (!levelNodes.has(level)) {
      levelNodes.set(level, []);
    }
    levelNodes.get(level)!.push(nodeId);

    const children = childrenMap.get(nodeId) || [];
    children.forEach(childId => {
      if (!nodeLevel.has(childId)) {
        nodeLevel.set(childId, level + 1);
        queue.push([childId, level + 1]);
      }
    });
  }

  const positionedNodes = nodes.map(node => {
    const level = nodeLevel.get(node.id) || 0;
    const nodesAtLevel = levelNodes.get(level) || [];
    const indexAtLevel = nodesAtLevel.indexOf(node.id);
    const totalAtLevel = nodesAtLevel.length;

    const x = (indexAtLevel - (totalAtLevel - 1) / 2) * HORIZONTAL_SPACING;
    const y = level * VERTICAL_SPACING;

    return {
      ...node,
      position: { x, y },
    };
  });

  return positionedNodes;
};
