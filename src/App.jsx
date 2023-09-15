import { useState, useEffect } from "react";

import "./App.css";
import StartPage from "./components/StartPage";
import QuizCard from "./components/QuizCard";

const correctAnswersArr = [];
let correctsAnswersNum = 0;

function App() {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);

  useEffect(() => {
    startQuiz &&
      fetch("https://opentdb.com/api.php?amount=5")
        .then((resp) => resp.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            setQuestionsArray(data.results);
          }
        });
  }, [startQuiz]);

  function createQuizcard(arr) {
    return arr.map((el, index) => (
      <QuizCard
        selected={""}
        question={el.question}
        questionsArray={el}
        value={el.value}
        correct_answer={el.correct_answer}
        incorrect_answers={el.incorrect_answers}
        key={index}
      />
    ));
  }
  function handleCheckAnswers() {
    const answerArr = Array.from(document.querySelectorAll(".answer-btn"));
    const answerData = answerArr.map((answer) => ({
      className: answer.className,
      key: answer.id,
    }));

    localStorage.setItem("answerData", JSON.stringify(answerData));
    const storedAnswerArr = JSON.parse(localStorage.getItem("answerData"));

    storedAnswerArr.forEach((answerData) => {
      const key = answerData.key;
      const answerBtn = document.getElementById(key);
      const selected = answerData.className.includes("selected");
      const correct = answerData.className.includes("correct");

      if (answerData.className.includes("blue")) {
        answerBtn.classList.remove("blue");
      }
      if (selected) {
        if (correct) {
          answerBtn.classList.add("green");
          correctAnswersArr.push(answerData);
        } else {
          answerBtn.classList.add("red");
        }
      } else if (!selected && correct) {
        answerBtn.classList.add("green");
      }
    });

    document.querySelector(".check-answer-btn").classList.add("hidden");
    document.querySelector(".play-again").classList.remove("hidden");
    correctsAnswersNum = correctAnswersArr.length;

    const paragraph = document.querySelector(".results");
    !paragraph.className.includes("hidden")
      ? (paragraph.textContent = `You scored ${correctsAnswersNum}/5 correct answers`)
      : "";
  }

  function handlePlayAgain() {
    document.querySelector(".play-again").classList.add("hidden");
    localStorage.clear();
    correctsAnswersNum = 0;
    setStartQuiz(false);
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

          <div className="play-again hidden row">
            <p className="results"></p>
            <button className="play-again-btn" onClick={handlePlayAgain}>
              Play again
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
