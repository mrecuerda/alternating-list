import type { TopicTitle } from "../services/TopicService";
import type { Answer } from "../types/Choice";
import type { Game } from "../types/Game";

export interface IGameContext {
    game: Game;
    availableTopics: TopicTitle[];
    startGame: (topicTitle: TopicTitle) => void;
    goToScores: () => void;
    pick: (choice: Answer) => void;
    backToMenu: () => void;
}
