import { styled } from "styled-components";
import HeadBox from "./components/HeadBox";
import "./App.css";
import Main from "./components/Main";
import Bottom from "./components/Bottom";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  return (
    <Wrapper className="App">
      <HeadBox />
      <Main />
      <Bottom />
    </Wrapper>
  );
}

export default App;
