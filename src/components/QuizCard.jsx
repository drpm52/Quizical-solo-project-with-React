import {nanoid} from "nanoid"
import he from "he"



export default function QuizCard({ questionsArray, handleAnswer }) {
  const { question, incorrect_answers, correct_answer } = questionsArray;
  const allAnswers = [...incorrect_answers, correct_answer];
  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

  return (
    <div className="quiz-card">
      <h2 className="question">{he.decode(question)}</h2>

      <div className="answer-btns-div row">
      {shuffledAnswers.map((answer, index) => {
        return (
            <>
             <label className="answer-label row center" htmlFor={answer} key={nanoid()} >{he.decode(answer)}</label>
            <input
              className="answer-btn"
            //   key={index}
              onClick={(e) => handleAnswer(e, correct_answer)}
              id={answer}
              name={answer}
              value={answer}
              type="radio"
              hidden
            
            >
            
            </input>
            
            </>
          
        );
      })
     }
     </div>
    </div>
  );
}

// export default function QuizCard({ questionsArray, handleAnswer }) {
//     const { question, correct_answer, incorrect_answers } = questionsArray;

//     // Combine correct and incorrect answers into one array
//     const allAnswers = [...incorrect_answers, correct_answer];

//     // Shuffle the answers randomly
//     const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

//     return (
//       <div className="quiz-card">
//         <h2 className="question">{he.decode(question)}</h2>
//         {shuffledAnswers.map((answer, index) => (
//           <button key={index} onClick={handleAnswer}>
//             {he.decode(answer)}
//           </button>
//         ))}
//       </div>
//     );
//   }
