import type { Color } from "../types/Color";
import { takeRandom } from "./ArrayService";

const Colors: Color[] = ["indigo", "pink", "orange", "green", "cyan"];

const pickColors = (count: number): Color[] => {
    return takeRandom(Colors, count);
};

export { pickColors };
