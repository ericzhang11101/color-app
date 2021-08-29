import React from 'react'
import { useState, useContext, useEffect } from 'react'
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
    // console.log(props)
    const {projects} = props
    
    let {user, setUser} = useContext(UserContext)
    let [projectArr, setProjectArr] = useState([])

    useEffect(() => {
        let db = firebase.firestore()

        const getProjects = async function(){
            let userRef = db.collection('Users').doc('e.r.i.c.r.e.n.z.h.a.n.g.3.2.1@gmail.com')
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
    
                    projectInfo.docs.forEach(async (doc) => {
                        if (doc.id === '***info'){
                            tempProj.description = await doc.data().Description
                            tempProj.id = await doc.data().Id
                        }
                        else {
                            tempProj.categories = [...tempProj.categories, await doc.data()]
                        }
                    })
    
                    projArr.push(tempProj)
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
        
    }, [])

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/projects/:id' 
                    render={(props) => {
                        const id = props.match.params.id
                        return (<ProjectDisplay id={id} project={projectArr} />)
                    }}
                />
                {/* project id -> look through redux and render correct one */}
                <Route path='/projects' exact>
                    <div>
                        <h1 className="page-header">Projects</h1>
                        <div className='projects-display'>
                            {/* {
                                projects.map(proj => {
                                    return (<Project project={proj} />)
                                })
                            } */}
                            {
                                projectArr.map(proj => {
                                    // console.log('from jsx')
                                    // console.log(proj)
                                    return (<Project project={proj} />)
                                })
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
