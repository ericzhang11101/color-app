import React from 'react'
import styled from 'styled-components'

import firebase from '../config/firebase-config'
import { UserContext } from './UserContext'

const DarkenModal = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 3;
    top: 0;
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


const SubmitBtn = styled.button`
    border: 3px double black;
    font-family: 'Bungee';
    background: none;
    font-size: 1rem;
    margin-bottom: 1rem;
    &:hover{
        border: 3px solid black;
        cursor: pointer;
    }
    &:active{
        background: lightgray;
    }
`

export default function CategoryModal(props) {
    const { closeModal, project, createCategory } = props
    const projectName = project.id


    window.onclick = function(e){
        if (e.target.id === 'modal'){
            closeModal();
        }
    }

    async function addCategory(e){
        e.preventDefault()
        console.log('adding ' + e.target.title.value + ' to ' + projectName)
        if (e.target.title.value && e.target.title.value !== '') await createCategory(e.target.title.value)
    }

    // Add category


    return (
        <DarkenModal id={'modal'}>
            <form onSubmit={(e) => {addCategory(e)}}>
                <Card id={'card'}>
                    <CardHeader1>
                        New Category
                    </CardHeader1>
                    <CardHeader2>
                        Name: 
                    </CardHeader2>
                    <TitleInput required type='text' name='title'> 

                    </TitleInput>
                    <SubmitBtn>
                        ADD
                    </SubmitBtn>

                </Card>
            </form>
        </DarkenModal>
    )
}
