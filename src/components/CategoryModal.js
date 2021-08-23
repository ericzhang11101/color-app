import React from 'react'
import styled from 'styled-components'

const DarkenModal = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 3;
    top: 0;
`

export default function CategoryModal() {
    return (
        <DarkenModal>
            
        </DarkenModal>
    )
}
