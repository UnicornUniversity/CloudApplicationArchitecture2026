import Cell from "./Cell";
import Score from "./Score";
import {useEffect, useState} from "react";

export default function GameField() {

    const [score, setScore] = useState(0);
    const [visibility, setVisibility] = useState(getEmptyArray());

    function getEmptyArray(){
        return Array(4).fill(false);
    }

    function setButtonsVisibility(){
        // [0-3]
        const bShow = Math.floor(Math.random() * 3);
        const newArr = Array(4).fill(false);
        newArr[bShow] = true;
        setVisibility(newArr);
    }

    let timer;

    useEffect(()=> {
        timer = window.setInterval(setButtonsVisibility, 1000);
    }, []);

    function updateScore(){
        setScore(score + 1);
    }

    return (
        <table>
            <tbody>
            <tr>
                <Score value={score} />
            </tr>
            <tr>
                <td id="cell_1_1">
                    <Cell isVisible={visibility[0]} updateScore={updateScore}/>
                </td>
                <td id="cell_1_2">
                    <Cell isVisible={visibility[1]} updateScore={updateScore}/>
                </td>
            </tr>
            <tr>
                <td id="cell_2_1">
                    <Cell isVisible={visibility[2]} updateScore={updateScore}/>
                </td>
                <td id="cell_2_2">
                    <Cell isVisible={visibility[3]} updateScore={updateScore}/>
                </td>
            </tr>
            </tbody>
        </table>
    );

}