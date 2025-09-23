import { createContext, useContext } from "react";
import type { IScoreContext } from "./ScoreProvider.context";

export const ScoreContext = createContext<IScoreContext>(null!);

export const useScore = () => {
    const context = useContext(ScoreContext);
    if (!context) {
        throw new Error("useScore must be used within a ScoreProvider.");
    }

    return context;
};
