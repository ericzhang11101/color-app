import React from 'react'
import styled from 'styled-components'

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
    padding: 0rem 2rem;
    font-size: 1.25rem;
    font-weight: bold;
    border-radius: 0.5rem;
    margin: 0.7rem 1rem;
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
    console.log(colors)
    console.log(name)
    let keys = colors.keys
    return (
        <CategoryDiv>
            <CategoryHeader>{name}</CategoryHeader>
            {
                // colors ? 
                //     colors.map(c =>{
                //         console.log(c)
                //         return (
                //             <ColorDisplay >
                //                 <InfoGrid>
                //                     <ColorHeader bgColor={c.color}>
                //                         <h2>{c.name}</h2>
                //                     </ColorHeader>
                //                     <ColoredDivRight bgColor={c.color}>
                //                     </ColoredDivRight>
                //                 </InfoGrid>
                //                 <BtnGrid>
                //                     <Button onClick={'a'}>
                //                         copy
                //                     </Button>
                                    
                //                     <Button>
                //                         edit
                //                     </Button>

                //                     <Button>
                //                         delete
                //                     </Button>
                //                 </BtnGrid>
                //             </ColorDisplay>
                //         )

                //     })
                //     :
                //     null
            }
        </CategoryDiv>
    )
}
