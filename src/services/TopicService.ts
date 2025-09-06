import jsonData from "../assets/data.json";

export type Data = Record<TopicTitle, Topic>;
export type TopicTitle = keyof typeof jsonData;
export type Topic = {
    id: string;
    categories: [string, string];
    pairs: RawPair[];
};
export type RawPair = {
    id: string;
    0: string;
    1: string;
};

const parseJsonData = (): Data => {
    const data: { [key: string]: Topic } = {};
    const topicTitles = Object.keys(jsonData);
    for (const topicTitle of topicTitles) {
        const jsonTopic = jsonData[topicTitle as TopicTitle];
        const topic: Topic = {
            id: crypto.randomUUID(),
            categories: jsonTopic.categories as [string, string],
            pairs: jsonTopic.pairs.map((p) => {
                return {
                    id: crypto.randomUUID(),
                    0: p[0],
                    1: p[1],
                };
            }),
        };

        data[topicTitle] = topic;
    }

    return data as Data;
};

const data = parseJsonData();

const getTopics = (): TopicTitle[] => {
    return Object.keys(data) as TopicTitle[];
};

const getTopicBy = (title: TopicTitle): Topic => {
    return data[title] as Topic;
};

export { getTopics, getTopicBy };
