import React from "react";
import styled from "styled-components";
import Art from "./Art";
import { textures } from "./Textures";
import randomColor from "randomcolor";
import domtoimage from "dom-to-image";
import Select from "react-select";
import ColorPanel from "./ColorPanel";
import { ReactComponent as Arrow } from "./icons/play-arrow.svg";
import { ReactComponent as Download } from "./icons/download.svg";

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

const RandomizeButton = styled.button`
  color: #666666;
  background-color: transparent;
  width: 100px;
  height: 50px;
  border: 2px solid #666666;
  font-family: Unica One;
`;

const DownloadContainer = styled.div`
  opacity: 1;
  cursor: pointer;
  width: 50px;

  &:hover {
    opacity: 0.7;
  }
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  height: 1200px;
`;

const LayoutRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const LayoutColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 16px;
  font-family: Unica One;
`;

const FieldHeader = styled.div`
  font-size: 1.5rem;
  margin-bottom: 8px;
  margin-top: 8px;
`;

const generateColors = (number, hue) => {
  return randomColor({
    count: number,
    luminosity: "random",
    hue: hue
  });
};

const generateStripes = (number, hue) => {
  const colors = randomColor({
    count: number,
    luminosity: "random",
    hue: hue
  });

  return colors.map(color => ({
    color,
    width: Math.round(Math.random() * 100)
  }));
};

class ArtController extends React.Component {
  constructor(props) {
    super(props);
    this.artRef = React.createRef();
    this.state = {
      logoTop: 0,
      logoLeft: 0,
      trackNameTop: 0,
      trackNameLeft: 0,
      trackName: "",
      hue: "random",
      artWidth: 500,
      artHeight: 500,
      numberOfStripes: 15,
      numberOfDots: 0,
      centerLogo: false,
      centerTrackname: false,
      stripeColors: generateColors(15, "random"),
      dotColors: generateColors(0, "random"),
      stripes: generateStripes(15, "random"),
      texture: "none"
    };
    this.handleTrackNameChange = this.handleTrackNameChange.bind(this);
    this.handleHueChange = this.handleHueChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleStripeNumberChange = this.handleStripeNumberChange.bind(this);
    this.handleDotNumberChange = this.handleDotNumberChange.bind(this);
    this.randomizeColors = this.randomizeColors.bind(this);
    this.handleTextureChange = this.handleTextureChange.bind(this);
    this.randomizeTexture = this.randomizeTexture.bind(this);
    this.randomizeWidths = this.randomizeWidths.bind(this);
    this.download = this.download.bind(this);
  }

  handleTrackNameChange(event) {
    this.setState({ trackName: event.target.value });
  }

  handleHueChange(event) {
    this.setState({ hue: event.target.value });
    this.setState({
      stripeColors: generateColors(
        this.state.numberOfStripes,
        event.target.value
      )
    });
    this.setState({
      dotColors: generateColors(this.state.numberOfDots, event.target.value)
    });
  }

  handleWidthChange(event) {
    this.setState({ artWidth: event.target.value });
  }

  handleHeightChange(event) {
    this.setState({ artHeight: event.target.value });
  }

  handleStripeNumberChange(event) {
    this.setState({ numberOfStripes: event.target.value });
    this.setState({
      stripeColors: generateColors(event.target.value, this.state.hue)
    });
    this.setState({
      stripes: generateStripes(event.target.value, this.state.hue)
    });
  }

  handleDotNumberChange(event) {
    this.setState({ numberOfDots: event.target.value });
    this.setState({
      dotColors: generateColors(event.target.value, this.state.hue)
    });
  }

  handleTextureChange(value) {
    this.setState({ texture: value });
  }

  randomizeColors() {
    this.setState({
      stripeColors: generateColors(this.state.numberOfStripes, this.state.hue)
    });
    this.setState({
      dotColors: generateColors(this.state.numberOfDots, this.state.hue)
    });
    this.setState(prevState => ({
      stripes: prevState.stripes.map(stripe => ({
        color: randomColor({
          luminosity: "random",
          hue: this.state.hue
        }),
        width: stripe.width
      }))
    }));
  }

  randomizeWidths() {
    this.setState(prevState => ({
      stripes: prevState.stripes.map(stripe => ({
        color: stripe.color,
        width: Math.round(Math.random() * 100)
      }))
    }));
  }

  randomizeTexture() {
    const randomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.handleTextureChange(textures[randomInteger(1, textures.length)]);
  }

  download() {
    console.log(this.artRef.current);
    domtoimage
      .toPng(this.artRef.current)
      .then(function(dataUrl) {
        var link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  }

  ButtonGroup = ({ fieldTop, fieldLeft, center, amount }) => (
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

  render() {
    const {
      logoTop,
      logoLeft,
      trackNameLeft,
      trackNameTop,
      trackName,
      hue,
      artWidth,
      artHeight,
      centerLogo,
      centerTrackname,
      stripeColors,
      stripes,
      dotColors,
      texture
    } = this.state;
    const { ButtonGroup } = this;
    return (
      <Container>
        <LayoutColumn
          style={{
            padding: "30px",
            overflowY: "auto",
            background: "#e6e6e6",
            height: "100%"
          }}
        >
          <LayoutColumn>
            <FieldHeader>POSITION</FieldHeader>
            <LayoutRow>
              <LayoutColumn
                style={{ alignItems: "center", marginRight: "16px" }}
              >
                Logo
                <ButtonGroup
                  fieldTop="logoTop"
                  fieldLeft="logoLeft"
                  center="centerLogo"
                  amount={10}
                />
                top: {logoTop} left: {logoLeft}
              </LayoutColumn>
              <LayoutColumn>
                Track Name
                <ButtonGroup
                  fieldTop="trackNameTop"
                  fieldLeft="trackNameLeft"
                  center="centerTrackname"
                  amount={10}
                />
                top: {trackNameTop} left: {trackNameLeft}
              </LayoutColumn>
            </LayoutRow>
          </LayoutColumn>
          <FieldHeader>CONTENT</FieldHeader>
          Track Name
          <Input
            type="text"
            value={this.state.trackName}
            onChange={this.handleTrackNameChange}
          />
          <FieldHeader>ATTRIBUTES</FieldHeader>
          Art Width
          <Input
            type="text"
            value={this.state.artWidth}
            onChange={this.handleWidthChange}
          />
          Art Height
          <Input
            type="text"
            value={this.state.artHeight}
            onChange={this.handleHeightChange}
          />
          Number of Stripes
          <Input
            type="text"
            value={this.state.numberOfStripes}
            onChange={this.handleStripeNumberChange}
          />
          Number of Dots
          <Input
            type="text"
            value={this.state.numberOfDots}
            onChange={this.handleDotNumberChange}
          />
          <FieldHeader>APPEARANCE</FieldHeader>
          Hue
          <Input
            type="text"
            value={this.state.hue}
            onChange={this.handleHueChange}
          />
          Texture
          <Select
            options={textures}
            onChange={this.handleTextureChange}
            value={texture.value}
            placeholder="Select a texture"
          />
          <FieldHeader>RANDOMIZE</FieldHeader>
          <RandomizeButton onClick={this.randomizeColors}>
            RANDOMIZE COLORS
          </RandomizeButton>
          <RandomizeButton onClick={this.randomizeWidths}>
            RANDOMIZE WIDTHS
          </RandomizeButton>
          <RandomizeButton onClick={this.randomizeTexture}>
            RANDOMIZE TEXTURE
          </RandomizeButton>
          <RandomizeButton
            onClick={() => {
              this.randomizeTexture();
              this.randomizeWidths();
              this.randomizeColors();
            }}
          >
            RANDOMIZE
          </RandomizeButton>
          <DownloadContainer>
            <Download
              onClick={this.download}
              style={{ width: "50px", height: "50px" }}
            />
          </DownloadContainer>
        </LayoutColumn>
        <div
          style={{
            height: "100%",
            width: this.state.artWidth,
            padding: "50px"
          }}
        >
          <Art
            logoTop={logoTop}
            logoLeft={logoLeft}
            trackNameTop={trackNameTop}
            trackNameLeft={trackNameLeft}
            trackName={trackName}
            artWidth={artWidth}
            artHeight={artHeight}
            hue={hue}
            stripeColors={stripeColors}
            dotColors={dotColors}
            texture={texture}
            centerLogo={centerLogo}
            centerTrackname={centerTrackname}
            stripes={stripes}
            ref={this.artRef}
          />
        </div>
        <LayoutColumn style={{ padding: "50px" }}>
          <ColorPanel stripes={stripes} />
        </LayoutColumn>
      </Container>
    );
  }
}

export default ArtController;
