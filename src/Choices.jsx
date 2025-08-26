import styled from "@emotion/styled"
import * as Dialog from "@radix-ui/react-dialog"

import VisuallyHidden from "./utils/VisuallyHidden"
import IconX from './assets/icon-x.svg'
import IconO from './assets/icon-o.svg'

export default function Choices({
  isOpen,
  onDismiss,
  round,
  playingAgainstAI,
  playerSymbol,
  setGameSession,
  setMoveCount,
  setFirstMoveMade
}) {
  const handleLeftBtn = () => {
    if (round.isOver) {
      handleQuitting()
    }
    onDismiss()
  }

  const handleRightBtn = () => {
    round.start()
    setMoveCount(c => c + 1)
    setFirstMoveMade(false)
    onDismiss()
  }

  const handleQuitting = () => {
    setGameSession(null)
  }


  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>
            <VisuallyHidden>Game Over</VisuallyHidden>
          </Dialog.Title>
          <Dialog.Description>
            <VisuallyHidden>
              The game has ended. choose your next action.
            </VisuallyHidden>
          </Dialog.Description>

          <Container>
            <span>
              {round.isOver && (round.winner ? (
                <span>
                  <WinStatus>
                    {playingAgainstAI && (playerSymbol === round.winner.symbol ? 'YOU WON!' : 'OH NO, YOU LOST...')}
                    {!playingAgainstAI && (round.winner.symbol === 'X' ? 'PLAYER 1 WINS!' : 'PLAYER 2 WINS!')}
                  </WinStatus>
                  <SymbolHighLight>
                    <img src={round.winner.symbol === 'X' ? IconX : IconO} alt="" />
                    <HighLightedH1 color={round.winner.symbol === 'X'}>TAKES THE ROUND</HighLightedH1>
                  </SymbolHighLight>
                </span>
              ) : <h1>ROUND TIED</h1>)}
              {!round.isOver && <h1>RESTART GAME?</h1>}
            </span>
            <Btns>
              <LeftBtn onClick={handleLeftBtn}><span>{round.isOver ? 'QUIT' : 'NO, CANCEL'}</span></LeftBtn>
              <RightBtn onClick={handleRightBtn}><span>{round.isOver ? 'NEXT ROUND' : 'YES, RESTART'}</span></RightBtn>
            </Btns>
          </Container>

        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const Overlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, .5);
	position: fixed;
	inset: 0;
	animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  
`;

const Container = styled.span`
  display: block;
  height: clamp(14.25rem, 21.714vw + 9.161rem, 16.625rem);
  display: grid;
  place-content: center;
  transform: translateY(-50%);
  width: 100vw;
  background-color: var(--gray-500);
`;

const WinStatus = styled.p`
text-align: center;
  font-size: var(--fs-16);
  color: var(--silver-500);
  letter-spacing: 1px;
`;

const SymbolHighLight = styled.span`
  display: flex;
  gap: clamp(0.5rem, 4.571vw + -0.571rem, 1rem);
  align-items: center;

  img {
    width: clamp(2rem, 18.286vw + -2.286rem, 4rem);
  }
`;

const HighLightedH1 = styled.h1`
  color: ${p => p.color ? 'var(--blue-500)' : 'var(--yellow-500)'};
`;

const Btns = styled.span`
  display: block;
  margin: 0 auto;
  margin-block-start: clamp(1.875rem, 5.714vw + 0.536rem, 2.5rem);
`;

const Btn = styled(Dialog.Close)`
  cursor: pointer;
  padding: 0;
  border: none;
  border-radius: calc(10 / 16 * 1rem);
  /* border-bottom: 8px solid var(--silver-btn-bg-hov); */

  span {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: var(--fs-16);
    font-weight: var(--fw-bold);
    border-radius: calc(10 / 16 * 1rem);
    height: calc(52 / 16 * 1rem);
    padding-inline: calc(16 / 16 * 1rem);
  }
`;

const LeftBtn = styled(Btn)`
  margin-inline-end: calc(16 / 16 * 1rem);
  span {
    background-color: var(--blue-500);
  }

  &:hover {
    span {
      background-color: var(--blue-300);
    }
  }
`;

const RightBtn = styled(Btn)`
  background-color: var(--yellow-500);

  &:hover {
    span {
      background-color: var(--yellow-300);
    }
  }
`;