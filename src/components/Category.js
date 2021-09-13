import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
// import { faEdit } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { FaEdit, FaCopy, FaTrash } from "react-icons/fa"; 
import {validColor, getHsla} from '../colorTest.js'

const AddColorDisplay = styled.div`
    width: calc(100% - 1rem);
    height: 5rem;
    box-sizing: border-box;
    margin: 0.5rem;
    border: 3px solid black;
    color: black;
    padding: 0.5rem;
    font-family: 'Bungee Inline', cursive;
    font-weight: 900;


    & > form {
        height: 3.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between; 
        align-items: center;

    }
    
    overflow: hidden;
`

const InputRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0;
    height: 1.75rem;
    box-sizing: border-box;
    

    &  > input{
        border: 2px outset black;
        height: 1.25rem;
        width: 60%;
        
        padding: 0;
        padding-left: 0.25rem;
    }
    &  > label{
        font-size: 1.25rem;
        user-select: none;
    }

`

const InputCol = styled.div`
    display: flex;
    margin-top: 0.5rem;
    flex-direction: column;
    width: 60%;
    padding: 0;
    justify-content: center;
`

const ButtonRow = styled.div`
    display: flex; 
    flex-direction: row;

    & > button {
        background: none;
        border: 2px solid black;
        font-family: 'Bungee Inline', cursive;
        font-size: 1rem;
        font-weight: 1000;
        padding: 0 0.5rem;
        margin: 0 0.25rem;
        user-select: none;
        &:hover{
            cursor: pointer;

        }
    }


`

const CategoryDiv = styled.div`
    border: 4px double black;
    width: 90%;
    margin-left: 5%;
    min-height: 10rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
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

const AddColorBtn = styled.div`
    border: 2px solid black;
    width: 8rem;
    text-align: center;
    font-weight: 900;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
    
    &:hover{
        cursor: pointer;
        background: rgb(251,234,234)
    }
    &:active{
        background: rgb(245,204,204)
    }
`

const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 1rem;
    user-select: none;
`

const ColoredDiv = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem;
    height: 3.75rem;
    border: 1 px solid black;
    margin-top: 0.5rem;
    transform: skew(-50deg);
    border: 1px solid black;

    background: ${props => props.color || 'magenta'}
`



export default function Category(props) {
    const {colors, name, addColor, removeColor, removeCategory } = props
    
    const [ colorState, setColorState ] = useState({})
    const [addingColor,  setAddingColor] = useState(false)
    const [editingColor, setEditingColor] = useState(false)
    
    const [edit, setEdit] = useState({
        value: "",
        truth: false,
        category: ""
    })

    useEffect(() => {
        if (colors) setColorState(colors)
        
    }, [])

    let keys = null

    if (colorState) {
        keys = Object.keys(colorState)
    }

    function showAddColor(){
        setAddingColor(true)
        cancelEditColor()
    }

    function cancelAddColor(){
        setAddingColor(false)
    }


    function editColor(c){
        setAddingColor(false)

        
        setEditingColor({
            value: c,
            truth: true,
            category: name
        })

        console.log(editingColor.truth)

    }

    function cancelEditColor(){
        setEditingColor({
            value: '',
            truth: true,
            category: ''
        })

    }

    async function handleSubmit(e, categoryName){
        
        e.preventDefault()

        console.log('submit')
        const name = e.target.name.value
        let color = e.target.color.value

        if (validColor(color)){
            await addColor(name, color, categoryName)
        }
        else (alert('invalid color'))

        cancelAddColor()
    }

    async function handleEditSubmit(e, categoryName){
        e.preventDefault()

        const name = e.target.name.value
        let color = e.target.color.value

        if (validColor(color)){
            await addColor(name, color, categoryName)
        }
        else (alert('invalid color'))
        color = getHsla(color)

        

        cancelEditColor()
    }

    function deleteCategory(categoryName){
        removeCategory(categoryName)
    }

    function checkInput(color){
        return validColor(color)
    }
    
    console.log('rendering ' + name)
    return (
        <CategoryDiv>
            <CategoryHeader>{name}</CategoryHeader>
            {
                keys && keys.length > 0 ? 
                    
                    keys.map(c =>{
                        console.log(colorState[c])
                        return (
                            <ColorDisplay >
                                <InfoGrid>
                                    <ColorHeader bgColor={'FF00FF'}>
                                        <h2>{c}</h2>
                                    </ColorHeader>
                                </InfoGrid>
                                <ColoredDiv color={colorState[c]}>

                                </ColoredDiv>

                                <BtnGrid>
                                    <Button >
                                        <FaCopy onClick={() => {navigator.clipboard.writeText(colorState[c])}}
                                            style={
                                                {
                                                    size: "10rem"
                                                }
                                            }
                                        />
                                    </Button>
                                    
                                    <Button onClick={() => {editColor(c)}}>
                                        <FaEdit 
                                            style={
                                                {
                                                    size: "10rem"
                                                }
                                            }
                                        />
                                    </Button>
                                    
                                    <Button onClick={() => {removeColor(c,name)}}>
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
            {
                addingColor
                    ? 
                        <AddColorDisplay>
                            <form id='form' onSubmit={(e) => {handleSubmit(e, name)}}>
                                
                                <InputCol>
                                    <InputRow>
                                        <label>
                                            Name:
                                        </label>
                                        <input id='nameInput' name='name' type='text' required>

                                        </input>
                                    </InputRow>

                                    <InputRow>
                                        <label>
                                            Color:
                                        </label>
                                        <input name='color' type='text' required>

                                        </input>
                                    </InputRow>
                                </InputCol>

                                <ButtonRow>
                                    <button onClick={() => {cancelAddColor()}}>
                                        cancel
                                    </button>
                                    <button type='submit'>
                                        Add
                                    </button>
                                </ButtonRow>
                            </form>
                        </AddColorDisplay>
                    :
                    <BtnContainer>
                        <AddColorBtn onClick={() => {deleteCategory(name)}}>
                            Delete
                        </AddColorBtn>
                        <AddColorBtn onClick={() => {showAddColor()}}>
                            + Color
                        </AddColorBtn>
                    </BtnContainer>
            }
            {
                (editingColor.truth &&  name === editingColor.category)
                    ? 
                        
                        <AddColorDisplay>
                            
                            <form id='editForm' onSubmit={(e) => {handleEditSubmit(e, name)}}>
                                
                                <InputCol>
                                    <InputRow>
                                        <label>
                                            Name:
                                        </label>
                                        <input id='nameInput' name='name' type='text' value={editingColor.value} required>

                                        </input>
                                    </InputRow>

                                    <InputRow>
                                        <label>
                                            Color:
                                        </label>
                                        <input name='color' type='text' required>

                                        </input>
                                    </InputRow>
                                </InputCol>

                                <ButtonRow>
                                    <button onClick={() => {cancelEditColor()}}>
                                        cancel
                                    </button>
                                    <button type='submit'>
                                        Add
                                    </button>
                                </ButtonRow>
                            </form>
                        </AddColorDisplay>
                    :
                    
                    null
            }
            
        </CategoryDiv>
    )
}
