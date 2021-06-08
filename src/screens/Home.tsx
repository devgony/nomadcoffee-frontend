import styled from "styled-components";
import { logUserOut } from "../apollo";

const NavBar = styled.div`
  height: 7vh;
  display: flex;
  justify-content: space-around;
`;
const Logo = styled.div`
  background-color: orange;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.div`
  background-color: gray;
  flex: 1;
  border-left: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentLayout = styled.div`
  background-color: lightskyblue;
  height: 93vh;
  margin: 0 auto;
  padding: 1vh;
  max-width: 1000px;
`;

const Content = styled.div`
  background-color: red;
  height: 10vh;
  /* flex-direction: row; */
`;

function Home() {
  return (
    <>
      <NavBar>
        <Logo>NomadCoffee(Home)</Logo>
        <Menu>Admin my Caffe</Menu>
        <Menu>Search around</Menu>
        <Menu>Message</Menu>
        <Menu>Support</Menu>
        <Menu>
          <button
            onClick={() => {
              logUserOut();
            }}
          >
            Logout
          </button>
        </Menu>
      </NavBar>
      <ContentLayout>
        <Content>Caffe Conent1</Content>
      </ContentLayout>
    </>
  );
}
export default Home;
