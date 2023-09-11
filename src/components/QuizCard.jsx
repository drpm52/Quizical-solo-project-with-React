
import { nanoid } from "nanoid";
import he from "he";

export default function QuizCard({ questionsArray }) {
  const { question, incorrect_answers, correct_answer } = questionsArray;
  const allAnswers = [...incorrect_answers, correct_answer];
  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

  function handleClickAnswer(e) {
    e.target.classList.toggle("blue") && e.target.classList.toggle("selected");
  }
  // console.log(updatedSelectedAnswers);

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

{
  /* <button
                className="answer-btn row center"
                onClick={(e) => handleAnswer(e, correct_answer)}
                id={answer}
              >
                {he.decode(answer)}
                </button> */
}
