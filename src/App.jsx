import { styled } from "styled-components";
import "./App.css";
import Main from "./components/Layout/Main";
import Bottom from "./components/Layout/Bottom";
import Top from "./components/Layout/Top";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  return (
    <Wrapper className="App">
      <Top />
      <Main />
      <Bottom />
    </Wrapper>
  );
}

export default App;
