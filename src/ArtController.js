import React from 'react'
import styled from 'styled-components'

const DirectionButton = styled.button`
  color: red;
`

class ArtController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {logoTop: 0, logoBottom: 0, logoRight: 0, logoLeft: 0}
  }
  render() {
    return (
      <DirectionButton onClick={this.setState(prevState => ({ logoTop: prevState.logoTop + 10 }) )}>up</DirectionButton>
    )
  }
}
