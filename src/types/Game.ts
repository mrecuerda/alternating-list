import type { Topic } from "../services/TopicService";
import type { Category } from "./Category";
import type { Answer } from "./Choice";
import type { Question } from "./Pair";
import type { Score } from "./Score";

export type Game = {
    topic: Topic;
    categories: [Category, Category];
    startDate: Date | null;
    questions: Question[];
    rounds: number;
    errors: number;
    pick: (word: Answer) => void;
    score: Score | null;
};
