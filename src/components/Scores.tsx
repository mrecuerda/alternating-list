import { Button, Card, CardBody, CardHeader, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useScore } from "../providers/ScoreProvider.useContext";
import { Chrono } from "./Chrono";
import { useGame } from "../providers/GameProvider.useContext";
import type { Score } from "../types/Score";

export const Scores = () => {
    const { topics } = useScore();
    const { startGame, backToMenu } = useGame();

    const formatDetails = (score: Score): string => {
        if (!score) {
            return null!;
        }

        const rounds = score.rounds;
        const roundsLabel = rounds < 2 ? `${rounds} mot` : `${rounds} mots`;
        const errors = score.errors;
        const errorsLabel = errors < 2 ? `${errors} erreur` : `${errors} erreurs`;
        return `${roundsLabel} - ${errorsLabel}`;
    };

    return (
        <Container className="text-center">
            <Row className="row-cols-1 row-cols-md-2 row-cols-xl-3">
                {topics && topics.map((topic) => (
                    <Col key={topic.topicTitle} className="mb-4">
                        <Card className="mx-1 bg-success rounded-top">

                            <CardHeader>
                                <h3>{topic.topicTitle}</h3>
                            </CardHeader>

                            <CardBody className="bg-body rounded-bottom">

                                {topic.scores.length > 0 && <ListGroup className="list-group-flush">{topic.scores.map(score => (
                                    <ListGroupItem key={score.id} className="d-flex flex-column">
                                        <Chrono durationInMs={score.durationInMs} display="h4" />
                                        <span>{formatDetails(score)}</span>
                                        <span>{`Le ${score.date.toLocaleDateString("fr-FR")} à ${score.date.toLocaleTimeString()}`}</span>
                                    </ListGroupItem>
                                ))}
                                </ListGroup>}

                                {topic.scores.length == 0 && <div className="d-flex flex-column bg-body align-items-center my-2">
                                    <span className="text-muted">Aucun score enregistré</span>
                                    <Button variant="outline-primary" className="mt-3" onClick={() => startGame(topic.topicTitle)}>Jouer une partie</Button>
                                </div>}
                            </CardBody>
                        </Card>
                    </Col>)
                )}
            </Row>
            <Button variant="outline-secondary" className="mt-4" onClick={backToMenu}>Menu</Button>
        </Container>
    );
};
