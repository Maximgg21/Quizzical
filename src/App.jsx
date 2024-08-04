import React from "react"
import IntroPage from "./introPage"
import Quiz from "./Quiz"
import "./App.css"

export default function App() {
  const [startQuiz, setStartQuiz] = React.useState(false)

  return (
    <main>
      {startQuiz || <IntroPage startQuiz={() => setStartQuiz(true)}/>}
      {startQuiz && <Quiz />}
    </main>
  )
}