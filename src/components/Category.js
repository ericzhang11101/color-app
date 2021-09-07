import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
// import { faEdit } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { FaEdit, FaCopy, FaTrash } from "react-icons/fa"; 

const CategoryDiv = styled.div`
    border: 4px double black;
    width: 90%;
    margin-left: 5%;
    min-height: 10rem;
    box-sizing: border-box;
`

const ColorDisplay = styled.div`
    width: calc(100% - 1rem);
    height: 5rem;
    box-sizing: border-box;
    margin: 0.5rem;
    border: 3px double black;
    color: black;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    overflow: hidden;
`

const ColorHeader = styled.div`

    width: 15rem;

    border-top: calc(5rem - 6px) solid white;
    border-right: 5rem solid ${props => props.bgColor || "white"};
    & > h2{
        font-size: 1.5rem;
        margin-left: 0.5rem;
        margin-top: 0rem;
        font-family: 'Bungee', cursive;
        font-weight: 300;
        word-break: break;
        line-height: 2rem;
        transform: translateY(-4.5rem);
    }

`

const ColoredDivRight = styled.div`
    background-color: ${props => props.bgColor || "white"};
    width: 10rem;
    height: 0;
    border-bottom: calc(5rem - 6px) solid white;
    border-left: 5rem solid ${props => props.bgColor || "white"};
`

const Button = styled.div`
    padding: 0rem 1rem;
    font-size: 1.25rem;
    font-weight: bold;
    border-radius: 0.5rem;
    margin: 0.7rem 0.5rem;
    background: ${props => props.bgColor || "lightpink"};
    border: 2px solid ${props => props.bgColor || 'lightpink'};
    user-select: none;
    &:hover{
        border: 2px solid black;
        cursor: pointer;
    }
`

const BtnGrid = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    justify-content: flex-end;
`

const InfoGrid = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`

const CategoryHeader = styled.h1`
    margin-left: 1rem;
    margin-top: -0.5rem;
`

export default function Category(props) {
    const {colors, name} = props
    
    const [ colorState, setColorState ] = useState({})

    useEffect(() => {
        if (colors) setColorState(colors)
    }, [])

    let keys = null

    if (colorState) {
        keys = Object.keys(colorState)
        console.log('keys')
        console.log(keys)
        console.log(colorState.background)
    }

    return (
        <CategoryDiv>
            <CategoryHeader>{name}</CategoryHeader>
            {
                keys && keys.length > 0 ? 
                    keys.map(c =>{

                        return (
                            <ColorDisplay >
                                <InfoGrid>
                                    <ColorHeader bgColor={c}>
                                        <h2>{c}</h2>
                                    </ColorHeader>
                                    <ColoredDivRight bgColor={'#FF00FF'}>
                                    </ColoredDivRight>
                                </InfoGrid>
                                <BtnGrid>
                                    <Button onClick={'a'}>
                                        <FaCopy 
                                            style={
                                                {
                                                    size: "10rem"
                                                }
                                            }
                                        />
                                    </Button>
                                    
                                    <Button>
                                        <FaEdit 
                                            style={
                                                {
                                                    size: "10rem"
                                                }
                                            }
                                        />
                                    </Button>
                                    
                                    <Button>
                                        <FaTrash 
                                            style={
                                                {
                                                    size: "10rem"
                                                }
                                            }
                                        />
                                    </Button>
                                </BtnGrid>
                            </ColorDisplay>
                        )

                    })
                    :
                    null
            }
        </CategoryDiv>
    )
}
