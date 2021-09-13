import React, {useEffect, useContext} from 'react'
import styled from 'styled-components'
import { Link, RouteComponentProps } from 'react-router-dom'
import ColorPreview from './ColorPreview.js'
import firebase from '../config/firebase-config'
import { UserContext } from './UserContext'

const StyledProject = styled(Link)`
    height: 11rem;
    box-sizing: border-box;
    text-decoration: none;
    color: black;
    border: 4px double black;
    width: 98%;
    margin: 0.5rem auto;
    display: flex;
    flex-direction: row;
    user-select: none;

    &:hover{
        border: 4px solid black;
    }
    &:active{
        border: 8px solid black;
    }

`

const ProjectHeader = styled.h1`
    font-size: 2.5rem;
    margin: -1rem 1rem;
    font-weight: bold;
    font-family: 'Bungee Shade', cursive;
    height: 5rem;
    box-sizing: border-box;
    overflow: hidden;

`

const ProjectDescription = styled.p`
    font-family: 'Bungee Hairline', cursive;
    font-weight: 900;
    height: 5rem;
    margin-top: 1rem;
    margin-left: 0.5rem;
    line-height: 1.25rem;
    margin-bottom: 0.5rem;
    box-sizing: border-box;

`

const XButton = styled.button`
    border: none;
    font-size: 2rem;
    color: red;
    background: none;
    font-family: 'Bungee', cursive;
    margin-top: -2.5rem;
    margin-right: 0.5rem;
    :hover{
        cursor: pointer;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

    }
`


export default function Project(props) {

    const { project } = props
    const {user, setUser} = useContext(UserContext)
    
    async function deleteProject(projectName){
        let db = firebase.firestore()

        db
            .collection('Users')
            .doc(user.email)
    }

    return (
        <div>
            <StyledProject to={`/projects/${project.name}`} name={project.name} categories={project.categories}>
                <div className='project-text-container'>
                    <ProjectHeader>
                        {project.name}
                    </ProjectHeader>
                    <ProjectDescription>
                        {project.description}
                    </ProjectDescription>
                </div>
                <div className="project-other-container">
                    <XButton onClick={() => deleteProject(project.name)}>
                        X
                    </XButton>
                    <ColorPreview>

                    </ColorPreview>
                </div>
            </StyledProject>
        </div>
    )
}
