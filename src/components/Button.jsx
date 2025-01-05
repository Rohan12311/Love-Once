import React from 'react'
import styled from 'styled-components'

const Button = (props) => {
  return (
    <BUTTON onClick={props.click}>{props.name}</BUTTON>
  )
}

export default Button

const BUTTON = styled.button`
    min-width: 100px;
`