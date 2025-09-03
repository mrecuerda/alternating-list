import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import { type Pair, useList } from './providers/ListProvider';
import TopicList from './components/TopicList';

function App() {
    const { currentTopic, getNextPair } = useList();
    const [currentPair, setCurrentPair] = useState<Pair | null>(null);
    const [randomShift, setRandomShift] = useState(0);

    useEffect(() => {
        const pair = getNextPair();
        setCurrentPair(pair);
    }, [currentTopic]);

    const handleNextClick = () => {
        const pair = getNextPair();
        setCurrentPair(pair);

        const tmp = Math.floor(Math.random() * 2);
        console.log(tmp);
        setRandomShift(tmp);
    };

    return (
        <div className='App'>
            {
                (!currentTopic) && <TopicList />
            }
            {
                (currentTopic && currentPair) && <div>
                    <Button onClick={handleNextClick}>{currentPair[randomShift - 0]}</Button>
                    <Button onClick={handleNextClick}>{currentPair[1 - randomShift]}</Button>
                </div>
            }
        </div>
    );
}

export default App;
