import React from 'react';
import styled from 'styled-components';

const canvasSize = 100;

function SunSpikes({count, length, roundness, thickness}) {
  const spikes = [];
  for (var i = 0; i < count; i++) {
    spikes.push(<rect
      key={i}
      x={canvasSize / 2 - thickness / 2}
      y="0"
      width={thickness}
      height={length}
      rx={roundness}
      ry={roundness}
      transform={[
        `rotate(${(360 / count) * i}, ${canvasSize / 2}, ${canvasSize / 2})`,
        // `translate(${-thickness / 2} 0 )`,
      ]}/>
    )
  }

  return spikes;
}

export default function IconHeat({className}) {
  return (
    <svg className={className} viewBox={`0 0 ${canvasSize} ${canvasSize}`}>
      <SunSpikes count="8" length="23" roundness="3" thickness="10"/>
      <circle cx={canvasSize / 2} cy={canvasSize / 2} r="21" />
    </svg>
  )
}
