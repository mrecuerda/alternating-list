import { takeRandom } from "./ArrayService";

export type Color = "indigo" | "pink" | "red" | "orange" | "yellow" | "green";

const Colors: Color[] = ["indigo", "pink", "red", "orange", "yellow", "green"];

const pickColors = (count: number): Color[] => {
    return takeRandom(Colors, count);
};

export { pickColors };
