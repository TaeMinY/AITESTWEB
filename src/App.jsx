import "./App.css";
import { Outlet } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    font-family: "Noto Sans KR", sans-serif;
    box-sizing: border-box;
  }
`;

const AppContainer = styled.div`
  height: 100vh;
  max-width: 360px;
  width: 360px;
  margin: 0 auto;
`;

function App() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <AppContainer>
        <Outlet />
      </AppContainer>
    </>
  );
}

export default App;
