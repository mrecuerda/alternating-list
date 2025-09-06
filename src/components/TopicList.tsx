import { Button } from "react-bootstrap";
import { useData } from "../providers/DataProvider";

const TopicData = () => {
    const { topics, selectTopic } = useData();

    return (
        topics && (
            <>
                {topics.map((topic, key) => (
                    <Button
                        key={key}
                        className="btn-lg my-2 col-12 col-md-6"
                        onClick={() => selectTopic(topic)}
                    >
                        {topic}
                    </Button>
                ))}
            </>
        )
    );
};

export default TopicData;
