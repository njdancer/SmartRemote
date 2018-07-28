import styled from 'styled-components';

export default styled.button`
  border-radius: 8px;
  border:1px solid black;
  cursor:pointer;
  width: 40px;
  height: 40px;
  transition: background-color 0.1s, color 0.1s, transform 0.1s;
  border-color: ${({color}) => color || 'black'};
  background-color: ${({active, color}) => active ? color : 'transparent'};
  color: ${({active, color}) =>  active ? 'white' : color};
`;
