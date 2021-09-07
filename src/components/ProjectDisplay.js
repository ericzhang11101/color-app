import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components'
import { Link, RouteComponentProps } from 'react-router-dom'

import ColorPreview from './ColorPreview.js'
import CategoryModal from './CategoryModal'
import Category from './Category.js'

import firebase from '../config/firebase-config'
import { UserContext } from './UserContext'


const ProjectHeader = styled.h1`
    text-align: center;
`

const CategoryHeader = styled.h2`
    margin-left: 3%;
    
`

const NewCategoryButton = styled.button`
    width: 20rem;
    border: 3px solid black;
    background: none;
    padding: 0.25rem 1rem;
    font-family: 'Bungee Inline', cursive;
    font-size: 1.25rem;
    font-weight: 200;
    box-sizing: border-box;
    &:hover { 
        cursor: pointer;
    }
    &:active {
        border: 3px double black;
    }
`
const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 5vw;
    padding-top: 1rem;
`

export default function ProjectDisplay(props) {

    const {user, setUser} = useContext(UserContext)

    const [ categories, setCategories ] = useState(
        [
            {
                name: 'header main',
                color: '#FF00FF', 
                id: "ree"
            }
        ]   
    )

    const [modalVisibility, setModalVisibility] = useState(false)

    /*
        category obj
        name: str,
        fields: [
            {   
                NAME: HEADER TEXT,
                COLOR:  
            },
            ...
        ]
    */
    
        
    useEffect(() => {
        console.log(props.project().categories)
        async function get(){
            let temp = await props.project().categories;
            setCategories(temp)
        }
        get()
    }, [])  

    useEffect(() => {
        async function update(){
            let db = firebase.firestore()
            let userRef = db.collection('Users').doc('e.r.i.c.r.e.n.z.h.a.n.g.3.2.1@gmail.com')
            let projectInfo = await userRef.collection(props.id).get()
            
            let newCategories = []

            if (projectInfo.docs.length > 0){
                await projectInfo.docs.forEach(async (doc) => {
                    if (doc.id !== '***info'){
                        newCategories = [
                            ...newCategories,
                            {
                                id: doc.id,
                                colors: doc.data()
                            }
                        ]
                    }
                })
                setCategories(newCategories)
            }


        }

        

        update()

        console.log('updating')
    }, [modalVisibility])

    
    const colors = [
        {
            name: 'header main',
            color: '#FF00FF', 
            id: "ree"
        }
    ]

    async function addCategory(name){

        console.log('adding: ' + name)
        
        let db = firebase.firestore()
        let userRef = db.collection('Users').doc('e.r.i.c.r.e.n.z.h.a.n.g.3.2.1@gmail.com')
        let user = 'e.r.i.c.r.e.n.z.h.a.n.g.3.2.1@gmail.com'

        await db 
            .collection('Users')
            .doc(user)
            .collection(props.id)
            .doc(name)
            .get()
            .then((snapshot) => {
                console.log(snapshot.exists)
                if (snapshot.exists) {
                    // handle existing thign 
                    // show some popup
                    console.log('already exists!')
                }
                else {
                    console.log('adding new')
                    db
                        .collection('Users')
                        .doc(user)
                        .collection(props.id)
                        .doc(name)
                        .set({
                        })
                }
            })
            .then(() => {setModalVisibility(false)})
    }


    function showModal(){
        setModalVisibility(true)
    }


    function hideModal(){
        setModalVisibility(false)
    }


    function getColors(title){
        let db = firebase.firestore()
        let user = 'e.r.i.c.r.e.n.z.h.a.n.g.3.2.1@gmail.com'

        db 
        .collection('Users')
        .doc(user)
        .collection(title)
        .docs()
    }


    function getCategories(){
        let db = firebase.firestore()
        let user = 'e.r.i.c.r.e.n.z.h.a.n.g.3.2.1@gmail.com'

        let projectId = props.id 


        let data = db 
        .collection('Users')
        .doc(user)
        .collection(projectId)
        .get()

        
    }

    

    return (
        <div>
            {/* <CategoryModal></CategoryModal> */}
            <ProjectHeader>{props.id}</ProjectHeader>  

            {/* props.map(category => return <category/>) 
                category props: array of colors, category name
            */}

            {/* <CategoryHeader>Category</CategoryHeader>

            <Category colors={colors}>
                
            </Category>   */}

            {
                categories ? 
                    categories.map((category) => {

                        return (
                                <Category 
                                    colors={category.colors} 
                                    name = {category.id}
                                    getColors={(title) => {getColors(title)}}
                                />

                        )
                    })
                    
                    :

                    null

            }

            <BtnContainer>
                <NewCategoryButton onClick={() => {showModal()}}>
                    New Category
                </NewCategoryButton>
            </BtnContainer>
            {
                            modalVisibility ? 
                            <CategoryModal 
                                closeModal={() => {hideModal()}}
                                project={props.id}
                                createCategory={(name) => {addCategory(name)}}
                            /> 
                            : 
                            null
                        }
        </div>
    )
}
