import React from "react";
import styled from "@emotion/styled";

import Choices from "./Choices";

import UnstyledButton from "./utils/UnstyledButton";
import IconX from './assets/icon-x.svg'
import IconXOutline from './assets/icon-x-outline.svg'
import IconO from './assets/icon-o.svg'
import IconOOutline from './assets/icon-o-outline.svg'

import { SCORE_TAGS } from "./utils/constants";

import Board from "./classes/board";
import Game from "./classes/game";

export default function Board_({
  playerSymbol,
  playingAgainstAI,
  gameSession,
  setGameSession
}) {
  const [round] = React.useState(gameSession.startNewRound(Board, Game));
  const [firstMoveMade, setFirstMoveMade] = React.useState(false)
  const [showResetChoice, setShowResetChoice] = React.useState(false)
  const [_, setMoveCount] = React.useState(0);
  const { scores } = gameSession;

  React.useEffect(() => {
    if (round.currentPlayer.isAI && !round.isOver && !firstMoveMade) {
      setTimeout(() => {
        round.makeMove();
        setMoveCount(c => c + 1);
        setFirstMoveMade(true)
      }, 300);
    }
  });

  function handleTileClick(id) {
    if (round.board.grid[id] || round.isOver) return;
    round.makeMove(id);
    setMoveCount(c => c + 1);

    if (round.isOver) {
      gameSession.updateScores(round.getWinner());
      setShowResetChoice(true)
    }

    if (
      playingAgainstAI &&
      !round.isOver &&
      round.currentPlayer.isAI
    ) {
      setTimeout(() => {
        round.makeMove();
        setMoveCount(c => c + 1);
        if (round.isOver) {
          gameSession.updateScores(round.getWinner());
          setShowResetChoice(true)
        }
      }, 300);
    }
  }

  return (
    <div>

      <Header>
        <Title>
          <HeaderImgContaier><img src={IconX} alt="" /></HeaderImgContaier>
          <HeaderImgContaier><img src={IconO} alt="" /></HeaderImgContaier>
        </Title>
        <DisplayTurn>
          <div>
            {round.currentPlayer.symbol === 'X' && <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>}
            {round.currentPlayer.symbol === 'O' && <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>}
          </div>
          <span>TURN</span>
        </DisplayTurn>
        <RestartBtn onClick={() => {
          setShowResetChoice(true)
        }}>
          <span>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.524 0h-1.88a.476.476 0 0 0-.476.499l.159 3.284A9.81 9.81 0 0 0 9.835.317C4.415.317-.004 4.743 0 10.167.004 15.597 4.406 20 9.835 20a9.796 9.796 0 0 0 6.59-2.536.476.476 0 0 0 .019-.692l-1.348-1.349a.476.476 0 0 0-.65-.022 6.976 6.976 0 0 1-9.85-.63 6.987 6.987 0 0 1 .63-9.857 6.976 6.976 0 0 1 10.403 1.348l-4.027-.193a.476.476 0 0 0-.498.476v1.881c0 .263.213.476.476.476h7.944A.476.476 0 0 0 20 8.426V.476A.476.476 0 0 0 19.524 0Z" fill="#1F3641"/></svg>
          </span>
        </RestartBtn>
      </Header>

      <Tiles>
        {round.board.grid.map((s, id) => (
          <Tile
            key={id}
            disabled={!!s || round.isOver}
            onClick={() => handleTileClick(id)}
          >
            <div>
              {s && (
                <img
                  src={s === 'X' ? IconX : IconO}
                  alt=""
                />
              )}
              {s === null && !round.isOver && (
                <img
                  className="hover"
                  src={round.currentPlayer.symbol === 'X' ? IconXOutline : IconOOutline}
                  alt=""
                />
              )}
            </div>
          </Tile>
        ))}
      </Tiles>

      <Stats>
        <StatX>
          <Text>X ({
            'X' === playerSymbol 
            ? SCORE_TAGS[playingAgainstAI]['starter'] 
            : SCORE_TAGS[playingAgainstAI]['other']
            })</Text>
          <SubText>{scores.X}</SubText>
        </StatX>
        <StatTies>
          <Text>TIES</Text>
          <SubText>{scores.ties}</SubText>
        </StatTies>
        <StatO>
          <Text>O ({
            'O' === playerSymbol 
            ? SCORE_TAGS[playingAgainstAI]['starter'] 
            : SCORE_TAGS[playingAgainstAI]['other']
            })</Text>
          <SubText>{scores.O}</SubText>
        </StatO>
      </Stats>

      {showResetChoice && (
        <Choices 
          isOpen={showResetChoice}
          onDismiss={() => setShowResetChoice(false)}
          round={round}
          playingAgainstAI={playingAgainstAI}
          playerSymbol={playerSymbol}
          setGameSession={setGameSession}
          setMoveCount={setMoveCount}
          setFirstMoveMade={setFirstMoveMade}
        />
      )}

    </div>
  )
}

