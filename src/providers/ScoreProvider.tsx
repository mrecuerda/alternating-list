import { createContext, useContext, useState } from "react";

export type Score = {
    date: Date;
    durationInMs: number;
    totalCount: number;
    errorsCount: number;
};

const LOCAL_STORAGE_KEY = "SCORES";

interface IScoreContext {
    newScore: Score | null;
    setNewScore: (score: Score | null) => void;
    getScores: () => Score[];
    addScore: (
        startDate: Date,
        endDate: Date,
        totalCount: number,
        errorsCount: number
    ) => Score;
}

const ScoreContext = createContext<IScoreContext>(null!);

const ScoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [newScore, setNewScore] = useState<Score | null>(null);

    const addScore = (
        startDate: Date,
        endDate: Date,
        totalCount: number,
        errorsCount: number
    ): Score => {
        const score = {
            date: startDate,
            durationInMs: endDate.getTime() - startDate.getTime(),
            totalCount,
            errorsCount,
        };

        const scores = getScores();
        scores.push(score);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(scores));

        setNewScore(score);
        return score;
    };

    const value: IScoreContext = { newScore, setNewScore, getScores, addScore };

    return (
        <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
    );
};

const getScores = (): Score[] => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    const scores = value == null ? [] : (JSON.parse(value) as Score[]);
    return scores;
};

const useScore = () => {
    const context = useContext(ScoreContext);
    if (!context) {
        throw new Error("useScore must be used within a ScoreProvider");
    }

    return context;
};

export { ScoreProvider, useScore };
