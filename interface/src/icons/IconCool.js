import React from 'react';

const canvasSize = 100;

function Branches({count, roundness, thickness}) {
  const branches = [];
  for (var i = 0; i < count; i++) {
    branches.push(<rect
      key={i}
      x={canvasSize / 2 - thickness / 2}
      width={thickness}
      height={canvasSize}
      rx={roundness}
      ry={roundness}
      transform={[
        `rotate(${((360 / count) * i) + ((360 / count) / 4)} ${canvasSize / 2} ${canvasSize / 2})`,
      ]}/>)
  }

  return branches;
}

export default function IconHeat({className}) {
  return (
    <svg className={className} viewBox={`0 0 ${canvasSize} ${canvasSize}`}>
      <Branches count="3" roundness="5" thickness="12"/>
    </svg>
  )
}
