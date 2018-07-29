import React from 'react';
import ModeButton from './ModeButton';
import IconHeat from './icons/IconHeat.js';

const color = "#dc3545";

export default function HeatButton({active, handleClick}) {
  return (
    <ModeButton color={color} active={active} onClick={handleClick}>
      <IconHeat />
    </ModeButton>
  )
}
