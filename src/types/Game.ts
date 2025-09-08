import type { GameState } from "./GameState";
import type { GameSession } from "./GameSession";

export type Game = {
    state: GameState;
    currentSession: GameSession | null;
};
