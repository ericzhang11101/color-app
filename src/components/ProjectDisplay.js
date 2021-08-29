import React, {useContext} from 'react'
import styled from 'styled-components'
import { Link, RouteComponentProps } from 'react-router-dom'
import ColorPreview from './ColorPreview.js'
import CategoryModal from './CategoryModal'
import Category from './Category.js'
import {UserContext } from './UserContext'


const ProjectHeader = styled.h1`
    text-align: center;
`

const CategoryHeader = styled.h2`
    margin-left: 3%;
    
`

const NewCategoryButton = styled.button`
    width: 10rem;
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
    
    console.log(props)

    const colors = [
        {
            name: 'header main',
            color: '#FF00FF', 
            id: "ree"
        },
        {
            name: 'header secondary',
            color: '#32CD32', 
            id: "ree2"
        },
        {
            name: 'text',
            color: '#008080', 
            id: "ree3"
        },
        {
            name: 'header main',
            color: '#FF00FF', 
            id: "ree"
        },
        {
            name: 'header secondary',
            color: '#32CD32', 
            id: "ree2"
        },
        {
            name: 'text',
            color: '#008080', 
            id: "ree3"
        }
    ]

    return (
        <div>
            {/* <CategoryModal></CategoryModal> */}
            <ProjectHeader>{props.id}</ProjectHeader>  

            {/* props.map(category => return <category/>) 
                category props: array of colors, category name
            */}

            <CategoryHeader>Category</CategoryHeader>
            <Category colors={colors}>
                
            </Category>  

            <BtnContainer>
                <NewCategoryButton>
                    Add New
                </NewCategoryButton>
            </BtnContainer>

        </div>
    )
}
