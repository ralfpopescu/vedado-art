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

const ColorInput = ({ color, width }) => (
  <Container>
    <Color color={color} />
    <Input value={color} />
    <Input value={width} />
  </Container>
);

export default ColorInput;
