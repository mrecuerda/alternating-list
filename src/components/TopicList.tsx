import { Button } from "react-bootstrap";
import { pickColors } from "../services/ColorService";
import { zip } from "../services/ArrayService";
import { useGame } from "../providers/GameProvider.useContext";

export const TopicList = () => {
    const { availableTopics, startGame, goToScores } = useGame();
    const colors = pickColors(availableTopics.length);
    const coloredTopics = zip(availableTopics, colors).map((x) => {
        return {
            topicTitle: x[0],
            color: x[1],
        };
    });

    return (
        <>
            {coloredTopics.map((coloredTopic) => {
                const { topicTitle, color } = coloredTopic;

                return (
                    <Button
                        key={topicTitle}
                        className="btn-lg my-2 col-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4"
                        onClick={() => startGame(topicTitle)}
                        variant={color}
                    >
                        {topicTitle}
                    </Button>
                );
            })}
            <Button variant="outline-secondary" className="mt-4" onClick={goToScores}>Scores</Button>
        </>
    );
};
