import { Button } from "react-bootstrap";
import { useData, type Pair } from "../providers/DataProvider";
import { useColor, type Color } from "../providers/ColorProvider";
import { useScore } from "../providers/ScoreProvider";
import { useEffect, useState } from "react";
import { shuffle } from "../utils/arrayExtensions";

const PairButtons = () => {
    const { currentTopic, getNextPair } = useData();
    const { pickColors } = useColor();
    const { addScore } = useScore();

    const [pair, setPair] = useState<Pair | null>(null);
    const [shuffledPair, setShuffledPair] = useState<Pair | null>(null);
    const [colors, setColors] = useState<Color[]>([]);
    const [expectedCategory, setExpectedCategory] = useState<number>(null!);
    const [wrong, setWrong] = useState<Record<string, boolean>>({});
    const [remaining, setRemaining] = useState(5);
    const [startDate, setStartDate] = useState<Date>(null!);
    const [totalCount, setTotalCount] = useState(0);
    const [errorsCount, setErrorsCount] = useState(0);

    const moveNext = () => {
        const pair = getNextPair()!;
        const randomColors = pickColors(4)
            .filter((c) => !colors.includes(c))
            .slice(0, 2);

        setPair(pair);
        setColors(randomColors);
        setShuffledPair(shuffle(pair) as Pair);
    };

    useEffect(() => {
        if (!currentTopic) {
            setShuffledPair(null);
            return;
        }

        setExpectedCategory(null!);
        setRemaining(50);
        setStartDate(new Date());
        moveNext();
    }, [currentTopic]);

    useEffect(() => {
        if (!currentTopic || !pair) {
            return;
        }

        console.log(remaining);
        if (remaining == 0) {
            const endDate = new Date();
            addScore(startDate, endDate, totalCount, errorsCount);
            return;
        }

        moveNext();
    }, [remaining]);

    const handleChoice = (choice: string, key: number) => {
        if (!pair) {
            return;
        }

        const category = pair.indexOf(choice);
        if (expectedCategory != null && category != expectedCategory) {
            setErrorsCount(errorsCount + 1);
            const newWrong: Record<number, boolean> = {};
            newWrong[key] = true;
            setWrong(newWrong);
            setTimeout(() => setWrong({}), 500);
            return;
        }

        setTotalCount(totalCount + 1);
        setRemaining(remaining - 1);
        setExpectedCategory(1 - category);
    };

    return (
        shuffledPair && (
            <>
                {shuffledPair.map((choice, key) => (
                    <Button
                        key={key}
                        className={`btn-lg col-md-4 col-sm-8 col-12 my-3 py-5 py-md-4 ${
                            wrong[key] ? "shake" : null
                        }`}
                        onClick={() => handleChoice(choice, key)}
                        variant={colors[key]}
                    >
                        {choice}
                    </Button>
                ))}
            </>
        )
    );
};

export default PairButtons;
