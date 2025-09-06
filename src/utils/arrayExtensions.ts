export const intersect = <T>(array: T[], other: T[]): T[] => {
    return array.filter((x) => other.includes(x));
};

/**
 * Create a copy of `array`, shuffling positions of all items in the copy.
 */
export const shuffle = <T>(array: T[]): T[] => {
    const copy = [...array];
    shuffleInPlace(copy);
    return copy;
};

/**
 * Shuffle positions of all items in `array`.
 */
export const shuffleInPlace = <T>(array: T[]): void => {
    for (let i = array.length - 1; i > 0; i--) {
        shuffleAtIndex(array, i);
    }
};

/**
 * Most-likely switch item at index `i` with a previous item of `array`.
 *
 * @remarks
 * Has a 1/`i` chance not to switch places.
 */
export const shuffleAtIndex = <T>(array: T[], i: number): void => {
    if (array.length <= i) {
        return;
    }

    const j = random(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
};

/**
 * Switch place of last item with another item randomly
 */
export const forceShuffleFirstInPlace = <T>(array: T[]): void => {
    if (array.length < 2) {
        return;
    }

    const i = 0;
    const j = 1 + random(array.length - 1);
    [array[i], array[j]] = [array[j], array[i]];
};

/**
 * Switch place of last item with another item randomly
 */
export const forceShuffleLastInPlace = <T>(array: T[]): void => {
    if (array.length < 2) {
        return;
    }

    const i = array.length - 1;
    const j = random(i);
    [array[i], array[j]] = [array[j], array[i]];
};

export const atRandom = <T>(array: T[]): T => {
    return array[random(array.length)];
};

/**
 * @returns Random value from 0 (included) to `max` (excluded)
 */
const random = (max: number): number => {
    return Math.floor(Math.random() * max);
};
