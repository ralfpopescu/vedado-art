import React, { useRef, useCallback, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import html2canvas from "html2canvas";
import hexRgb from "hex-rgb";

const Stripe = styled.div`
  width: ${props => props.width}px;
  background-color: ${props => {
    const colors = hexRgb(props.color, { format: "array" });
    return `rgba(${colors[0]},${colors[1]},${colors[2]}, ${props.opacity})`;
  }};
  display: flex;
  flex-grow: 1;
  transition: all 0.3s ease-in-out;
`;

const FullContainer = styled.div`
  position: relative;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  border: ${props => props.isDragActive && "3px blue solid"};
  display: flex;
  overflow: auto;
  flex-grow: 1;
  transition: all 0.3s ease-in-out;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const StripeContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  overflow: auto;
  flex-grow: 1;
  transition: all 0.3s ease-in-out;
`;

const Dot = styled.div`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  background-color: ${props => {
    const colors = hexRgb(props.color, { format: "array" });
    return `rgba(${colors[0]},${colors[1]},${colors[2]}, ${props.opacity})`;
  }};
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  transition: all 0.3s ease-in-out;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  font-size: 100px;
  color: white;
  transition: all 0.3s ease-in-out;
`;

const TrackNameContainer = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  font-size: 30px;
  color: white;
  transition: all 0.3s ease-in-out;
`;

const Texture = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  ${props => props.texture};
  transition: all 0.3s ease-in-out;
`;

const Gradient = styled.div`
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.3),
    rgba(255, 255, 255, 0.3)
  );
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const getBase64 = (file, cb) => {
  console.log(file);
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
    cb(reader.result);
  };
  reader.onerror = function(error) {
    console.log("Error: ", error);
  };
};

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
  centerLogo,
  centerTrackname,
  dotColors,
  texture,
  stripes,
  opacity,
  id,
  forwardedRef
}) => {
  const logoRef = useRef(null);
  const trackNameRef = useRef(null);
  const [file, setFile] = useState(null);
  const onDrop = useCallback(acceptedFiles => {
    getBase64(acceptedFiles[0], setFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div ref={forwardedRef}>
      <FullContainer
        width={artWidth}
        height={artHeight}
        {...getRootProps()}
        isDragActive={isDragActive}
      >
        {console.log(file)}
        <input {...getInputProps()} style={{ display: "none" }} />
        <ImageContainer>
          <img src={file} style={{ width: "100%", height: "100%" }} />
        </ImageContainer>
        <StripeContainer>
          {stripes.map(({ color, width }) => (
            <Stripe color={color} width={width} opacity={opacity} />
          ))}
          {dotColors.map(color => (
            <Dot
              color={color}
              opacity={opacity}
              size={Math.random() * 25}
              top={Math.random() * artHeight}
              left={Math.random() * artWidth}
            />
          ))}
          <Texture texture={texture.value} />
          <Gradient />
          <LogoContainer
            top={
              centerLogo
                ? artHeight / 2 -
                  logoRef.current.getBoundingClientRect().height * 0.75
                : logoTop
            }
            left={
              centerLogo
                ? artWidth / 2 -
                  logoRef.current.getBoundingClientRect().width / 2
                : logoLeft
            }
            ref={logoRef}
          />
          <TrackNameContainer
            top={
              centerTrackname
                ? artHeight / 2 -
                  trackNameRef.current.getBoundingClientRect().height * 0.75 +
                  60
                : trackNameTop
            }
            left={
              centerTrackname
                ? artWidth / 2 -
                  trackNameRef.current.getBoundingClientRect().width / 2
                : trackNameLeft
            }
            ref={trackNameRef}
          >
            {trackName}
          </TrackNameContainer>
        </StripeContainer>
      </FullContainer>
    </div>
  );
};

const ArtWithForwardedRef = React.forwardRef((props, ref) => (
  <Art {...props} forwardedRef={ref} />
));

export default ArtWithForwardedRef;
