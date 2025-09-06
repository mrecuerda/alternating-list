import { createContext, useContext, useState } from "react";
import { forceShuffleFirstInPlace, shuffle } from "../utils/arrayExtensions";
import topicsData from "../assets/data.json";

export type Topic = keyof typeof topicsData;
export type Pair = [string, string];

interface IDataContext {
    topics: Topic[];
    currentTopic: Topic | null;
    selectTopic: (topic: Topic) => void;
    getNextPair: () => Pair | null;
}

const DataContext = createContext<IDataContext | null>(null);

const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentTopic, setTopic] = useState<Topic | null>(null);
    const [remainingPairs, setRemainingPairs] = useState<Pair[]>([]);

    const topics = Object.keys(topicsData) as Topic[];

    const selectTopic = (topic: Topic | null) => {
        setTopic(topic);
        setRemainingPairs([]);
    };

    const getNextPair = (): Pair | null => {
        if (!currentTopic) {
            throw new Error("Should not be called");
        }

        if (remainingPairs.length > 1) {
            const [nextPair, ...rest] = remainingPairs;
            setRemainingPairs(rest);
            return nextPair;
        }

        // Avoid having the same pair twice in a row when looping the topic
        const shuffledPairs = shuffle(topicsData[currentTopic]) as Pair[];
        if (remainingPairs.length == 1) {
            const nextPair = remainingPairs[0];
            const nextShuffledPair = shuffledPairs[0];
            if (nextPair == nextShuffledPair) {
                forceShuffleFirstInPlace(shuffledPairs);
            }

            setRemainingPairs(shuffledPairs);
            return nextPair;
        }

        const [nextPair, ...rest] = shuffledPairs;
        setRemainingPairs(rest);
        return nextPair;
    };

    const value: IDataContext = {
        topics,
        currentTopic,
        selectTopic,
        getNextPair,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};

const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }

    return context;
};

export { DataProvider, useData };
