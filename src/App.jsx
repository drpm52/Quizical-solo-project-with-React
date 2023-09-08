import { useState, useEffect } from 'react'

import './App.css'
import StartPage from './components/StartPage'
import QuizCard from './components/QuizCard'



function App() {
  const [questionsArray,setQuestionsArray] = useState([])
  const [correctAnswersNum, setCorrectAnswersNum] = useState(0)
  const [startQuiz, setStartQuiz] = useState(false)
  
  

 
    useEffect(()=>{ startQuiz &&
      fetch("https://opentdb.com/api.php?amount=5").then(resp=> resp.json()).then(data=>{
       
        if (data.results && data.results.length>0) { setQuestionsArray(data.results)}
       console.log(questionsArray);
      }
       )} ,[startQuiz])

   createQuizcard(questionsArray)
   function handleAnswer(e, correctAnswer){
    if (e.target.id === correctAnswer){
      console.log('correct!')
      setCorrectAnswersNum(prevNum => +prevNum  +1)
     console.log(e.target);
      console.log(correctAnswersNum);
      e.target.className = `answer-btn ${'green'}`
    }
    else {
      console.log('Incorrect!');
      e.target.className = `answer-btn ${'red'}`
    }
  }


function createQuizcard(arr){

  return arr.map ((el, index) => (<QuizCard
    question={el.question }
    questionsArray={el}
    handleAnswer={(e)=>{handleAnswer(e,el.correct_answer)}}
    
   
    correct_answer={el.correct_answer}
    incorrect_answers = {el.incorrect_answers[ Math.round(Math.random() * 3)]}
    key = {index}

  />))
}
  return (
  <>
      {!startQuiz  &&
       <StartPage 
        setStartQuiz={()=>{setStartQuiz(true)}}
        
      />}

       {questionsArray.length > 0 && startQuiz &&
        <div className= "quiz-cards">
        {createQuizcard(questionsArray)}
         
        <button className= "check-answe-btn">Check Answers</button>
       
        </div>
        
         }
        </>
        )
 
  

  
}

export default App

// results
// : 
// Array(5)
// 4: 
// category: "Entertainment: Video Games"
// correct_answer: "Donkey Kong (Gameboy)"
// difficulty:"medium"
// incorrect_answers: (3) ['Super Mario 64', 'Super Mario 3D Land', 'Super Mario Galaxy']
// question: "In the Mario series, which game introduced Mario&#039;s Backflip ability?"
// type: "multiple"


// he.decode(questionsArray[0].question )