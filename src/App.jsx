import { useState, useEffect } from "react";

import "./App.css";
import StartPage from "./components/StartPage";
import QuizCard from "./components/QuizCard";

function App() {
  const [questionsArray, setQuestionsArray] = useState([]);
  // const [correctAnswersNum, setCorrectAnswersNum] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  // const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizCards, setQuizCards] = useState([]);

  useEffect(() => {
    startQuiz &&
      fetch("https://opentdb.com/api.php?amount=5")
        .then((resp) => resp.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            setQuestionsArray(data.results);
          }
          console.log("Useeffect rerendersthe app!");
        });
  }, [startQuiz]);

  createQuizcard(questionsArray);

  // const selectedAnswersVsCorrectAnswers = [];

  // function handleAnswer(e) {
  //   const  selectedAdjacentDivs =e.target.closest('.answer-btns-div').children
  //   const siblings = selectedAdjacentDivs.children
  //   console.log(siblings);

  //   const selection = {
  //     question: e.target.name,
  //     selectedAnswer: e.target.value,
  //     correctAnswer: e.target.getAttribute("data-correct_answer"),
  //     id: e.target.id,
  //     correct: e.target.value === e.target.getAttribute("data-correct_answer")? true : false,
  //     selected: true
  //   };
  //   selectedAnswersVsCorrectAnswers.push(selection);
  //   selectedAnswersVsCorrectAnswers.map(
  //     el => {
  //     if (e.target.value === el.selectedAnswer.value){
  //       return {...el, selected: true}
  //     } else{
  //       return {...el, selected:false}
  //     }}
  //     )

  //   console.log(selectedAnswersVsCorrectAnswers);
  // }
  const correctAnswersArr = [];
  function handleCheckAnswers() {
    const answerArr = Array.from(document.querySelectorAll(".answer-btn"));
    console.log(answerArr, typeof answerArr);

    answerArr.forEach((answer) => {
      const selected = answer.classList.contains("selected");
      const correct = answer.classList.contains("correct");
      if (answer.classList.contains("blue")) {
        answer.classList.remove("blue");
      }
      if (selected) {
        if (correct) {
          answer.classList.add("green");
          correctAnswersArr.push(answer);
        } else {
          answer.classList.add("red");
        }
      } else if (!selected && correct) {
        answer.classList.add("green");
      }
    });
    console.log(correctAnswersArr);
    console.log(questionsArray);
  }

  function createQuizcard(arr) {
    return arr.map((el, index) => (
      <QuizCard
        selected={""}
        question={el.question}
        questionsArray={el}
        value={el.value}
        // data-correct={el.value === el.correct_answer ? true : false}
        // data-correct_answer={el.correct_answer}
        correct_answer={el.correct_answer}
        incorrect_answers={el.incorrect_answers}
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

          <button
            className="check-answer-btn"
            onClick={(e) => {
              handleCheckAnswers();
            }}
          >
            Check Answers
          </button>
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
