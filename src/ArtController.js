import React from 'react'
import styled from 'styled-components'
import Art from './Art2'

const DirectionButton = styled.button`
  color: red;
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

class ArtController extends React.Component {
  constructor(props) {
    super(props)
    this.state = { logoTop: 0, logoLeft: 0, trackNameTop: 0, trackNameLeft: 0, trackName: '', hue: 'purple' }
    this.handleTrackNameChange = this.handleTrackNameChange.bind(this)
    this.handleHueChange = this.handleHueChange.bind(this)
  }

  handleTrackNameChange(event) {
    this.setState({trackName: event.target.value});
  }

  handleHueChange(event) {
    this.setState({hue: event.target.value});
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
    const { logoTop, logoLeft, trackNameLeft, trackNameTop, trackName, hue } = this.state
    const { ButtonGroup } = this
    return (
      <Container>
        <Art logoTop={logoTop} logoLeft={logoLeft} trackNameTop={trackNameTop} trackNameLeft={trackNameLeft} trackName={trackName} hue={hue}/>
        Logo Position
        <ButtonGroup fieldTop="logoTop" fieldLeft="logoLeft" />
        Track Name Position
        <ButtonGroup fieldTop="trackNameTop" fieldLeft="trackNameLeft" />
        Track Name
        <input type="text" value={this.state.trackName} onChange={this.handleTrackNameChange} />
        Hue
        <input type="text" value={this.state.hue} onChange={this.handleHueChange} />
      </Container>
    )
  }
}

export default ArtController
