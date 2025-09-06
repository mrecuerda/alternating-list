import { Button } from "react-bootstrap";
import { useData } from "../providers/DataProvider";
import { useScore } from "../providers/ScoreProvider";
import Chrono from "./Chrono";

const NewScore = () => {
    const { newScore, setNewScore } = useScore();
    const { selectTopic } = useData();

    const backToMenu = () => {
        selectTopic(null!);
        setNewScore(null);
    };

    return (
        <>
            {newScore && (
                <>
                    <Chrono durationInMs={newScore.durationInMs} />
                    <div className="d-flex">
                        <span>{newScore.totalCount} mots</span>
                        <span className="mx-2">-</span>
                        <span>{newScore.errorsCount} erreur(s)</span>
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
