import type { TopicScore } from "../types/TopicScore";

export interface IScoreContext {
    topics: TopicScore[];
    update: () => Promise<void>;
}
