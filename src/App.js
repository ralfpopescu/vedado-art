import React, { Component } from 'react'
import Art from './Art'
import ArtController from './ArtController'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: absolute;
`

class App extends Component {
  render() {
    return (
      <Container>
        <ArtController />
      </Container>
    )
  }
}

export default App;
