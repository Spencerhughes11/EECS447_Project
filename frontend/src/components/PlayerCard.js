import React from "react";
import {Container} from 'reactstrap';

export default function PlayerCard({ player }) {
    console.log(player)
    return (
        <Container className="player-card">
            <h2>{player}</h2>
            {/* Display player's stats here */}
            <p>Points: {56}</p>
            <p>Rebounds: {12}</p>
            <p>Assists: {11}</p>
            {/* Add more stats as needed */}
        </Container>
    );
}
