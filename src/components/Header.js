import React, {useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from './UserContext'

import styled from 'styled-components'


const ProfileImg = styled.img`
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    position: fixed;
    right: 1rem;
    top: 0.5rem;
    box-sizing: border-box;
    cursor: pointer;
    &:active{
        border: 3px solid black;
    }
    @media(max-width: 600px){
        display: none;
    }
`

const NameDisplay = styled.p`
    position: fixed;
    right: 7rem;
    text-align: right;
    top: 1rem;
    font-size: 1.5rem;
    font-family: 'Bungee', cursive;
    overflow: hidden;
    @media(max-width: 800px){
        display: none;
    }

`

const HeaderMain = styled.div`
    height: 6rem;
    width: 100vw;
    background: rgb(245, 204, 204);
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    border: 5px double black;
    user-select: none;
    z-index: 2;
`

const HeaderTitle = styled(Link)`
    font-size: 3rem;
    padding-left: 2rem;
    text-decoration: none;
    margin-top: -0.5rem;
    color: black;
    font-weight: 1000;
    white-space: nowrap;
    overflow: hidden;

`

export default function Header() {
    const  {user, setUser} = useContext(UserContext)

    const history = useHistory()

    return (
        <HeaderMain>
            <HeaderTitle to="/home">
                Color Palate
            </HeaderTitle> 

            {/* {
                (user) ? <h1>{user.displayName}</h1> : <h1>bye</h1>
            } */}

            {
                user && 
                <ProfileImg onClick={() => {
                    history.push('/home')
                }} src={user.photoURL} alt={'profile img'}></ProfileImg>   
            }
            {
                user && 
                <NameDisplay>{user.displayName}</NameDisplay>
            }
        </HeaderMain>
    )
}
