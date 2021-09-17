import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'
import {UserContext } from './UserContext'
import { useHistory } from 'react-router-dom';


import { googleProvider } from '../config/authMethods'
import socialMediaAuth from '../service/auth'
import logOut from '../service/logOut'


const LoginButton = styled.div`
    text-align: center;
    color: black;
    font-weight: 900;
    font-size: 4rem;
    border: 8px double black;
    box-sizing: border-box;
    margin: 2rem;
    cursor: pointer;
    user-select: none;
    margin-top: calc(50vh - 6rem);
    margin-bottom: -20rem;
    
`

export default function SignIn() {

    const history = useHistory()

    const {user, setUser} = useContext(UserContext)
     //google only
    const handleLogin = async function(){
        
        const login = await socialMediaAuth(googleProvider)
        setUser(login, () => {
            history.push('/home')
        })
    }

    useEffect(() =>{
        if (user){
            history.push('/home')
        }
    }, [user])

    const handleLogOut = async function(){
       logOut()
       setUser()
    }

    return (
        <div>
            <LoginButton onClick={() => handleLogin()}>
                Login with Google
            </LoginButton>

        </div>
    )
}
