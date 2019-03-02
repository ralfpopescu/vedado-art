import React from "react";
import styled from "styled-components";
import ColorInput from "./components/ColorInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorPanel = ({ stripes }) => (
  <Container>
    {stripes.map(({ color, width }) => (
      <ColorInput
        color={color}
        width={width}
        style={{ marginBottom: "16px" }}
      />
    ))}
  </Container>
);

export default ColorPanel;
