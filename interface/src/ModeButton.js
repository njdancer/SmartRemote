import React from 'react';
import styled from 'styled-components';

const StyledButton = ({ color, ...rest }) => {
  return <button {...rest} />
}

export default styled(StyledButton)`
  border-radius: 8px;
  border:1px solid black;
  cursor:pointer;
  width: 60px;
  height: 60px;
  transition: background-color 0.1s, color 0.1s, transform 0.1s;
  border-color: ${({color}) => color || 'black'};
  background-color: ${({active, color}) => active ? color : 'transparent'};
  color: ${({active, color}) =>  active ? 'white' : color};
`;
