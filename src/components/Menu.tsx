import { useMemo } from "react";
import { useGame } from "../providers/GameProvider.useContext";
import { TopicList } from "./TopicList";
import { Round } from "./Round";
import { NewScore } from "./NewScore";
import { Scores } from "./Scores";

export const Menu = () => {
    const { game } = useGame();

    const isMenu = useMemo(() => game.state == "menu", [game]);
    const isPlaying = useMemo(() => game.state == "playing", [game]);
    const isNewScore = useMemo(() => game.state == "new-score", [game]);
    const isScores = useMemo(() => game.state == "scores", [game]);

    return (
        <div className="d-flex flex-column w-100 justify-content-center align-items-center py-4">
            {isMenu && <TopicList />}
            {isPlaying && <Round />}
            {isNewScore && <NewScore />}
            {isScores && <Scores />}
        </div>
    );
};
