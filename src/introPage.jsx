import React from "react"
import "./introPage.css"

export default function IntroPage({startQuiz}) {
    return (
        <div className="intro-page">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={startQuiz}>Start quiz</button>
        </div>
    )
}