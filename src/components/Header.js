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
`

const NameDisplay = styled.p`
    position: fixed;
    right: 7rem;
    text-align: right;
    top: 1rem;
    font-size: 1.5rem;
    font-family: 'Bungee', cursive;

`

export default function Header() {
    const  {user, setUser} = useContext(UserContext)

    const history = useHistory()

    if (user){
        // console.log(user.photoURL)
    }

    return (
        <div className='main-header'>
            <Link className='main-header-text' to="/home">Color Palate</Link> 
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
        </div>
    )
}
