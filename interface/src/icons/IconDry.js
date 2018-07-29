import React from 'react';
import styled from 'styled-components';
import partialCircle from 'svg-partial-circle';

const canvasSize = 100;

const strokeWidth = 12;

const radius = 30;
const height = canvasSize - strokeWidth;

const sqrd = base => Math.pow(base, 2);

const trig = {}
trig.c = height - radius;
trig.b = radius;
trig.a = Math.sqrt(sqrd(trig.c) - sqrd(trig.b));

trig.ab = Math.PI / 2;
trig.bc = Math.asin(trig.a / trig.c);
trig.ac = Math.PI - trig.ab - trig.bc;

const top = {
  x: canvasSize / 2,
  y: (canvasSize - height) / 2,
};

const center = {
  x: top.x,
  y: top.y + height - radius,
}

const angleAtJoint = -(Math.PI / 2) + trig.bc;
const joint = {
  x: center.x + (Math.cos(angleAtJoint) * radius),
  y: center.y + (Math.sin(angleAtJoint) * radius),
}

const roundPath = partialCircle(
  center.x, center.y,
  radius,
  angleAtJoint,
  Math.PI - angleAtJoint
)[1].splice(1).join(' ');

const NoFillSVG = styled.svg`
  fill: none;
`

export default function IconDry({className}) {
  return (
    <NoFillSVG className={className} viewBox={`0 0 ${canvasSize} ${canvasSize}`} strokeWidth={strokeWidth} strokeLinejoin="round" >
      <path d={`
        M${top.x} ${top.y}
        L${joint.x} ${joint.y}
        A${roundPath}
        L${top.x} ${top.y}
        Z
      `} />
    </NoFillSVG>
  )
}
