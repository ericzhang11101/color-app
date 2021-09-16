import React, {useContext} from 'react'
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

const DescInput = styled.input`
    background: none;
    margin: 1rem 0;
    font-family: 'Bungee';
    font-weight: 200;
    font-size: 1rem;
    border: 2px inset gray;
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

export default function ProjectModal(props) {
    const { closeModal } = props
    const {user, setUser} = useContext(UserContext)

    window.onclick = function(e){
        if (e.target.id === 'modal'){
            closeModal()
        }
    }

    async function addProject(e){
        e.preventDefault()
        let title = e.target.title.value
        let description = " "        
        if (e.target.description){
            description = e.target.description.value
        }

        let projects = await getProjectList()
        if (projects == null) projects = []
        console.log('projects')
        console.log(projects)
        if (projects && indexOfSimilar(projects, title) === -1){
            Promise.all([addProjectToList(title), storeProject(title, description)]).then(() => {
                closeModal()
            })
        }
        return false;
    }

    function indexOfSimilar(array, target){

        target = target.trim().toLowerCase()

        for (let i = 0; i < array.length; i++){
            let title = array[i].trim().toLowerCase()
            if (target === title) {
                alert('Project Alerady Exists!')
                return i
            }
        }
        return -1;
    }

    const getProjectList = async function(){
        let db = firebase.firestore()
        let userRef = db.collection('Users').doc(user.email)

        let userInfo = await (await userRef.get()).data()
        let userProjects = []
        if (userInfo && userInfo.indexes) userProjects = userInfo.indexes
        return userProjects
    }

    const addProjectToList = async function(title){
        let db = firebase.firestore()
        let userRef = db.collection('Users').doc(user.email)

        let userInfo = await (await userRef.get()).data()
        console.log(userInfo)
        if (userInfo && userInfo.indexes) {
            console.log('existing info')
            let updateUserInfo = userRef.update({
                indexes: [...userInfo.indexes, title]
            })
        }
        else{
            console.log('no existing')
            let updateUserInfo = userRef.update({
                indexes: [title]
            })
        }

    }

    const storeProject = async function(title, description){
        let db = firebase.firestore()


        db 
            .collection('Users')
            .doc(user.email)
            .collection(title)
            .doc('***info')
            .set({
                Description: description
            })
    }
    return (
        <Modal id={'modal'}>
            <form onSubmit={(e) => {addProject(e)}}>
                <Card onClick={null} id={'card'}>
                    <CardHeader1 >
                        New Project
                    </CardHeader1>

                    <CardHeader2 >
                        Project Name
                    </CardHeader2>
                    <TitleInput required type='text' name='title' >

                    </TitleInput>

                    <CardHeader2  >
                        Project Description
                    </CardHeader2>

                    <DescInput type='textarea' name='description'>

                    </DescInput>
                    <SubmitBtn>
                        Submit
                    </SubmitBtn>
                </Card>
            </form>
        </Modal>
    )
}
