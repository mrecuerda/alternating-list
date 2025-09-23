import type { TopicTitle } from "../services/TopicService";
import type { Score } from "../types/Score";
import { db } from "./Database";

export class ScoreRepository {
    static readonly insert = async (
        topicTitle: TopicTitle,
        startDate: Date,
        endDate: Date,
        rounds: number,
        errors: number
    ): Promise<Score> => {
        const score: Score = {
            id: undefined!,
            topicTitle,
            date: startDate,
            durationInMs: endDate.getTime() - startDate.getTime(),
            rounds,
            errors,
        };

        try {
            const id = await db.scores.add(score);
            score.id = id;
            return score;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    static readonly get = (id: number): Promise<Score | undefined> => {
        return db.scores.get(id);
    };

    static readonly getAll = (): Promise<Score[]> => {
        return db.scores.toArray();
    };
}
