import Dexie, { type EntityTable } from "dexie";
import type { Score } from "../types/Score";

export const db = new Dexie("AlternatingList") as Dexie & {
    scores: EntityTable<Score, "id">;
};

db.version(1).stores({
    scores: "++id, topicTitle, date, durationInMs, rounds, errors",
});
