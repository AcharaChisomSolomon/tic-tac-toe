import styled from "@emotion/styled";
import React from "react";

import UnstyledButton from "./utils/UnstyledButton";

import IconX from './assets/icon-x.svg'
import IconO from './assets/icon-o.svg'

export default function PlayerChoice() {
  const [playerSymbol, setPlayerSymbol] = React.useState('O');

  return (
    <Wrapper>
      <Title>
        <HeaderImgContaier><img src={IconX} alt="" /></HeaderImgContaier>
        <HeaderImgContaier><img src={IconO} alt="" /></HeaderImgContaier>
      </Title>
      <PlayerChoices>
        <Text>PICK PLAYER 1'S MARK</Text>
        <PlayerSelectors>
          <PlayerSelector 
            isactive={playerSymbol === 'X'} 
            onClick={() => setPlayerSymbol('X')}
          >
            <svg width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>
          </PlayerSelector>
          <PlayerSelector 
            isactive={playerSymbol === 'O'} 
            onClick={() => setPlayerSymbol('O')}
          >
            <svg width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>
          </PlayerSelector>
        </PlayerSelectors>
        <SubText>REMEMBER : X GOES FIRST</SubText>
      </PlayerChoices>
      <GameChoices>
        <CPUGameChoice><span>NEW GAME (VS CPU)</span></CPUGameChoice>
        <PlayerGameChoice><span>NEW GAME (VS PLAYER)</span></PlayerGameChoice>
      </GameChoices>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(32 / 16 * 1rem);
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  gap: calc(8 / 16 * 1rem);
`;

const HeaderImgContaier = styled.div`
  width: 32px;
  height: 32px;
`;

const PlayerChoices = styled.div`
  padding: calc(28 / 16 * 1rem) calc(24 / 16 * 1rem) calc(26 / 16 * 1rem);
  background-color: var(--gray-300);
  border-radius: calc(15 / 16 * 1rem);
  border-bottom: 8px solid #10212a;
  text-align: center;
`;

const Text = styled.p`
  font-size: var(--fs-16);
  font-weight: var(--fw-bold);
  letter-spacing: 1px;
  color: var(--silver-500);
`;

const PlayerSelectors = styled.div`
  margin-block: calc(28 / 16 * 1rem) calc(21 / 16 * 1rem);
  padding: calc(8 / 16 * 1rem);
  background-color: var(--gray-500);
  border-radius: calc(10 / 16 * 1rem);

  display: flex;
`;

const PlayerSelector = styled(UnstyledButton)`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-block: calc(12 / 16 * 1rem);
  border-radius: calc(10 / 16 * 1rem);
  transition: background-color 500ms;

  background-color: ${p => p.isactive && 'var(--silver-500)'};
  svg path {
    fill: ${p => p.isactive ? 'var(--gray-500)' : 'var(--silver-500)'};
  }

  &:hover {
    background-color: ${p => !p.isactive && 'var(--silver-btn-bg-hov)'};
    transition: background-color 250ms;
  }
`;

const SubText = styled.p`
  font-size: var(--fs-14);
  font-weight: var(--fw-medium);
  letter-spacing: 0.88px;
  color: var(--silver-500);
`;

const GameChoices = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(24 / 16 * 1rem);
`;

const GameChoice = styled(UnstyledButton)`
  border-radius: calc(15 / 16 * 1rem);

  span {
    display: block;
    width: 100%;
    text-align: center;
    font-size: var(--fs-16);
    font-weight: var(--fw-bold);
    letter-spacing: 1px;
    color: var(--gray-500);
    padding-block: calc(20 / 16 * 1rem);
    border-radius: calc(15 / 16 * 1rem);
    transform: translateY(-8px);
    transition: transform 500ms;
    transition: background-color 500ms;
  }

  &:hover {
    span {
      transform: translateY(-10px);
      transition: transform 200ms;
      transition: background-color 500ms;
    }
  }

  &:active {
    span {
      transform: translateY(-4px);
      transition: transform 50ms;
    }
  }
`;

const CPUGameChoice = styled(GameChoice)`
  background-color: var(--yellow-300);

  span {
    background-color: var(--yellow-500);
  }

  &:hover {
    background-color: var(--yellow-500);

    span {
      background-color: var(--yellow-300);
    }
  }
`;

const PlayerGameChoice = styled(GameChoice)`
  background-color: var(--blue-300);

  span {
    background-color: var(--blue-500);
  }

  &:hover {
    background-color: var(--blue-500);

    span {
      background-color: var(--blue-300);
    }
  }
`;