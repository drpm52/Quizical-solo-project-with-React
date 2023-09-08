import { nanoid } from "nanoid";
import he from "he";

export default function QuizCard({ questionsArray, handleAnswer }) {
  const { question, incorrect_answers, correct_answer } = questionsArray;
  const allAnswers = [...incorrect_answers, correct_answer];
  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

  return (
    <div className="quiz-card">
      <h2 className="question">{he.decode(question)}</h2>

      <div className="answer-btns-div row">
        {shuffledAnswers.map((answer) => {
          return (
            <div key={nanoid()}>
              <input
                className="answer-btn" 
                value={answer}
                id={answer}
                data-correct_answer={correct_answer}
                type="radio"
                onClick={(e) => handleAnswer(e)}
                name={question}
              hidden
              ></input>
              <label 
              type= "radio" 
              className="answer-btn"
               htmlFor={answer} 
               name={question} 
               value={answer}
               data-correct_answer={correct_answer}
            >
                {he.decode(answer)}
              </label>
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
