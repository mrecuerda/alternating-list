import { createContext, useContext } from "react";
import type { IGameContext } from "./GameProvider.context";

export const GameContext = createContext<IGameContext>(null!);

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider.");
    }

    return context;
};
