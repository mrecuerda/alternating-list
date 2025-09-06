import { createContext, useContext } from "react";
import {
    atRandom,
    forceShuffleLastInPlace,
    intersect,
    shuffle,
} from "../utils/arrayExtensions";

export type Color =
    | "blue"
    | "indigo"
    | "purple"
    | "pink"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "cyan";

const Colors: Color[] = [
    "blue",
    "indigo",
    "purple",
    "pink",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "cyan",
];

const SimilarColors: Record<Color, Color[]> = {
    blue: ["blue", "indigo", "purple", "green", "teal", "cyan"],
    indigo: ["indigo", "blue", "purple", "green", "teal", "cyan"],
    purple: ["purple", "blue", "indigo", "pink"],
    pink: ["pink", "purple", "red"],
    red: ["red", "pink", "orange"],
    orange: ["orange", "red", "yellow"],
    yellow: ["yellow", "orange"],
    green: ["green", "blue", "indigo", "teal"],
    teal: ["teal", "blue", "indigo", "green", "cyan"],
    cyan: ["cyan", "blue", "indigo", "teal"],
};

interface IColorContext {
    pickColors: (count: number) => Color[];
}

const ColorContext = createContext<IColorContext | null>(null);

const ColorProvider = ({ children }: { children: React.ReactNode }) => {
    const value = {
        pickColors: pickColors,
    };

    return (
        <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    );
};

const useColor = () => {
    const context = useContext(ColorContext);
    if (!context) {
        throw new Error("useColor must be used within a ColorProvider");
    }

    return context;
};

const pickColors = (count: number): Color[] => {
    if (count == 0) {
        return [];
    }

    if (count == 1) {
        return [atRandom(Colors)];
    }

    if (count < Colors.length) {
        const colors: Color[] = [];
        for (let i = 0; i < count; i++) {
            colors.push(pickDifferentColor(colors));
        }

        return colors;
    }

    const shuffledColors = shuffle(Colors);
    if (count == Colors.length) {
        return shuffledColors;
    }

    // count > Colors.length

    const nextColors = pickColors(count - Colors.length);
    if (shuffledColors[shuffledColors.length - 1] == nextColors[0]) {
        forceShuffleLastInPlace(shuffledColors);
    }

    return [...shuffledColors, ...nextColors];
};

const pickDifferentColor = (pickedColors: Color[]): Color => {
    const availableColors = Colors.filter((c) => !pickedColors.includes(c));

    const differentColors = availableColors.filter(
        (c) => intersect(SimilarColors[c], pickedColors).length == 0
    );

    if (differentColors.length > 0) {
        return atRandom(differentColors);
    }

    return atRandom(availableColors);
};

export { ColorProvider, useColor };
