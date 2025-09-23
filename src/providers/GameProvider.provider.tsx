import {
    useCallback,
    useEffect,
    useState,
} from "react";
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
import type { Question } from "../types/Question";
import type { Category } from "../types/Category";
import { ScoreRepository } from "../dataAccessLayer/ScoreRepository";
import type { GameSession } from "../types/GameSession";
import type { IGameContext } from "./GameProvider.context";
import { GameContext } from "./GameProvider.useContext";
import { useScore } from "./ScoreProvider.useContext";

const GAME_ROUNDS_COUNT = 50;

export const GameProvider = ({ children }: { children: React.ReactNode; }) => {
    const { update: updateScores } = useScore();
    const [game, setGame] = useState<Game>({
        state: "menu",
        currentSession: null,
    });

    const startGame = (topicTitle: TopicTitle) => {
        setGame((prev) => {
            const game = cloneGame(prev);
            game.state = "playing";
            game.currentSession = createNewGameSession(topicTitle);

            return game;
        });
    };

    const goToScores = () => {
        setGame((prev) => {
            const game = cloneGame(prev);
            game.state = "scores";

            return game;
        });
    };

    const pick = useCallback((choice: Answer) => {
        setGame((prev) => {
            if (!prev.currentSession) {
                return prev;
            }

            const game = cloneGame(prev);
            const gameSession = game.currentSession!;

            if (gameSession.round == 0) {
                updateAnswersValidity(gameSession.questions, choice.category);
                gameSession.startDate = new Date();
            } else if (!choice.isValid) {
                gameSession.questions[gameSession.round].error = true;
                gameSession.errors++;
                return game;
            }

            gameSession.round++;
            if (gameSession.round == GAME_ROUNDS_COUNT) {
                gameSession.endDate = new Date();
                game.state = "saving-score";
                return game;
            }

            return game;
        });
    }, []);

    const backToMenu = () => {
        setGame((prev) => {
            const game = cloneGame(prev);
            game.state = "menu";
            game.currentSession = null;

            return game;
        });
    };

    useEffect(() => {
        if (game.state != "saving-score") {
            return;
        }

        const saveScore = async () => {
            const gameSession = game.currentSession!;
            const score = await ScoreRepository.insert(
                gameSession.topic.title,
                gameSession.startDate!,
                gameSession.endDate!,
                gameSession.questions.length,
                gameSession.errors
            );

            await updateScores();

            setGame((prev) => {
                if (prev.state != "saving-score" || !prev.currentSession) {
                    return prev;
                }

                const game = cloneGame(prev);
                const gameSession = game.currentSession!;
                gameSession.score = score;
                game.state = "new-score";
                return game;
            });
        };

        saveScore();
    }, [game, updateScores]);

    const context: IGameContext = {
        game,
        availableTopics: getTopics(),
        startGame,
        goToScores,
        pick,
        backToMenu,
    };

    return (
        <GameContext.Provider value={context}>{children}</GameContext.Provider>
    );
};

const createNewGameSession = (topicTitle: TopicTitle): GameSession => {
    const topic = getTopicBy(topicTitle);
    const rounds = takeRandom(topic.pairs, GAME_ROUNDS_COUNT);
    const questions = buildQuestions(rounds, topic.categories);

    return {
        topic,
        startDate: null,
        endDate: null,
        questions: questions,
        round: 0,
        errors: 0,
        score: null,
    };
};

const cloneGame = (game: Game): Game => {
    const clone = { ...game };

    if (clone.currentSession) {
        clone.currentSession = { ...clone.currentSession };
        clone.currentSession.questions = [...clone.currentSession.questions];
    }

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
