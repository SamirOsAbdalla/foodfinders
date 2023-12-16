import React from 'react'
import "./HomePage.css"
import BigButton from '../BigButton/BigButton'
import Instructions from '../Instructions/Instructions'
export default function HomePage() {
    return (
        <div className="home-page__wrapper">
            <BigButton buttonSize='main' />
            <div className="break"></div>
            <Instructions />
        </div>
    )
}
