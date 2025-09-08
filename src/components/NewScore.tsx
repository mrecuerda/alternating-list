import { Button } from "react-bootstrap";
import Chrono from "./Chrono";
import { useGame } from "../providers/GameProvider";
import { useMemo } from "react";

const NewScore = () => {
    const { game, backToMenu } = useGame();

    const score = useMemo(() => {
        return game.currentSession?.score;
    }, [game]);

    const [wordsLabel, errorsLabel] = useMemo(() => {
        const score = game.currentSession?.score;
        if (!score) {
            return [null, null];
        }

        const rounds = score.rounds;
        const errors = score.errors;
        return [
            rounds < 2 ? `${rounds} mot` : `${rounds} mots`,
            errors < 2 ? `${errors} erreur` : `${errors} erreurs`,
        ];
    }, [game]);

    return (
        <>
            {score && (
                <>
                    <h1 className="text-success">
                        {game.currentSession?.topic.title}
                    </h1>
                    <Chrono durationInMs={score.durationInMs} />
                    <div className="d-flex">
                        <span>{wordsLabel}</span>
                        <span className="mx-2">-</span>
                        <span>{errorsLabel}</span>
                    </div>
                </>
            )}

            <Button
                variant="outline-secondary"
                className="mt-5"
                onClick={backToMenu}
            >
                Menu
            </Button>
        </>
    );
};

export default NewScore;
