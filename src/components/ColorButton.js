import React from 'react'
import styled from 'styled-components'
import './Petal.css'

const PetalBtn = styled.div`
    margin: 15rem;
    height: 4rem;
    width: 4rem;
    border: 2px solid black;
    box-sizing: border-box;
    z-index: 3;
    user-select: none;
    &:hover{
        cursor: pointer;
    }
    &:active{
        border: none;
        background: none;
    }
    &:active > div > div{
        display: block;
    }
    &:active > div{
        visibility: visible;
    }
`

const Petal = styled.div`
    margin: calc(0.2rem - 1px) 0.2rem 0.2rem calc(0.2rem - 1px);
    width: 7.6rem;
    height: 7.6rem;
    border: 2px solid green;
    box-sizing: border-box;
    z-index: -1;
    display: none;
    &:hover {
        background: lightgreen;
    }
`

const Petal1 = styled(Petal)`
    border-radius: 7.6rem 0 0 0;
`

const Petal2 = styled(Petal)`
    border-radius: 0 7.6rem  0 0 ;
`

const Petal3 = styled(Petal)`
    border-radius: 0 0 0 7.6rem;
`

const Petal4 = styled(Petal)`
    border-radius: 0 0 7.6rem  0;
`

const PetalContainer = styled.div`
    width: 16rem;
    height: 16rem;
    box-sizing: border-box;

    margin-left: calc(-2px - 6rem);
    margin-top: calc(-2px - 6rem);

    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    z-index: -1;

    visibility: hidden;
    transform: rotate(45deg);
`
// Script

document.addEventListener("DOMContentLoaded", function(e){
    const btn = document.getElementById('btnMain')

    let time = Date.now()

    let arr = [0, 0, 0, 0]

    if (btn) {
        btn.addEventListener('click', function(){
            btn.addEventListener('mouseup', (e) => handleClick(e))
        })
    }

    function handleClick(e){
        btn.removeEventListener('mouseup', handleClick)

        if (Date.now() - time > 50){
            time = Date.now()
                switch (e.target.id){
                    case 'petal1':
                        arr[0]++
                        console.log('petal 1')
                        break;
                    case 'petal2':
                        arr[1]++

                        console.log('petal 2')
                        break;
                    case 'petal3':
                        arr[2]++

                        console.log('petal 3')
                        break;
                    case 'petal4':
                        arr[3]++

                        console.log('petal 4')
                        break;
                        default: 
                        console.log('default')
                }
                console.log(arr)
        }
    }



})

export default function ColorButton(props) {
    return (
        <div class="btn-main" id="btnMain">
            <div class="petal-container" id='petalContainer'>
                <div class="petal" id='petal1'></div>
                <div class="petal petal-2" id='petal2'></div>
                <div class="petal petal-3" id='petal3'></div>
                <div class="petal petal-4" id='petal4'></div>
            </div>
        </div>
    )
}
