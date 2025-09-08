import { Button } from "react-bootstrap";
import Chrono from "./Chrono";
import { useGame } from "../providers/GameProvider";
import { useMemo } from "react";

const NewScore = () => {
    const { game, backToMenu } = useGame();

    const score = useMemo(() => {
        return game.currentSession?.score;
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
                        <span>{score.rounds} mots</span>
                        <span className="mx-2">-</span>
                        <span>{score.errors} erreur(s)</span>
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
