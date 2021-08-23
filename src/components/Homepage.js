import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-evenly;
    padding: 0 10vw;
    @media (min-width: 1000px){
        padding: 0 20vw;
    }
    @media (min-width: 1500px){
        padding: 0 25vw;
    }
    @media (max-width: 825px){
        padding: 0;
        justify-content: center;
    }

`

const Card = styled(Link)`
    text-decoration: none;
    color: black;
    height: 20rem;
    user-select: none;
    width: 20rem;
    border: 4px double black;
    word-break: break-word;
    margin-top: calc(50vh - 10rem - 6rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background: hsl(0, 0, 211);
    &:hover {
        border: 4px solid black;
    }
    & > h2{
        text-align: center;
        font-size: 2.25rem;
        font-family: 'Bungee Inline', cursive;       
        font-weight: 100;
        line-height: 3rem;
    }
    @media (max-width: 600px){
        width: 15rem;
        & > h2{
            font-size: 1.5rem;
            line-height: 2rem;

        }
    }
`

export default function Homepage() {
    return (
        <FlexContainer>
            <Card to="/projects">
                
                <h2>Projects</h2>
            </Card>
            <Card>
                <h2>Login/ Register</h2>
                
            </Card>
        </FlexContainer>
    )
}
