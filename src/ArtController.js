import React from "react";
import styled from "styled-components";
import Art from "./Art";
import { textures } from "./Textures";
import randomColor from "randomcolor";
import domtoimage from "dom-to-image";
import Select from "react-select";

const DirectionButton = styled.button`
  color: red;
  width: 100px;
  height: 50px;
`;

const RandomizeButton = styled.button`
  color: red;
  background-color: blue;
  width: 100px;
  height: 50px;
`;

const DownloadButton = styled.button`
  color: yellow;
  background-color: orange;
  width: 100px;
  height: 50px;
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
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
  margin-bottom: 20px;
`;

const generateColors = (number, hue) => {
  return randomColor({
    count: number,
    luminosity: "random",
    hue: hue
  });
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
      hue: "purple",
      artWidth: 500,
      artHeight: 500,
      numberOfStripes: 15,
      numberOfDots: 15,
      stripeColors: generateColors(15, "random"),
      dotColors: generateColors(15, "random"),
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

  ButtonGroup = ({ fieldTop, fieldLeft, amount }) => (
    <LayoutRow>
      <DirectionButton
        onClick={() =>
          this.setState(prevState => ({
            [fieldLeft]: prevState[fieldLeft] - amount
          }))
        }
      >
        left
      </DirectionButton>
      <LayoutColumn>
        <DirectionButton
          onClick={() =>
            this.setState(prevState => ({
              [fieldTop]: prevState[fieldTop] - amount
            }))
          }
        >
          up
        </DirectionButton>
        <DirectionButton
          onClick={() =>
            this.setState(prevState => ({
              [fieldTop]: prevState[fieldTop] + amount
            }))
          }
        >
          down
        </DirectionButton>
      </LayoutColumn>
      <DirectionButton
        onClick={() =>
          this.setState(prevState => ({
            [fieldLeft]: prevState[fieldLeft] + amount
          }))
        }
      >
        right
      </DirectionButton>
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
      stripeColors,
      dotColors,
      texture
    } = this.state;
    const { ButtonGroup } = this;
    return (
      <Container>
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
          ref={this.artRef}
        />
        Logo Position top: {logoTop} left: {logoLeft}
        <ButtonGroup fieldTop="logoTop" fieldLeft="logoLeft" amount={10} />
        Track Name Position top: {trackNameTop} left: {trackNameLeft}
        <ButtonGroup
          fieldTop="trackNameTop"
          fieldLeft="trackNameLeft"
          amount={10}
        />
        Track Name
        <Input
          type="text"
          value={this.state.trackName}
          onChange={this.handleTrackNameChange}
        />
        Hue
        <Input
          type="text"
          value={this.state.hue}
          onChange={this.handleHueChange}
        />
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
        <Select
          options={textures}
          onChange={this.handleTextureChange}
          value={texture.value}
          placeholder="Select a texture"
        />
        <RandomizeButton onClick={this.randomizeColors}>
          RANDOMIZE COLORS
        </RandomizeButton>
        <DownloadButton onClick={this.download}>Download</DownloadButton>
      </Container>
    );
  }
}

export default ArtController;
