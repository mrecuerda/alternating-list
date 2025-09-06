import { useData } from "./providers/DataProvider";
import { useScore } from "./providers/ScoreProvider";
import PairButtons from "./components/PairButtons";
import TopicList from "./components/TopicList";
import NewScore from "./components/NewScore";

function App() {
    const { newScore } = useScore();
    const { currentTopic } = useData();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 mx-2">
            {!currentTopic && <TopicList />}
            {currentTopic && (newScore ? <NewScore /> : <PairButtons />)}
        </div>
    );
}

export default App;
