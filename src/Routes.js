import React, { useState } from 'react'
import Header from './components/Header.js'
import ProjectMain from './components/ProjectMain.js'
import Homepage from './components/Homepage.js'
import SignIn from './components/SignIn.js'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import uniqid from 'uniqid'
import ProjectObj from './components/objects/ProjectObj'
import CategoryObj from './components/objects/CategoryObj.js'
import ColorObj from './components/objects/ColorObj.js'

// temp
import ColorButton from './components/ColorButton.js'
import { UserContext } from './components/UserContext.js'

// let projects = (get from storage)

let defaultProj  = []

defaultProj.push(new ProjectObj('project1', uniqid(), ['cat1', 'cat2'], 'project desc 1'))
defaultProj.push(new ProjectObj('project2', uniqid(), ['cat3', 'cat4'], 'project desc 2'))



export default function Routes() {

     // projects > project > category > color
     const [projects, setProjects] = useState(defaultProj)

    const [user, setUser] = useState()

    if (user){
        if (user.a == null) setUser()
    }
     

    return (
        <BrowserRouter>
            <UserContext.Provider value={{user, setUser}}>
                <Header /> 
                <div className='content-main'>
                    <Switch>

                            <Route path={['/home', '/']} exact>
                                <Homepage />
                            </Route>
                            <Route 
                                path="/projects" 
                                render = {() => (
                                    <ProjectMain projects={projects} />
                                )}
                            />

                            <Route path="/button">
                                <ColorButton />
                            </Route>

                            <Route path="/login">
                                <SignIn />
                            </Route>

                            <Route component={Homepage} />
                    </Switch>
                </div>
            </UserContext.Provider>
            

        </BrowserRouter>
    )
}


