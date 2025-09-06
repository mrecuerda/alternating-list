import { createContext, useCallback, useContext, useState } from "react";
import {
    getTopicBy,
    getTopics,
    type RawPair,
    type TopicTitle,
} from "../services/TopicService";
import { pickColors, type Color } from "../services/ColorService";
import { useScore, type Score } from "./ScoreProvider";
import { takeRandom } from "../services/ArrayService";

const GAME_ROUNDS_COUNT = 50;

interface IGameContext {
    gameState: GameState;
    availableTopics: TopicTitle[];
    startGame: (topicTitle: TopicTitle) => void;
    currentGame: Game | null;
    backToMenu: () => void;
}
export type GameState = "menu" | "playing" | "score";
export type Game = {
    topicTitle: TopicTitle;
    startDate: Date | null;
    rounds: Pair[];
    roundsPlayed: number;
    expectedCategory: Category | null;
    errors: number;
    wrongChoiceId: string | null;
    pick: (choice: Choice) => void;
    score: Score | null;
};
export type Pair = {
    id: string;
    0: Choice;
    1: Choice;
};
export type Choice = {
    id: string;
    word: string;
    category: Category;
    color: Color;
};
export type Category = 0 | 1;

const GameContext = createContext<IGameContext>(null!);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [gameState, setGameState] = useState<GameState>("menu");
    const [currentGame, setCurrentGame] = useState<Game | null>(null);
    const { addScore } = useScore();

    const pick = useCallback(
        (choice: Choice) => {
            setCurrentGame((previousGame) => {
                if (!previousGame) {
                    return previousGame;
                }

                const game = cloneGame(previousGame);

                if (game.roundsPlayed == 0) {
                    game.startDate = new Date();
                } else if (choice.category != game.expectedCategory) {
                    game.errors++;
                    game.wrongChoiceId = choice.id;
                    return game;
                }

                game.wrongChoiceId = null;
                game.roundsPlayed++;
                if (game.roundsPlayed == GAME_ROUNDS_COUNT) {
                    game.score = addScore(
                        game.startDate!,
                        new Date(),
                        game.roundsPlayed,
                        game.errors
                    );

                    setGameState("score");
                    return game;
                }

                const nextCategory = (1 - choice.category) as Category;
                game.expectedCategory = nextCategory;
                return game;
            });
        },
        [addScore]
    );

    const startGame = (topicTitle: TopicTitle) => {
        debugger;
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
        currentGame,
        backToMenu,
    };

    return (
        <GameContext.Provider value={context}>{children}</GameContext.Provider>
    );
};

const createNewGame = (
    topicTitle: TopicTitle,
    pick: (choice: Choice) => void
): Game => {
    const topic = getTopicBy(topicTitle);
    const topicPairs = fromRawPairs(topic.pairs);
    const rounds = takeRandom(topicPairs, GAME_ROUNDS_COUNT);

    return {
        topicTitle,
        startDate: null,
        rounds,
        roundsPlayed: 0,
        expectedCategory: null,
        errors: 0,
        wrongChoiceId: null,
        pick,
        score: null,
    };
};

const cloneGame = (game: Game): Game => {
    const clone = { ...game };
    clone.rounds = [...game.rounds];

    return clone;
};

const fromRawPair = (rawPair: RawPair): Pair => {
    const colors = pickColors(2);
    return {
        id: rawPair.id,
        0: {
            id: crypto.randomUUID(),
            word: rawPair[0],
            category: 0,
            color: colors[0],
        },
        1: {
            id: crypto.randomUUID(),
            word: rawPair[1],
            category: 1,
            color: colors[1],
        },
    };
};

const fromRawPairs = (rawPairs: RawPair[]): Pair[] => {
    return rawPairs.map(fromRawPair);
};

const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider.");
    }

    return context;
};

export { GameProvider, useGame };
