import { useMemo } from "react";
import TopicList from "./components/TopicList";
import { useGame } from "./providers/GameProvider";
import Round from "./components/Round";
import NewScore from "./components/NewScore";

const App = () => {
    const { game } = useGame();

    const isMenu = useMemo(() => game.state == "menu", [game]);
    const isPlaying = useMemo(() => game.state == "playing", [game]);
    const isSavingScore = useMemo(
        () => game.state == "saving-score",
        [game.state]
    );
    const isScore = useMemo(() => game.state == "score", [game]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 mx-2">
            {isMenu && <TopicList />}
            {isPlaying && <Round />}
            {isSavingScore && <></>}
            {isScore && <NewScore />}
        </div>
    );
};

export default App;
