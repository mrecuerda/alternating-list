import "./scss/main.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GameProvider } from "./providers/GameProvider.tsx";
import { ScoreProvider } from "./providers/ScoreProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ScoreProvider>
            <GameProvider>
                <App />
            </GameProvider>
        </ScoreProvider>
    </StrictMode>
);
