import type { TopicTitle } from "../services/TopicService";

export type Score = {
    id: number;
    topicTitle: TopicTitle;
    date: Date;
    durationInMs: number;
    rounds: number;
    errors: number;
};
