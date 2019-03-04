import React from "react";
import styled from "styled-components";
import ColorInput from "./components/ColorInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorPanel = ({ stripes, handleColorChange, handleWidthChange }) => (
  <Container>
    {stripes.map(({ color, width }, index) => (
      <ColorInput
        color={color}
        width={width}
        style={{ marginBottom: "16px" }}
        colorOnChange={handleColorChange(index)}
        widthOnChange={handleWidthChange(index)}
      />
    ))}
  </Container>
);

export default ColorPanel;
