import { Button } from "react-bootstrap";
import { useGame } from "../providers/GameProvider";
import { useEffect, useMemo, useState } from "react";
import type { Answer } from "../types/Choice";

const Round = () => {
    const { game } = useGame();
    const [failed, setFailed] = useState(false);

    const click = (word: Answer) => {
        if (!game) {
            return;
        }

        game.pick(word);
    };

    const currentPair = useMemo(() => {
        if (!game) {
            return null;
        }

        if (game.rounds == game.questions.length) {
            return null;
        }

        const currentPair = game.questions[game.rounds];
        return currentPair;
    }, [game]);

    useEffect(() => {
        if (!game || !game.questions[game.rounds].error) {
            setFailed(false);
            return;
        }

        setFailed(true);
        const timeoutId = setTimeout(() => {
            setFailed(false);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [game]);

    console.log(game?.questions);

    return (
        currentPair && (
            <>
                <Button
                    key={currentPair[0].id}
                    className={`btn-lg col-md-4 col-sm-8 col-12 my-3 py-5 py-md-4 ${
                        !currentPair[0].isValid && failed ? "shake" : null
                    }`}
                    onClick={() => click(currentPair[0])}
                    variant={currentPair[0].color}
                >
                    {currentPair[0].value}
                </Button>
                <Button
                    key={currentPair[1].id}
                    className={`btn-lg col-md-4 col-sm-8 col-12 my-3 py-5 py-md-4 ${
                        !currentPair[1].isValid && failed ? "shake" : null
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
