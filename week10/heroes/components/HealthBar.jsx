export default function HealthBar({gameData}) {

    const marksNumber = gameData.failNumber - gameData.currentFailures;
    const arrayStub = new Array(marksNumber).fill("");

    return (
        <small>
            {
                arrayStub.map((item) => <i className="bi bi-heart"></i>)
            }
        </small>
    );
}