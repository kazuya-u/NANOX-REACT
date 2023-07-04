import React from 'react';
import { createGlobalStyle } from 'styled-components';
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
  value: string;
}

const Square: React.FC<SquareProps> = ({value}) => {
  return <button className='square'>{value}</button>;
}

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <div className='board-row"'>
        <Square value='1' />
        <Square value='2' />
        <Square value='3' />
      </div>
      <div className='board-row"'>
        <Square value='4' />
        <Square value='5' />
        <Square value='6' />
      </div>
      <div className='board-row"'>
        <Square value='7' />
        <Square value='8' />
        <Square value='9' />
      </div>
    </>
  );
};

export default App;