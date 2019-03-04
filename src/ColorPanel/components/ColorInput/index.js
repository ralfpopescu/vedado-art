import React from "react";
import styled from "styled-components";

const Input = styled.input`
  font-family: Unica One;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Color = styled.div`
  background-color: ${props => props.color};
  height: 20px;
  width: 20px;
  transition: all 0.3s ease-in-out;
`;

const ColorInput = ({ color, width, colorOnChange, widthOnChange }) => (
  <Container>
    <Color color={color} />
    <Input value={color} onChange={colorOnChange} />
    <Input value={width} onChange={widthOnChange} />
  </Container>
);

export default ColorInput;
