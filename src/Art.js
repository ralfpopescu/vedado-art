import React, { useRef } from "react";
import styled from "styled-components";

const Stripe = styled.div`
  height: 100%;
  width: ${props => props.width}px;
  background-color: ${props => props.color};
  display: flex;
  flex-grow: 1;
`;

const StripeContainer = styled.div`
  position: relative;
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
  font-family: "Times New Roman", Times, serif;
`;

const TrackNameContainer = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  font-size: 30px;
  color: white;
  font-family: "Times New Roman", Times, serif;
`;

const Texture = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  ${props => props.texture};
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
  dotColors,
  texture,
  id,
  forwardedRef
}) => {
  return (
    <StripeContainer width={artWidth} height={artHeight} ref={forwardedRef}>
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
      {console.log(texture)}
      <Texture texture={texture.value} />
      <LogoContainer top={logoTop} left={logoLeft}>
        VEDADO
      </LogoContainer>
      <TrackNameContainer top={trackNameTop} left={trackNameLeft}>
        {trackName}
      </TrackNameContainer>
    </StripeContainer>
  );
};

const ArtWithForwardedRef = React.forwardRef((props, ref) => (
  <Art {...props} forwardedRef={ref} />
));

export default ArtWithForwardedRef;
