import "./scss/main.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GameProvider } from "./providers/GameProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GameProvider>
            <App />
        </GameProvider>
    </StrictMode>
);
