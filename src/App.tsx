import { createGlobalStyle } from 'styled-components';
import React, { useState } from 'react';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  *, *::after, *::before {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
`;

interface SquareProps {
  value?: string;
}

const Square: React.FC<SquareProps> = ({ value = '' }) => {
  const [squareValue, setSquarevalue] = useState<string | null>(null);
  function handleClick() {
    setSquarevalue('x');
  }
  return (
    <button
     className='square'
     onClick={handleClick}
    >
      {squareValue || value}
    </button>
  )
}

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
};

export default App;