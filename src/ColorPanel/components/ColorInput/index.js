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
`;

const ColorInput = ({ color }) => (
  <Container>
    <Color color={color} />
    <Input value={color} />
  </Container>
);

export default ColorInput;
