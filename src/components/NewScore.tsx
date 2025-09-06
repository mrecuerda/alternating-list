import { Button } from "react-bootstrap";
import Chrono from "./Chrono";
import { useGame } from "../providers/GameProvider";

const NewScore = () => {
    const { currentGame, backToMenu } = useGame();

    return (
        <>
            {currentGame?.score && (
                <>
                    <Chrono durationInMs={currentGame.score.durationInMs} />
                    <div className="d-flex">
                        <span>{currentGame.score.totalCount} mots</span>
                        <span className="mx-2">-</span>
                        <span>{currentGame.score.errorsCount} erreur(s)</span>
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
