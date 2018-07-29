import React from 'react';
import ModeButton from './ModeButton';
import IconCool from './icons/IconCool.js';

const color = "#4a78db";

export default function CoolButton({active, handleClick}) {
  return (
    <ModeButton color={color} active={active} onClick={handleClick}>
      <IconCool />
    </ModeButton>
  )
}
