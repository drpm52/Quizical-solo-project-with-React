export default function StartPage({ setStartQuiz}){
    
    return (
        <div className="start-page row col center">
            <h2>Quizzical</h2>
            <p>Test Your Knowledge</p>
            <button onClick={ setStartQuiz}>Start quiz</button>
        </div>
    )
}