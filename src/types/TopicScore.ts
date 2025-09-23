import type { TopicTitle } from "../services/TopicService";
import type { Score } from "./Score";

export type TopicScore = {
    topicTitle: TopicTitle,
    scores: Score[];
};
