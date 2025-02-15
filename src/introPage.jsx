import React from "react"
import "./introPage.css"

export default function IntroPage({startQuiz}) {
    function getFormValues() {
        const formData = new FormData(document.getElementById("settings-form"))
        let dataArray = {}
        for (const [name, value] of formData) {
            dataArray[name] = value
        }
        const {amount, category, difficulty} = dataArray
        startQuiz(amount, category, difficulty)
    }

    return (
        <div className="intro-page">
            <h1>Quizzical</h1>
            <p>Choose your settings</p>
            <form className="settings-choice" id="settings-form">
                <input type="number" defaultValue={10} min={1} max={50} name="amount"/>
                <select name="category" id="select-category">
                    <option value="">Any Category</option>
                    <option value="category=9">General Knowledge</option>
                    <option value="category=10">Entertainment: Books</option>
                    <option value="category=11">Entertainment: Film</option>
                    <option value="category=12">Entertainment: Music</option>
                    <option value="category=13">Entertainment: Musicals & Theatres</option>
                    <option value="category=14">Entertainment: Television</option>
                    <option value="category=15">Entertainment: Video Games</option>
                    <option value="category=16">Entertainment: Board Games</option>
                    <option value="category=17">Science & Nature</option>
                    <option value="category=18">Science: Computers</option>
                    <option value="category=19">Science: Mathematics</option>
                    <option value="category=20">Mythology</option>
                    <option value="category=21">Sports</option>
                    <option value="category=22">Geography</option>
                    <option value="category=23">History</option>
                    <option value="category=24">Politics</option>
                    <option value="category=25">Art</option>
                    <option value="category=26">Celebrities</option>
                    <option value="category=27">Animals</option>
                    <option value="category=28">Vehicles</option>
                    <option value="category=29">Entertainment: Comics</option>
                    <option value="category=30">Science: Gadgets</option>
                    <option value="category=31">Entertainment: Japanese anime & manga</option>
                    <option value="category=32">Entertainment: Cartoon & Animations</option>
                </select>
                <select name="difficulty" id="select-difficulty">
                    <option value="">Any Difficulty</option>
                    <option value="difficulty=easy">Easy</option>
                    <option value="difficulty=medium">Medium</option>
                    <option value="difficulty=hard">Hard</option>
                </select>
            </form>
            <button onClick={getFormValues}>Start quiz</button>
        </div>
    )
}