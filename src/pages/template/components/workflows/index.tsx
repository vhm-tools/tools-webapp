import { FC, useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  NodeTypes,
  PanOnScrollMode,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { WorkflowNode } from './WorkflowNode';

import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 0, y: 0 },
    data: {
      label: 'Workflow Trigger',
      icon: <AiOutlineThunderbolt size={18} />,
    },
  },
  {
    id: '2',
    type: 'workflowNode',
    position: { x: 0, y: 100 },
    data: { label: 'Default' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: false },
];

const nodeTypes: NodeTypes = {
  workflowNode: WorkflowNode,
};

export const Workflow: FC = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges],
  );

  return (
    <div className="bg-gray-200 w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        panOnScrollMode={PanOnScrollMode.Vertical}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#ccc" variant={BackgroundVariant.Dots} />
        <Controls />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </div>
  );
};
