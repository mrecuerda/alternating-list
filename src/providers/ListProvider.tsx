import { createContext, useContext, useState } from 'react';

export type Pair = [string, string];
export type TopicList = Pair[];

const topicsData: { [key: string]: TopicList; } = {
    "Abstrait et concret": [
        ["sérénité", "vallée"],
        ["pérennité", "déjeuner"],
        ["amertume", "échelle"],
        ["amitié", "fée"],
        ["gentillesse", "clé"]
    ],
    "Pays et capitale": [
        ["France", "Paris"],
        ["Espagne", "Madrid"],
        ["Angleterre", "Londres"],
        ["Allemagne", "Berlin"],
        ["Belgique", "Bruxelles"]
    ]
};

interface IListContext {
    topics: string[];
    currentTopic: string | null;
    selectTopic: (topic: string) => void;
    getNextPair: () => Pair | null;
}

const ListContext = createContext<IListContext | null>(null);

const ListProvider = ({ children }: { children: React.ReactNode; }) => {
    const [currentTopic, setTopic] = useState<string | null>(null);
    const [remainingPairs, setRemainingPairs] = useState<Pair[]>([]);

    const topics = Object.keys(topicsData);

    const selectTopic = (topic: string) => {
        if (!topicsData[topic]) {
            throw new Error(`Unknown topic '${topic}'`);
        }

        setTopic(topic);
    };

    const getNextPair = (): Pair | null => {
        if (!currentTopic) {
            return null;
        }

        if (remainingPairs.length > 1) {
            const [nextPair, ...rest] = remainingPairs;
            setRemainingPairs(rest);
            return nextPair;
        }

        // Avoid having the same pair twice in a row when looping the topic
        const shuffledPairs = shuffle(topicsData[currentTopic]);
        if (remainingPairs.length == 1) {
            const nextPair = remainingPairs[0];
            const nextShuffledPair = shuffledPairs[0];
            if (nextPair == nextShuffledPair) {
                const randomIndex = 1 + Math.floor(Math.random() * (nextShuffledPair.length - 1));
                [shuffledPairs[0], shuffledPairs[randomIndex]] = [shuffledPairs[randomIndex], shuffledPairs[0]];
            }

            setRemainingPairs(shuffledPairs);
            return nextPair;
        }

        const [nextPair, ...rest] = shuffledPairs;
        setRemainingPairs(rest);
        return nextPair;
    };

    const value: IListContext = {
        topics,
        currentTopic,
        selectTopic,
        getNextPair
    };

    return <ListContext.Provider value={value}>
        {children}
    </ListContext.Provider>;
};

function shuffle<T>(array: T[]): T[] {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

const useList = () => {
    const context = useContext(ListContext);
    if (!context) {
        throw new Error("useList must be used within a ListProvider");
    }

    return context;
};

export { ListProvider, useList };
