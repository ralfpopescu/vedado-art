import React from "react";
import styled from "styled-components";
import ColorInput from "./components/ColorInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorPanel = ({ colors }) => (
  <Container>
    {colors.map(color => (
      <ColorInput color={color} style={{ marginBottom: "16px" }} />
    ))}
  </Container>
);

export default ColorPanel;
