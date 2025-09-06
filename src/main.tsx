import "./scss/main.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { DataProvider } from "./providers/DataProvider.tsx";
import { ColorProvider } from "./providers/ColorProvider.tsx";
import { ScoreProvider } from "./providers/ScoreProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <DataProvider>
            <ColorProvider>
                <ScoreProvider>
                    <App />
                </ScoreProvider>
            </ColorProvider>
        </DataProvider>
    </StrictMode>
);