const Header = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto 1fr;
  margin-block-end: calc(32 / 16 * 1rem);
`;

const Title = styled.div`
  display: flex;
  gap: calc(8 / 16 * 1rem);
`;

const HeaderImgContaier = styled.div`
  width: 32px;
  height: 32px;
`;

const DisplayTurn = styled.div`
  font-weight: var(--fw-bold);
  color: var(--silver-500);
  background-color: var(--gray-300);
  border-radius: calc(10 / 16 * 1rem);
  width: clamp(6rem, 55vw + -14.625rem, 8.75rem);
  border-bottom: calc(4 / 16 * 1rem) solid hsl(201, 45%, 11%);

  display: flex;
  justify-content: center;
  gap: 0.75rem;
  padding-block: 1rem;

  svg {
    width: clamp(1rem, 5vw + -0.875rem, 1.25rem);
    height: clamp(1rem, 5vw + -0.875rem, 1.25rem);

    path {
      fill: var(--silver-500);
    }
  }
`;

const RestartBtn = styled(UnstyledButton)`
  background-color: #979797;
  justify-self: end;
  border-radius: calc(5 / 16 * 1rem);

  span {
    background-color: var(--silver-500);
    width: clamp(2.5rem, 15vw + -3.125rem, 3.25rem);
    height: clamp(2.5rem, 15vw + -3.125rem, 3.25rem);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: calc(5 / 16 * 1rem);
    transform: translateY(-4px);
  }

  &:hover {
    span {
      transform: translateY(-8px);
      background-color: var(--silver-300);
    }
  }

  &:active {
    span {
      transform: translateY(-2px);
    }
  }
`;

const Tiles = styled.div`
  display: grid;
  gap: calc(28 / 16 * 1rem) calc(20 / 16 * 1rem);
  grid-template-columns: auto auto auto;
`;

const Tile = styled(UnstyledButton)`
  border-radius: calc(10 / 16 * 1rem);
  background-color: hsl(201, 45%, 11%);

  .hover {
    display: none;
  }

  div {
    width: clamp(6rem, 55vw + -14.625rem, 8.75rem);
    height: clamp(6rem, 55vw + -14.625rem, 8.75rem);
    background-color: var(--gray-300);
    border-radius: calc(10 / 16 * 1rem);
    transform: translateY(-8px);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: clamp(2.5rem, 30vw + -8.75rem, 4rem);
      height: clamp(2.5rem, 30vw + -8.75rem, 4rem);
    }
  }

  &:hover, &:focus {
    .hover {
      display: revert;
    }
  }

  &:active {
    div {
      transform: translateY(-4px);
    }
  }
`;

const Stats = styled.div`
  display: grid;
  gap: calc(20 / 16 * 1rem);
  grid-template-columns: auto auto auto;
  margin-block-start: 1rem;
`;

const Stat = styled.div`
  text-align: center;
  color: var(--gray-500);
  padding-block: calc(16 / 16 * 1rem);
  width: clamp(6rem, 55vw + -14.625rem, 8.75rem);
  border-radius: calc(15 / 16 * 1rem);
`;

const StatX = styled(Stat)`
  background-color: var(--blue-500);
`;

const StatTies = styled(Stat)`
  background-color: var(--silver-500);
`;

const StatO = styled(Stat)`
  background-color: var(--yellow-500);
`;

const Text = styled.p`
  font-size: var(--fs-14);
  letter-spacing: 0.88px;
`;

const SubText = styled.p`
  font-size: var(--fs-24);
  font-weight: var(--fw-bold);
`;