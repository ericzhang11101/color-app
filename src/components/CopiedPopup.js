import React from 'react'
import styled from 'styled-components'

const Popup = styled.div`
    border: 4px double black;
    padding: 0.1rem 2rem;
    font-family: 'Bungee';
    font-size: 1.5rem;
    position: fixed;
    bottom: 0.25rem; 
    left: 0.25rem;
    background: #ccff15;
`


export default function CopiedPopup() {
    return (
        <Popup>
            Copied!
        </Popup>
    )
}
