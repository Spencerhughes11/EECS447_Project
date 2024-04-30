import React from "react";
import {Container, Card, CardBody, CardText, CardHeader, CardTitle} from 'reactstrap';

export default function PlayerCard({ player }) {
    // console.log(player);
    return (
        <Container className="player-card">
            <Card
            className="my-2"
            color="secondary"
            inverse
            style={{
            width: '18rem'
            }}
        >
                <CardHeader>
                    <CardTitle tag="h5">
                        { player} | (Team)    
                    </CardTitle>
                </CardHeader>
                <CardBody> 
                    <CardText>
                    Points: {56}
                    </CardText>
                    <CardText>
                    Rebounds: {12} 
                    </CardText>
                    <CardText>
                    Assists: {11}
                    </CardText>
                </CardBody>
            </Card>
        </Container>
    );
}
