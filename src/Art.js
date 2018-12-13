import React from "react";
import styled from "styled-components";

const Stripe = styled.div`
  height: 100%;
  width: ${props => props.width}px;
  background-color: ${props => props.color};
  display: flex;
  flex-grow: 1;
`;

const StripeContainer = styled.div`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  display: flex;
  overflow: auto;
  flex-grow: 1;
`;

const Dot = styled.div`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  background-color: ${props => props.color};
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  font-size: 100px;
  color: white;
  font-family: "Helvetica";
  letter-spacing: -12px;
`;

const TrackNameContainer = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  font-size: 30px;
  color: white;
  font-family: "Helvetica";
`;

const Art = ({
  logoTop,
  logoLeft,
  trackNameTop,
  trackNameLeft,
  trackName,
  artWidth,
  artHeight,
  hue,
  stripeColors,
  dotColors
}) => (
  <StripeContainer width={artWidth} height={artHeight}>
    {stripeColors.map(color => (
      <Stripe color={color} width={Math.random() * 100} />
    ))}
    {dotColors.map(color => (
      <Dot
        color={color}
        size={Math.random() * 25}
        top={Math.random() * artHeight}
        left={Math.random() * artWidth}
      />
    ))}
    <LogoContainer top={logoTop} left={logoLeft}>
      vedado
    </LogoContainer>
    <TrackNameContainer top={trackNameTop} left={trackNameLeft}>
      {trackName}
    </TrackNameContainer>
  </StripeContainer>
);

export default Art;
