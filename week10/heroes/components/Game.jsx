import Character from "./Character.jsx";
import Exercise from "./Exercise.jsx";
import {useEffect, useRef, useState} from "react";
import {GameData} from "../bl/gameData.js";
import {ExerciseGenerator} from "../bl/exerciseGenerator.js";
import HealthBar from "./HealthBar.jsx";

export default function Game() {

    const [roundInfo, setRoundInfo] = useState("");
    const [monsterUrl, setMonsterUrl] = useState("");

    // read game settings
    // process.env.REACT_APP_MAX_ROUND, process.env.REACT_APP_MAX_FAILURE, process.env.REACT_APP_BACKEND_URL
    const game = useRef(new GameData(import.meta.env.VITE_MAX_ROUND, import.meta.env.VITE_MAX_FAILURE, import.meta.env.VITE_BACKEND_URL));
    const exerciseGenerator = useRef(new ExerciseGenerator(game.current.backendUrl));

    useEffect(() => {
        goNextRound();
    }, []);

    function goNextRound() {
        exerciseGenerator.current.getExercise().then((exerciseData) => {
                game.current.goNextRound();
                setRoundInfo(game.current.getRoundInfo());

                // monster (1-3)
                const randomNum = Math.floor(Math.random() * 3) + 1;
                setMonsterUrl("/monster" + randomNum + ".png");

                // exercise
                game.current.setExercise(exerciseData);
            }
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-5" style={{textAlign: "left"}}>
                    <HealthBar gameData={game.current}/>
                </div>
                <div className="col-sm-7" style={{textAlign: "right"}}>
                    {game.current.isGameRunning() && <small>{roundInfo}</small>}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <Character imageUrl={"/hero.png"}/>
                </div>
                <div className="col-sm-4">

                </div>
                <div className="col-sm-4">
                    <Character imageUrl={monsterUrl}/>
                </div>
            </div>
            {game.current.isGameRunning() &&
                <div className="row">
                    <Exercise gameData={game.current} nextRoundHandler={goNextRound}/>
                </div>
            }
            {game.current.isGameCompleted() &&
                <div className="row">
                    <div className="alert alert-success" role="alert">
                        Congratulations!
                    </div>
                </div>
            }
            {game.current.isGameOver() &&
                <div className="row">
                    <div className="alert alert-danger" role="alert">
                        Game over!
                    </div>
                </div>
            }
        </div>
    );
}