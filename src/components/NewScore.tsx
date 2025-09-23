import { Button } from "react-bootstrap";
import { useMemo } from "react";
import { useGame } from "../providers/GameProvider.useContext";
import { Chrono } from "./Chrono";

export const NewScore = () => {
    const { game, goToScores, backToMenu } = useGame();

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

            <div>

                <Button
                    variant="outline-secondary"
                    className="mt-4 mx-2"
                    onClick={backToMenu}
                >
                    Menu
                </Button>
                <Button
                    variant="outline-secondary"
                    className="mt-4 mx-2"
                    onClick={goToScores}>
                    Tous les scores
                </Button>
            </div>
        </>
    );
};
