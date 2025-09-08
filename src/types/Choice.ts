import type { Category } from "./Category";
import type { Color } from "./Color";

export type Answer = {
    id: string;
    value: string;
    category: Category;
    isValid: boolean;
    color: Color;
};
