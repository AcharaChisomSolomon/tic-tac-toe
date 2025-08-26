import React from "react";
import styled from "@emotion/styled"

import PlayerChoice from "./PlayerChoice";
import Board_ from "./Board";

import { HumanPlayer, AIPlayer } from "./classes/player";
import GameSession from "./classes/gameSession";

function App() {
  const [playerSymbol, setPlayerSymbol] = React.useState('O');
  const [playingAgainstAI, setPlayingAgainstAI] = React.useState(false)
  const [gameSession, setGameSession] = React.useState(null)

  function startGame(val) {
    const againstAI = val;
    setPlayingAgainstAI(againstAI);

    const humanSymbol = playerSymbol;
    let player1, player2;
    if (humanSymbol === "X") {
      player1 = new HumanPlayer("Player 1", "X");
      player2 = againstAI
        ? new AIPlayer("CPU", "O")
        : new HumanPlayer("Player 2", "O");
    } else {
      player1 = againstAI
        ? new AIPlayer("CPU", "X")
        : new HumanPlayer("Player 2", "X");
      player2 = new HumanPlayer("Player 1", "O");
    }
    setGameSession(new GameSession(player1, player2));
  }

  return (
    <Wrapper>
      <Container>

        {!gameSession && (
          <PlayerChoice 
            playerSymbol={playerSymbol}
            setPlayerSymbol={setPlayerSymbol}
            setPlayingAgainstAI={startGame}
          />
        )}

        {gameSession && (
          <Board_
            playerSymbol={playerSymbol}
            playingAgainstAI={playingAgainstAI}
            gameSession={gameSession}
          />
        )}

      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  padding-inline: calc(24 / 16 * 1rem);
  min-height: 100vh;
  display: flex;
`;

const Container = styled.div`
  flex-basis: clamp(20.4375rem, 166.25vw + -41.906rem, 28.75rem);
  margin: auto;
`;

export default App;