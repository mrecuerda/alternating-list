import { Button } from "react-bootstrap";
import { useGame } from "../providers/GameProvider";
import { pickColors } from "../services/ColorService";
import { zip } from "../services/ArrayService";

const TopicData = () => {
    const { availableTopics, startGame } = useGame();
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
                        className="btn-lg my-2 col-12 col-md-6"
                        onClick={() => startGame(topicTitle)}
                        variant={color}
                    >
                        {topicTitle}
                    </Button>
                );
            })}
        </>
    );
};

export default TopicData;
