import type { Answer } from "./Choice";

export type Question = {
    id: string;
    0: Answer;
    1: Answer;
    error: boolean;
};
