import React from 'react'
import { useState, useContext } from 'react'
import styled from 'styled-components'
import { Route, Switch, Link, BrowserRouter, RouteComponentProps} from 'react-router-dom' 


import Project from './Project.js'
import ProjectDisplay from './ProjectDisplay.js'


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
    
`


export default function ProjectMain(props) {
    console.log(props)
    const {projects} = props
    
    let {user, setUser} = useContext(UserContext)

     if (user){
        let userProjects = firebase.firestore().collection('Users').doc(user.email)
        console.log(userProjects.id)
     }





    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/projects/:id' component={ProjectDisplay} />
                {/* project id -> look through redux and render correct one */}
                <Route path='/projects' exact>
                    <div>
                        <h1 className="page-header">Projects</h1>
                        <div className='projects-display'>
                            {
                                projects.map(proj => {
                                    return (<Project project={proj} />)
                                })
                            }
                            {

                            }
                        </div>
                        <CreateButton>
                            New Project
                        </CreateButton>
                    </div>
                </Route>
            </Switch>
        </BrowserRouter>

    )
}
