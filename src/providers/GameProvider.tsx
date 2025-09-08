import { createContext, useCallback, useContext, useState } from "react";
import {
    getTopicBy,
    getTopics,
    type RawPair,
    type TopicTitle,
} from "../services/TopicService";
import { pickColors } from "../services/ColorService";
import { takeRandom } from "../services/ArrayService";

import type { Game } from "../types/Game";
import type { Answer } from "../types/Choice";
import type { Question } from "../types/Pair";
import type { Category } from "../types/Category";

const GAME_ROUNDS_COUNT = 50;

interface IGameContext {
    gameState: GameState;
    availableTopics: TopicTitle[];
    startGame: (topicTitle: TopicTitle) => void;
    game: Game | null;
    backToMenu: () => void;
}
export type GameState = "menu" | "playing" | "score";

const GameContext = createContext<IGameContext>(null!);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [gameState, setGameState] = useState<GameState>("menu");
    const [currentGame, setCurrentGame] = useState<Game | null>(null);

    const pick = useCallback((choice: Answer) => {
        setCurrentGame((previousGame) => {
            if (!previousGame) {
                return previousGame;
            }

            const game = cloneGame(previousGame);

            if (game.rounds == 0) {
                updateAnswersValidity(game.questions, choice.category);
                game.startDate = new Date();
            } else if (!choice.isValid) {
                game.questions[game.rounds].error = true;
                game.errors++;
                return game;
            }

            game.rounds++;
            if (game.rounds == GAME_ROUNDS_COUNT) {
                // game.score = await ScoreRepository.insert(
                //     game.startDate!,
                //     new Date(),
                //     game.rounds,
                //     game.errors
                // );

                setGameState("score");
                return game;
            }

            return game;
        });
    }, []);

    const startGame = (topicTitle: TopicTitle) => {
        const newGame = createNewGame(topicTitle, pick);
        setCurrentGame(newGame);
        setGameState("playing");
    };

    const backToMenu = () => {
        setGameState("menu");
        setCurrentGame(null);
    };

    const context: IGameContext = {
        gameState,
        availableTopics: getTopics(),
        startGame,
        game: currentGame,
        backToMenu,
    };

    return (
        <GameContext.Provider value={context}>{children}</GameContext.Provider>
    );
};

const createNewGame = (
    topicTitle: TopicTitle,
    pick: (choice: Answer) => void
): Game => {
    const topic = getTopicBy(topicTitle);
    const rounds = takeRandom(topic.pairs, GAME_ROUNDS_COUNT);
    const questions = buildQuestions(rounds, topic.categories);

    return {
        topic,
        categories: topic.categories,
        startDate: null,
        questions: questions,
        rounds: 0,
        errors: 0,
        pick,
        score: null,
    };
};

const cloneGame = (game: Game): Game => {
    const clone = { ...game };
    clone.questions = [...game.questions];

    return clone;
};

const buildQuestions = (
    pairs: RawPair[],
    categories: [Category, Category]
): Question[] => {
    return pairs.map((x) => buildQuestion(categories, x));
};

const buildQuestion = (
    categories: [Category, Category],
    rawPair: RawPair
): Question => {
    const colors = pickColors(2);
    const reverse = Math.random() >= 0.5;
    const [first, second]: [0 | 1, 0 | 1] = reverse ? [1, 0] : [0, 1];
    return {
        id: rawPair.id,
        0: {
            id: crypto.randomUUID(),
            value: rawPair[first],
            category: categories[first],
            isValid: true,
            color: colors[first],
        },
        1: {
            id: crypto.randomUUID(),
            value: rawPair[second],
            category: categories[second],
            isValid: true,
            color: colors[second],
        },
        error: false,
    };
};

const updateAnswersValidity = (
    questions: Question[],
    firstCategory: Category
) => {
    const categories = [questions[0][0].category, questions[0][1].category];
    const otherCategory = categories.find((x) => x != firstCategory);
    questions.forEach((question, index) => {
        const expectedCategory = index % 2 == 0 ? firstCategory : otherCategory;
        question[0].isValid = question[0].category == expectedCategory;
        question[1].isValid = question[1].category == expectedCategory;
    });
};

const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider.");
    }

    return context;
};

export { GameProvider, useGame };
