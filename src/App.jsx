import React from "react"
import IntroPage from "./introPage"
import Quiz from "./Quiz"
import "./App.css"

export default function App() {
  const [isStartQuiz, setIsStartQuiz] = React.useState(false)
  const [settings, setSettings] = React.useState([]) 

  function startQuiz(amount, category, difficulty) {
    setIsStartQuiz(true)
    setSettings({amount, category, difficulty})
  }

  return (
    <>
      <main>
        {isStartQuiz || <IntroPage startQuiz={startQuiz}/>}
        {isStartQuiz && <Quiz {...settings}/>}
      </main>
      <img src="./src/assets/blue-blob.svg" className="blue-blob"/>
      <img src="./src/assets/yellow-blob.svg" className="yellow-blob"/>
    </>
  )
}