import React from 'react'
import styled from 'styled-components'

import firebase from '../config/firebase-config'
import { UserContext } from './UserContext'

const Modal = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
`

const Card = styled.div`
    width: 80vw;
    background: white;
    border: 4px double black;
    margin-left: 10vw;
    margin-top: 30vh;
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    box-sizing: border-box;
`
const CardHeader1 = styled.h2`
    font-size: 2rem;
    text-align: center;
    margin: 0;
`
const CardHeader2 = styled.h3`
    font-size: 2rem;
    text-align: left;
    margin: 0;
    font-family: 'Bungee';
    font-weight: 200;
    line-height: 2rem;
`

const TitleInput = styled.input`
    background: none;
    margin: 1rem 0;
    font-family: 'Bungee';
    font-weight: 200;
`

export default function ColorModal() {
    return (
        <div>
            
        </div>
    )
}