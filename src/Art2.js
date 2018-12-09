import React from 'react'
import styled from 'styled-components'
import randomColor from 'randomcolor'

const Stripe = styled.div`
  height: 100%;
  width: ${props => props.width}px;
  background-color: ${props => props.color};
  display: flex;
`

const StripeContainer = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
`

const Container = styled.div`
  position: relative;
  height: 500px;
  width: 500px;
`

const generateColors = (number) => {
  return randomColor({
    count: number,
    luminosity: 'random',
    hue: 'purple'
});
}

const LogoContainer = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  font-size: 100px;
  color: white;
  font-family: "Times New Roman", Times, serif;
`

const TrackNameContainer = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  font-size: 30px;
  color: white;
  font-family: "Times New Roman", Times, serif;
`

const Art = ({ logoTop, logoLeft, trackNameTop, trackNameLeft, trackName }) => (
  <Container>
    <StripeContainer>
      {generateColors(15).map(color => (
        <Stripe color={color} width={Math.random() * 100} />
      ))}
      <LogoContainer top={logoTop} left={logoLeft}>
        VEDADO
      </LogoContainer>
      <TrackNameContainer top={trackNameTop} left={trackNameLeft}>
        {trackName}
      </TrackNameContainer>
    </StripeContainer>
  </Container>
)

export default Art
