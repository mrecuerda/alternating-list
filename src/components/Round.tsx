import { Button } from "react-bootstrap";
import { useGame } from "../providers/GameProvider";
import { useEffect, useMemo, useState } from "react";
import type { Answer } from "../types/Choice";

const Round = () => {
    const { game, pick } = useGame();
    const [shake, setShake] = useState(false);

    const click = (word: Answer) => {
        if (!game) {
            return;
        }

        pick(word);
    };

    const currentPair = useMemo(() => {
        const gameSession = game.currentSession;
        if (game.state != "playing" || !gameSession) {
            return null;
        }

        if (gameSession.round == gameSession.questions.length) {
            return null;
        }

        const currentPair = gameSession.questions[gameSession.round];
        return currentPair;
    }, [game]);

    useEffect(() => {
        const gameSession = game.currentSession;
        if (!gameSession) {
            return;
        }

        if (!gameSession.questions[gameSession.round].error) {
            setShake(false);
            return;
        }

        setShake(true);
        const timeoutId = setTimeout(() => {
            setShake(false);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [game]);

    return (
        currentPair && (
            <>
                <Button
                    key={currentPair[0].id}
                    className={`btn-lg col-md-4 col-sm-8 col-12 my-3 py-5 py-md-4 ${
                        !currentPair[0].isValid && shake ? "shake" : null
                    }`}
                    onClick={() => click(currentPair[0])}
                    variant={currentPair[0].color}
                >
                    {currentPair[0].value}
                </Button>
                <Button
                    key={currentPair[1].id}
                    className={`btn-lg col-md-4 col-sm-8 col-12 my-3 py-5 py-md-4 ${
                        !currentPair[1].isValid && shake ? "shake" : null
                    }`}
                    onClick={() => click(currentPair[1])}
                    variant={currentPair[1].color}
                >
                    {currentPair[1].value}
                </Button>
            </>
        )
    );
};

export default Round;
