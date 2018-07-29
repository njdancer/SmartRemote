import React from 'react';
import ModeButton from './ModeButton';
import IconDry from './icons/IconDry.js';

const color = "lightgrey";

export default function DryButton({active, handleClick}) {
  return (
    <ModeButton color={color} active={active} onClick={handleClick}>
      <IconDry />
    </ModeButton>
  )
}
