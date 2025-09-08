import type { Topic } from "../services/TopicService";
import type { Question } from "./Question";
import type { Score } from "./Score";

export type GameSession = {
    topic: Topic;
    startDate: Date | null;
    endDate: Date | null;
    questions: Question[];
    round: number;
    errors: number;
    score: Score | null;
};
