import React from 'react'
import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Route, Switch, Link, BrowserRouter, RouteComponentProps} from 'react-router-dom' 
import uniqid from 'uniqid'

import Project from './Project.js'
import ProjectDisplay from './ProjectDisplay.js'
import ProjectModal from './ProjectModal'

import firebase from '../config/firebase-config'
import { UserContext } from './UserContext'

const CreateButton = styled.button`
    background: rgb(245, 204, 204);
    padding: 0.25rem 1rem;
    font-size: 1rem;
    width: 10rem;
    font-family: 'Bungee', cursive;
    margin-left: calc(90vw - 8rem);
    margin-top: 1rem;
    margin-bottom: 1rem;
    
`

const PageHeader = styled.h1`
    font-weight: normal;
    text-align: center;
    font-weight: 600;
    font-size: 3rem;
`

const ProjectsDisplay = styled.div`
    width: 90vw;
    box-sizing: border-box;
    min-height: 50px;
    border: 2px solid gray;
    margin: 0 5vw;
`

export default function ProjectMain(props) {
    const {projects} = props
    
    let {user, setUser} = useContext(UserContext)
    let [projectArr, setProjectArr] = useState([])
    let [modalVisibility, setModalVisibility] = useState(true)

    useEffect(() => {
        

        const getProjects = async function(){
            let db = firebase.firestore()
            let userRef = db.collection('Users').doc(user.email)
            let userInfo = await (await userRef.get()).data()
            
            let userProjects = null
            if (userInfo && userInfo.indexes) {
                userProjects = userInfo.indexes
            }

            
            let projArr = []

            let userPromise = new Promise((ressolve, reject) => {
                if (!userProjects) ressolve()
                userProjects.forEach(async (name) => {
                    let tempProj = {
                        name: name,
                        categories: []
                    }
    
                    let projectInfo = await userRef.collection(name).get()
    
                    if (projectInfo.docs.length > 0){
                        await projectInfo.docs.forEach(async (doc) => {
                            if (doc.id === '***info'){
                                tempProj.description = await doc.data().Description
                                tempProj.id = await doc.data().Id
                            }
                            else {
                                let updatedCategories = [
                                    ...tempProj.categories, 
                                    {
                                        id: doc.id,
                                        colors: doc.data(),
                                        key: uniqid()
                                    }
                                ]

                                tempProj.categories = updatedCategories
 
                            }
                        })
                        projArr.push(tempProj)
                    }
                    
    
                    
                    if (userProjects.indexOf(name) === userProjects.length -1) ressolve()
    
                })
            })

            userPromise.then(() => {
                setProjectArr(projArr)
            })
            
            
        }

        if (user || true){
            getProjects()   
        }
        
    }, [modalVisibility])

    useEffect(() => {
        setModalVisibility(false)
    }, [])

    function displayProjectModal(){
        setModalVisibility(true)
    }

    function hideProjectModal(){
        setModalVisibility(false)
    }

    function updateProjects(){
        

        const getProjects = async function(){
            let db = firebase.firestore()
            let userRef = db.collection('Users').doc(user.email)
            let userInfo = await (await userRef.get()).data()
            let userProjects = userInfo.indexes
            
            let projArr = []

            let userPromise = new Promise((ressolve, reject) => {
                userProjects.forEach(async (name) => {
                    let tempProj = {
                        name: name,
                        categories: []
                    }
    
                    let projectInfo = await userRef.collection(name).get()
    
                    if (projectInfo.docs.length > 0){
                        await projectInfo.docs.forEach(async (doc) => {
                            if (doc.id === '***info'){
                                tempProj.description = await doc.data().Description
                                tempProj.id = await doc.data().Id
                            }
                            else {

                                let updatedCategories = [
                                    ...tempProj.categories, 
                                    {
                                        id: doc.id,
                                        colors: doc.data()
                                    }
                                ]

                                tempProj.categories = updatedCategories
 
                            }
                        })
                        projArr.push(tempProj)
                    }
                    
    
                    
                    if (userProjects.indexOf(name) === userProjects.length -1) ressolve()
    
                })
            })

            userPromise.then(() => {
                setProjectArr(projArr)
            })
        }
        if (user || true) getProjects()
    }

    function getProject(id){
        for (let i = 0; i < projectArr.length; i++){
            if (projectArr[i].name === id) {
                return projectArr[i]
        }
            }
        return false
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/projects/:id' 
                    render={(props) => {
                        const id = props.match.params.id
                        return (
                            <ProjectDisplay 
                                id={id} 
                                project={() => {
                                    return getProject(id)
                                }} 
                                updateProjects={() => {updateProjects()}}
                            />)

                    }}
                />
                <Route path='/projects' exact>
                    <div>
                        <PageHeader>
                            Projects
                        </PageHeader>
                        <ProjectsDisplay >
                            {
                                projectArr.map(proj => {
                                    return (<Project project={proj} />)
                                })
                            }
                        </ProjectsDisplay>
                        <CreateButton onClick={() => {displayProjectModal()}}>
                            New Project
                        </CreateButton>
                        {
                            modalVisibility ? 
                            <ProjectModal 
                                closeModal={hideProjectModal}
                            /> 
                            : 
                            null
                        }
                    </div>
                </Route>
            </Switch>
        </BrowserRouter>

    )
}
