import React from 'react';
import { getBezierPath, MarkerType } from 'react-flow-renderer';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  return (
    <>
      <path
        id={id}
        style={{ ...style, cursor: 'pointer' }}
        className="react-flow__edge-path"
        d={edgePath}
      />
      {/* <text>
        <textPath
          href={`#${id}-2`}
          style={{ fontSize: '16px', fill: style.stroke }}
          startOffset="50%"
          textAnchor="middle"
        >
          ➤
        </textPath>
      </text> */}
    </>
  );
}
