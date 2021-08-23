import React from 'react'
import styled from 'styled-components'

const CategoryDiv = styled.div`
    border: 8px double black;
    width: 90%;
    margin-left: 5%;
    min-height: 20rem;
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
    justify-content: space-between;


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
const ColoredDiv = styled.div`
    background-color: ${props => props.bgColor || "white"};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    & > div {
        background-color: ${props => props.bgColor || "white"};
        height: 0;
        width: 5rem;
        border-left: calc(5rem - 6px) solid  ${props => props.bgColor || "white"};
        border-bottom: calc(5rem - 6px) solid  ${props => props.bgColor || "white"};
        transition: 0.4s;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        &:hover{
            background-color: white;
            border-bottom: calc(5rem - 6px) solid white;
        }

    }

    & > div > h2{
        line-height: 2rem;
        color: red;
        display: none !important;
        // transform: translateY(-6rem);
    }
    & > div:hover > h2{
        display: block !important;

    }

`


export default function Category(props) {
    const {colors} = props
    return (
        <CategoryDiv>
            {
                colors.map(c =>{
                    
                    return (
                        <ColorDisplay >
                            <ColorHeader bgColor={c.color}>
                                <h2>{c.name}</h2>
                            </ColorHeader>
                            <ColoredDiv bgColor={c.color}>
                                <div>
                                    <h2>
                                        X
                                    </h2>
                                    <h2>
                                        Edit
                                    </h2>

                                </div>
                            </ColoredDiv>
                        </ColorDisplay>
                    )

                })
            }
        </CategoryDiv>
    )
}
