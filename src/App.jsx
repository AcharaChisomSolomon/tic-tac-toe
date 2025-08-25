import styled from "@emotion/styled"

import PlayerChoice from "./PlayerChoice";

function App() {
  return (
    <Wrapper>
      <Container>
        <PlayerChoice />
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