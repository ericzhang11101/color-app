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

    const [modalVisibility, setModalVisibility] = useState(true)

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
        setCategories(props.project().categories)
        setModalVisibility(false)
    }, [])


    console.log(props)

    // const getProject = async function(){
    //     let p = await props.project()
    //     // console.log(p.categories[0])
    // }

    // getProject()
    
    const colors = [
        {
            name: 'header main',
            color: '#FF00FF', 
            id: "ree"
        },
        // {
        //     name: 'header secondary',
        //     color: '#32CD32', 
        //     id: "ree2"
        // },
        // {
        //     name: 'text',
        //     color: '#008080', 
        //     id: "ree3"
        // }

    ]

    async function addCategory(name){
        console.log(name)
        
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

 
    }


    function showModal(){
        setModalVisibility(true)
    }

    function hideModal(){
        setModalVisibility(false)
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
                                closeModal={hideModal}
                                project={props.id}
                                createCategory={(name) => {addCategory(name)}}
                            /> 
                            : 
                            null
                        }
        </div>
    )
}
