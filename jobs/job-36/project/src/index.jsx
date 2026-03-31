import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Picker from './components/Picker/Picker';
import { GlobalStyle } from './assert/GlobalStyle';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const AppWrapper = styled.div`
  height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
`;

ReactDOM.render(
  <StrictMode>
    <GlobalStyle />
    <AppWrapper>
      <Picker />
    </AppWrapper>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();