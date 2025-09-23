import { useEffect, useState } from "react";
import { ScoreRepository } from "../dataAccessLayer/ScoreRepository";
import { getTopics } from "../services/TopicService";
import type { TopicScore } from "../types/TopicScore";
import type { IScoreContext } from "./ScoreProvider.context";
import { ScoreContext } from "./ScoreProvider.useContext";

export const ScoreProvider = ({ children }: { children: React.ReactNode; }) => {
    const [topics, setTopics] = useState<TopicScore[]>([]);

    const update = async () => {
        const scores = await ScoreRepository.getAll();
        const topicsTitles = getTopics();
        const topicsScores: TopicScore[] = topicsTitles.map(topicTitle => {
            const topicScores = scores.filter(score => score.topicTitle == topicTitle)
                .sort((a, b) => (a.durationInMs / a.rounds) - (b.durationInMs / b.rounds))
                .slice(0, 5);

            return {
                topicTitle,
                scores: topicScores
            };
        });

        setTopics(topicsScores);
    };

    useEffect(() => {
        update();
    }, []);

    const context: IScoreContext = {
        topics,
        update
    };

    return (<ScoreContext.Provider value={context}>
        {children}
    </ScoreContext.Provider>);
};
