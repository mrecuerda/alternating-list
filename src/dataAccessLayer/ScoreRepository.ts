import type { Score } from "../types/Score";
import { db } from "./Database";

export class ScoreRepository {
    static readonly insert = async (
        topicTitle: string,
        startDate: Date,
        endDate: Date,
        rounds: number,
        errors: number
    ): Promise<Score> => {
        const score: Score = {
            id: 0,
            topicTitle,
            date: startDate,
            durationInMs: endDate.getTime() - startDate.getTime(),
            rounds,
            errors,
        };

        const id = await db.scores.add(score);
        score.id = id;
        return score;
    };

    static readonly get = (id: number): Promise<Score | undefined> => {
        return db.scores.get(id);
    };
}
