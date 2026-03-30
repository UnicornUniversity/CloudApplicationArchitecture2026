export default function Cell({isVisible, updateScore}) {
    return (
        <>
            {isVisible && <button type="button" onClick={updateScore}>Press me!</button>}
        </>
    );
}