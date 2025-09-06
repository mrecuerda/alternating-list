import { useMemo } from "react";
import TopicList from "./components/TopicList";
import { useGame } from "./providers/GameProvider";
import Round from "./components/Round";
import NewScore from "./components/NewScore";

const App = () => {
    const { gameState } = useGame();

    const isMenu = useMemo(() => gameState == "menu", [gameState]);
    const isPlaying = useMemo(() => gameState == "playing", [gameState]);
    const isScore = useMemo(() => gameState == "score", [gameState]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 mx-2">
            {isMenu && <TopicList />}
            {isPlaying && <Round />}
            {isScore && <NewScore />}
        </div>
    );
};

export default App;
