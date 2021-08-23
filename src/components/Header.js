import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className='main-header'>
            <Link className='main-header-text' to="/home">Color Palate</Link> 
        </div>
    )
}
