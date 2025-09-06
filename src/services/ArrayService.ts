export const intersect = <T>(array: T[], other: T[]): T[] => {
    return array.filter((x) => other.includes(x));
};

export const zip = <T, U>(array: T[], other: U[]): [T, U][] => {
    return array.map((item, index) => {
        return [item, other[index]];
    });
};

export const takeRandom = <T>(
    array: T[],
    count: number,
    avoidRepeat: number = 1 / 3
): T[] => {
    if (count == 0 || array == null || array.length == 0) {
        return [];
    }

    if (count == 1) {
        return [atRandom(array)];
    }

    const result = shuffle(array);
    if (count <= result.length) {
        return result.slice(0, count);
    }

    const shuffledBatch: T[] = [];
    const excludeCount = Math.min(
        Math.round(array.length * avoidRepeat),
        array.length - 1
    );
    while (result.length < count) {
        if (shuffledBatch.length == 0) {
            shuffledBatch.push(...shuffle(array));
        }

        const exclude = result.slice(-excludeCount);
        const possibleItems = shuffledBatch.filter((x) => !exclude.includes(x));
        const next = atRandom(possibleItems);

        const shuffledIndex = shuffledBatch.indexOf(next);
        shuffledBatch.splice(shuffledIndex, 1);

        result.push(next);
    }

    return result;
};

export const shuffle = <T>(array: T[]): T[] => {
    const copy = [...array];
    shuffleInPlace(copy);
    return copy;
};

export const shuffleInPlace = <T>(array: T[]): void => {
    for (let i = array.length - 1; i > 0; i--) {
        shuffleAtIndex(array, i);
    }
};

export const shuffleAtIndex = <T>(array: T[], i: number): void => {
    if (array.length <= i) {
        return;
    }

    const j = random(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
};

export const forceShuffleFirstInPlace = <T>(array: T[]): void => {
    if (array.length < 2) {
        return;
    }

    const i = 0;
    const j = 1 + random(array.length - 1);
    [array[i], array[j]] = [array[j], array[i]];
};

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

const random = (max: number): number => {
    return Math.floor(Math.random() * max);
};
