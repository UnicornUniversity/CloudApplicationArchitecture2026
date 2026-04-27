export default function Exercise({gameData, nextRoundHandler}) {

    function buttonClick(e) {
        const answer = parseInt(e.target.innerText);
        const correctAnswer = gameData.currentExercise.result;

        if (answer !== correctAnswer) {
            gameData.currentFailures++;
        }

        nextRoundHandler();
    }

    return (
        <>
            <div className="col-sm-6">
                {gameData.getExercisePrompt()}
            </div>
            {gameData.getExerciseAnswers().map((a) =>
                <div className="col-sm-2">
                    <button type="button" className="btn btn-primary btn-sm"
                            style={{fontSize: "10px", padding: "2px 6px"}}
                            onClick={buttonClick}>{a}</button>
                </div>)}
        </>
    );
}