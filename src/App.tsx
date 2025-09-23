import { GameProvider } from "./providers/GameProvider.provider";
import { ScoreProvider } from "./providers/ScoreProvider.provider";
import { Menu } from "./components/Menu";

const App = () => {
    return (
        <ScoreProvider>
            <GameProvider>
                <Menu />
            </GameProvider>
        </ScoreProvider>
    );
};

export default App;
