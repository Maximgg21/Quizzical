import React from "react"
import he from "he"
import Answer from "./Answer"
import "./Quiz.css"

export default function Quiz() {
    
    const [quizData, setQuizData] = React.useState()
    const [quizElements, setQuizElements] = React.useState()
    const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0) 
    const [quizFinished, setQuizFinished] = React.useState(false)

    console.log(quizData)

    React.useEffect(() => {
        async function getData() {
            try {
                const response = await fetch("https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple")
                const results = await response.json()
                setQuizData(results.results)
            } catch (error) {
                // #FIXME: doesn't work
                if (error.response && error.response.status === 427) {
                    setTimeout(() => getData(), 2000)
                } else {
                    console.error(error)
                }
            } 
        }
        !quizFinished && getData()
    }, [quizFinished])


    React.useEffect(() => {
        setQuizElements(quizData ? quizData.map((question, i) => {
            let answersArray = question.incorrect_answers
            const randInt = Math.floor(Math.random() * (answersArray.length))
            answersArray = [...answersArray.slice(0, randInt), question.correct_answer, ...answersArray.slice(randInt)]
            answersArray = answersArray.map(answer => he.decode(answer))
    
            let answerElements = []
            for (let j = 0; j < answersArray.length; j++) {
                answerElements.push(
                    <Answer 
                        key={`answer ${i+1}.${j+1}`}
                        value={answersArray[j]}
                        name={`question-${i}`}
                    />
                )
            }
            
            return (
                <>
                    <section className="question">
                        <h2>{he.decode(question.question)}</h2>
                        {answerElements}
                    </section>
                    <hr />
                </>
            )
        }) : false)
    }, [quizData])

    function submitQuiz(e) {
        e.preventDefault()
        setQuizFinished(true)
        const labelAnswers = document.querySelectorAll("label:has(input[type='radio']:checked)")
        const allInputs = document.querySelectorAll("input[type='radio']")

        labelAnswers.forEach(label => label.classList.add("wrong-answer"))

        quizData.forEach((quiz, i) => {
            for (let j = i*4; j < (i+1)*4; j++) {
                if (he.decode(quiz.correct_answer) === allInputs[j].value) {
                    allInputs[j].parentElement.classList.remove("wrong-answer")
                    allInputs[j].parentElement.classList.add("correct-answer")
                    break
                }
            }
        })

        labelAnswers.forEach(label => {
            if (label.classList.contains("correct-answer")) {
                setNumCorrectAnswers(oldNum => oldNum + 1)
            }
        })
    }

    function playAgain(e) {
        e.preventDefault()
        const allInputs = document.querySelectorAll("input[type='radio']")
        document.getElementById("quiz").reset()

        allInputs.forEach(input => {
            input.parentElement.classList.remove("wrong-answer", "correct-answer")
        })
        setQuizFinished(false)
        setNumCorrectAnswers(0)
    }

    return (
        <form className="quiz" id="quiz">
            <div className="quiz-questions">
                {quizElements}
            </div>
            <div className="results">
                {quizFinished ? <p>You scored correct {numCorrectAnswers}/{quizData.length} answers</p> : <p></p>}
                <button onClick={quizFinished ? playAgain : submitQuiz}>{quizFinished ? "Play again" : "Check answers"}</button>
            </div>
        </form>
        
    )
}