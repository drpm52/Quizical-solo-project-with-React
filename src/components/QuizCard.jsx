import { nanoid } from "nanoid";
import he from "he";

export default function QuizCard({ questionsArray }) {
  const { question, incorrect_answers, correct_answer } = questionsArray;
  const allAnswers = [...incorrect_answers, correct_answer];
  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

  function handleClickAnswer(e) {
    const selectedAnswerBtns = document.querySelectorAll(".selected");
    for (const answer of selectedAnswerBtns) {
      if (answer.name === e.target.name) {
        answer.classList.remove("selected");
        answer.classList.remove("blue");
      }
    }
  

    e.target.classList.add("blue");
    e.target.classList.add("selected");
  }


  return (
    <div className="quiz-card">
      <h2 className="question">{he.decode(question)}</h2>

      <div className="answer-btns-div row">
        {shuffledAnswers.map((answer) => {
          return (
            <div key={nanoid()}>
              <button
                className={
                  answer === correct_answer
                    ? "answer-btn correct"
                    : "answer-btn"
                }
                name={question}
                value={answer}
                data-correct_answer={correct_answer}
                data-id={answer}
                id={nanoid()}
                onClick={(e) => {
                  handleClickAnswer(e);
                }}
              >
                {he.decode(answer)}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
