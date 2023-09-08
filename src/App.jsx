import { useState, useEffect } from "react";

import "./App.css";
import StartPage from "./components/StartPage";
import QuizCard from "./components/QuizCard";

function App() {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [correctAnswersNum, setCorrectAnswersNum] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    startQuiz &&
      fetch("https://opentdb.com/api.php?amount=5")
        .then((resp) => resp.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            setQuestionsArray(data.results);
          }
          console.log(questionsArray);
        });
  }, [startQuiz]);

  createQuizcard(questionsArray);

  function handleAnswer(e) {
    e.target.getAttribute("data-correct_answer") === e.target.value
      ? setCorrectAnswersNum((prevNum) => +prevNum + 1)
      : "";

    console.log(
      "name:",
      e.target.name,
      "answer:",
      e.target.id,
      "correctAnswe:",
      e.target.getAttribute("data-correct_answer"),
      "correctAnswersNum:",correctAnswersNum
    );

    //  setSelected(e.target.id === id)
    //   const label = e.target.closest('label')
    //  console.log(label);
    //  selected && label.classList.toggle('blue')

    // if (e.target.id === correctAnswer){
    //   console.log('correct!')
    //   setCorrectAnswersNum(prevNum => +prevNum  +1)
    //  console.log(e.target);
    //   console.log(correctAnswersNum);
    // e.target.className = `answer-label ${'green'}`
    // }
    // else {
    //   console.log('Incorrect!');
    //   e.target.className = `answer-label ${'red'}`
    // }
  }

  //  useState(()=>{

  //   const selectedButton = document.getElementById(`"${selectedAnswer}"`)
  //   console.log(selectedButton);
  //   selectedButton.classList.add('blue')

  //  },[selectedAnswer])

  function createQuizcard(arr) {
    return arr.map((el, index) => (
      <QuizCard
        question={el.question}
        questionsArray={el}
        handleAnswer={(e) => {
          handleAnswer(e);
        }}
        data-correct_answer={el.correct_answer}
        correct_answer={el.correct_answer}
        incorrect_answers={el.incorrect_answers[Math.round(Math.random() * 3)]}
        key={index}
      />
    ));
  }
  return (
    <>
      {!startQuiz && (
        <StartPage
          setStartQuiz={() => {
            setStartQuiz(true);
          }}
        />
      )}

      {questionsArray.length > 0 && startQuiz && (
        <div className="quiz-cards row col">
          {createQuizcard(questionsArray)}

          <button className="check-answer-btn">Check Answers</button>
        </div>
      )}
    </>
  );
}

export default App;

// import { useState, useEffect } from 'react';

// function App() {
//   // ...
//   const [selectedAnswer, setSelectedAnswer] = useState(null);

//   function handleAnswer(e, correctAnswer) {
//     const selected = e.target.id;
//     setSelectedAnswer(selected);

//     if (selected === correctAnswer) {
//       // Handle correct answer logic
//     } else {
//       // Handle incorrect answer logic
//     }
//   }

//   // ...
// }
