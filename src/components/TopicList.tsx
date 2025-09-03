import { Button } from 'react-bootstrap';
import { useList } from "../providers/ListProvider";

const TopicList = () => {
    const { topics, selectTopic } = useList();

    return topics && (<div className="d-flex flex-column">
        {topics.map((topic, key) => (
            <Button key={key} onClick={() => selectTopic(topic)}>{topic}</Button>
        ))}
    </div>);
};

export default TopicList;
