import React from 'react'
import styled from 'styled-components'

const ColorPreviewDiv = styled.div`
    height: 4rem;
    width: 80%;
    border: 2px solid black;
    margin-right: 1rem;
    transform: skew(-10deg);
    display: flex;
`

const SingleColor = styled.div`
    background: ${props => props.pcolor || 'blue'};
    height: 100%;
    width: 20%;
    box-sizing: border-box;
    border: 4px double black;



`

export default function ColorPreview(props) {
    // const { colors } = props
    const colors = ['#CE2D4F', '#CE6D8B', '#CEBBC9', '#4056F4', '#470FF4']


    return (
        <ColorPreviewDiv>
            {
                colors.map(color => {
                    return (
                        <SingleColor pcolor={color}>
                        </SingleColor>
                    )
                })
            }
        </ColorPreviewDiv>
    )
}
