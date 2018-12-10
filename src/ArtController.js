import React from 'react'
import styled from 'styled-components'
import Art from './Art2'
import randomColor from 'randomcolor'

const DirectionButton = styled.button`
  color: red;
  width: 100px;
  height: 50px;
`

const RandomizeButton = styled.button`
  color: red;
  background-color: blue;
  width: 100px;
  height: 50px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const LayoutRow = styled.div`
  display: flex;
  flex-direction: row;
`
const LayoutColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  margin-bottom: 20px;
`

const generateColors = (number, hue) => {
  return randomColor({
    count: number,
    luminosity: 'random',
    hue: hue
});
}

class ArtController extends React.Component {
  constructor(props) {
    super(props)
    this.state = { logoTop: 0, logoLeft: 0, trackNameTop: 0, trackNameLeft: 0,
      trackName: '', hue: 'purple', numberOfStripes: 15, numberOfDots: 15,
      stripeColors: generateColors(15, 'random'), dotColors: generateColors(15, 'random')
    }
    this.handleTrackNameChange = this.handleTrackNameChange.bind(this)
    this.handleHueChange = this.handleHueChange.bind(this)
    this.handleStripeNumberChange = this.handleStripeNumberChange.bind(this)
    this.handleDotNumberChange = this.handleDotNumberChange.bind(this)
    this.randomizeColors = this.randomizeColors.bind(this)
  }

  handleTrackNameChange(event) {
    this.setState({trackName: event.target.value});
  }

  handleHueChange(event) {
    this.setState({hue: event.target.value});
    this.setState({stripeColors: generateColors(this.state.numberOfStripes, event.target.value)});
    this.setState({dotColors: generateColors(this.state.numberOfDots, event.target.value)});
  }

  handleStripeNumberChange(event) {
    this.setState({numberOfStripes: event.target.value});
    this.setState({stripeColors: generateColors(event.target.value, this.state.hue)});
  }

  handleDotNumberChange(event) {
    this.setState({numberOfDots: event.target.value});
    this.setState({dotColors: generateColors(event.target.value, this.state.hue)});
  }

  randomizeColors() {
      this.setState({stripeColors: generateColors(this.state.numberOfStripes, this.state.hue)});
      this.setState({dotColors: generateColors(this.state.numberOfDots, this.state.hue)});
  }

  ButtonGroup = ({ fieldTop, fieldLeft }) => (
    <LayoutRow>
      <DirectionButton onClick={() =>
        this.setState(prevState => ({ [fieldLeft]: prevState[fieldLeft] - 10 }) )}>
        left
      </DirectionButton>
      <LayoutColumn>
        <DirectionButton onClick={() =>
          this.setState(prevState => ({ [fieldTop]: prevState[fieldTop] - 10 }) )}>
          up
        </DirectionButton>
        <DirectionButton onClick={() =>
          this.setState(prevState => ({ [fieldTop]: prevState[fieldTop] + 10 }) )}>
          down
        </DirectionButton>
      </LayoutColumn>
      <DirectionButton onClick={() =>
        this.setState(prevState => ({ [fieldLeft]: prevState[fieldLeft] + 10 }) )}>
        right
      </DirectionButton>
    </LayoutRow>
  )

  render() {
    const { logoTop, logoLeft, trackNameLeft, trackNameTop, trackName, hue, stripeColors, dotColors } = this.state
    const { ButtonGroup } = this
    return (
      <Container>
        <Art logoTop={logoTop} logoLeft={logoLeft} trackNameTop={trackNameTop}
          trackNameLeft={trackNameLeft} trackName={trackName} hue={hue}
          stripeColors={stripeColors} dotColors={dotColors}/>
        Logo Position top: {logoTop} left: {logoLeft}
        <ButtonGroup fieldTop="logoTop" fieldLeft="logoLeft" />
        Track Name Position top: {trackNameTop} left: {trackNameLeft}
        <ButtonGroup fieldTop="trackNameTop" fieldLeft="trackNameLeft" />
        Track Name
        <Input type="text" value={this.state.trackName} onChange={this.handleTrackNameChange} />
        Hue
        <Input type="text" value={this.state.hue} onChange={this.handleHueChange} />
        Number of Stripes
        <Input type="text" value={this.state.numberOfStripes} onChange={this.handleStripeNumberChange} />
        Number of Dots
        <Input type="text" value={this.state.numberOfDots} onChange={this.handleDotNumberChange} />
        <RandomizeButton onClick={this.randomizeColors}>RANDOMIZE COLORS</RandomizeButton>
      </Container>
    )
  }
}

export default ArtController
