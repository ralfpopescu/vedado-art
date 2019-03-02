import React from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "./icons/play-arrow.svg";

const LayoutRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const LayoutColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const DirectionButton = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: #666666;
  cursor: pointer;
  opacity: 1;

  &:hover {
    opacity: 0.7;
  }
`;

const ButtonGroup = ({ fieldTop, fieldLeft, center, amount }) => (
  <LayoutRow>
    <LayoutColumn style={{ justifyContent: "center" }}>
      <DirectionButton
        onClick={() =>
          this.setState(prevState => ({
            [fieldLeft]: prevState[fieldLeft] - amount,
            [center]: false
          }))
        }
      >
        <Arrow
          style={{
            width: "25px",
            height: "25px",
            transform: "rotate(180deg)"
          }}
        />
      </DirectionButton>
    </LayoutColumn>
    <LayoutColumn>
      <DirectionButton
        onClick={() =>
          this.setState(prevState => ({
            [fieldTop]: prevState[fieldTop] - amount,
            [center]: false
          }))
        }
      >
        <Arrow
          style={{
            width: "25px",
            height: "25px",
            transform: "rotate(270deg)"
          }}
        />
      </DirectionButton>
      <DirectionButton
        onClick={() =>
          this.setState(prevState => ({
            [center]: !prevState[center]
          }))
        }
      >
        <div
          style={{
            border: `${this.state[center] ? 3 : 2}px solid ${
              this.state[center] ? "#bfbfbf" : "#666666"
            }`,
            height: "10px",
            width: "10px",
            borderRadius: "4px"
          }}
        />
      </DirectionButton>
      <DirectionButton
        onClick={() =>
          this.setState(prevState => ({
            [fieldTop]: prevState[fieldTop] + amount,
            [center]: false
          }))
        }
      >
        <Arrow
          style={{
            width: "25px",
            height: "25px",
            transform: "rotate(90deg)"
          }}
        />
      </DirectionButton>
    </LayoutColumn>
    <LayoutColumn style={{ justifyContent: "center" }}>
      <DirectionButton
        onClick={() =>
          this.setState(prevState => ({
            [fieldLeft]: prevState[fieldLeft] + amount,
            [center]: false
          }))
        }
      >
        <Arrow
          style={{
            width: "25px",
            height: "25px"
          }}
        />
      </DirectionButton>
    </LayoutColumn>
  </LayoutRow>
);

export default ButtonGroup;
