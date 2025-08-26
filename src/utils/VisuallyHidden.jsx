import React from 'react';
import styled from '@emotion/styled';

const VisuallyHidden = ({ children, ...delegated }) => {
  const [forceShow, setForceShow] = React.useState(false);

  React.useEffect(() => {
    if (import.meta.env.MODE !== 'production') {
      const handleKeyDown = (ev) => {
        if (ev.key === 'Alt') {
          setForceShow(true);
        }
      };

      const handleKeyUp = () => {
        setForceShow(false);
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return children;
  }

  return <Wrapper {...delegated}> {children} </Wrapper>
};

const Wrapper = styled.span`
  display: block;
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

export default VisuallyHidden;