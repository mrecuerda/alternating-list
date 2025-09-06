import { Button } from "react-bootstrap";
import { useGame, type Choice } from "../providers/GameProvider";
import { useEffect, useMemo, useState } from "react";

const Round = () => {
    const { currentGame } = useGame();
    const [failed, setFailed] = useState(false);

    const click = (choice: Choice) => {
        if (!currentGame) {
            return;
        }

        currentGame.pick(choice);
    };

    const currentPair = useMemo(() => {
        if (!currentGame) {
            return [null, null, null];
        }

        if (currentGame.roundsPlayed == currentGame.rounds.length) {
            return [null, null, null];
        }

        const currentPair = currentGame.rounds[currentGame.roundsPlayed];
        return currentPair;
    }, [currentGame]);

    const [firstChoice, secondChoice] = useMemo(() => {
        if (!currentPair) {
            return [null, null];
        }

        const shift = Math.random() >= 0.5;
        return [
            shift ? currentPair[1] : currentPair[0],
            shift ? currentPair[0] : currentPair[1],
        ];
    }, [currentPair]);

    const isWrong = (choice: Choice) => {
        if (!failed || !currentGame || currentGame.expectedCategory == null) {
            return false;
        }

        return choice.id == currentGame.wrongChoiceId;
    };

    useEffect(() => {
        if (!currentGame) {
            return;
        }

        if (currentGame.wrongChoiceId) {
            setFailed(true);
            const timeoutId = setTimeout(() => {
                setFailed(false);
            }, 500);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [currentGame]);

    console.log(currentGame?.rounds);

    return (
        currentPair && (
            <>
                <Button
                    key={firstChoice!.id}
                    className={`btn-lg col-md-4 col-sm-8 col-12 my-3 py-5 py-md-4 ${
                        isWrong(firstChoice!) ? "shake" : null
                    }`}
                    onClick={() => click(firstChoice!)}
                    variant={firstChoice!.color}
                >
                    {firstChoice!.word}
                </Button>
                <Button
                    key={secondChoice!.id}
                    className={`btn-lg col-md-4 col-sm-8 col-12 my-3 py-5 py-md-4 ${
                        isWrong(secondChoice!) ? "shake" : null
                    }`}
                    onClick={() => click(secondChoice!)}
                    variant={secondChoice!.color}
                >
                    {secondChoice!.word}
                </Button>
            </>
        )
    );
};

export default Round;
