import React, {useContext} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


import firebase from '../config/firebase-config'
import { UserContext } from './UserContext'

import logOut from '../service/logOut'

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-evenly;
    padding: 0 10vw;
    @media (min-width: 1000px){
        padding: 0 20vw;
    }
    @media (min-width: 1500px){
        padding: 0 25vw;
    }
    @media (max-width: 825px){
        padding: 0;
        justify-content: center;
    }

`

const Card = styled(Link)`
    text-decoration: none;
    color: black;
    height: 20rem;
    user-select: none;
    width: 20rem;
    border: 4px double black;
    word-break: break-word;
    margin-top: calc(50vh - 10rem - 6rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background: hsl(0, 0, 211);
    &:hover {
        border: 4px solid black;
    }
    & > h2{
        text-align: center;
        font-size: 2.25rem;
        font-family: 'Bungee', cursive;       
        font-weight: 100;
        line-height: 3rem;
    }
    @media (max-width: 600px){
        width: 15rem;
        & > h2{
            font-size: 1.5rem;
            line-height: 2rem;

        }
    }
`

export default function Homepage() {
    const {user, setUser} = useContext(UserContext)

    const handleLogout = function(){
        logOut()
        setUser()
        console.log(user)

    }

    // firebase.firestore().collection('test').add({
    //     message: 'test',
    //     value: 5
    // })

    
    // firebase.firestore().collection('Users').get().then((querySnapshot) =>{
    //     querySnapshot.forEach((doc) =>{
    //         console.log(doc.id)
    //     })
    // })

    let db = firebase.firestore()

    if (user){
        var docRef = db.collection('Users').doc(user.email)
        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                db.collection('Users').doc(user.email).set({
                    exists: true
                })
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
    
    
    


   

    
    
    return (
        <FlexContainer>
            <Card to="/projects">
                
                <h2>Projects</h2>
            </Card>
            {
                !user  &&
                    <Card to="/login">
                        <h2>Login</h2>
                    </Card>
            }
            {
                user &&
                <Card onClick={() => handleLogout()}>
                    <h2>Logged In As {user.displayName}</h2>
                    <h2>Logout</h2>
                </Card>
            }
        </FlexContainer>
    )
}
