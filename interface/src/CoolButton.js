import React, { Component } from 'react';
import styled, { css } from 'styled-components';
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
