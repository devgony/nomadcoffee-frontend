import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";

const Logo = styled.div`
  background-color: orange;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  height: 7vh;
  display: flex;
  justify-content: space-around;
`;

const Menu = styled.div`
  background-color: gray;
  flex: 1;
  border-left: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function NavBar() {
  const history = useHistory();
  return (
    <>
      <Container>
        <Logo>
          <Link to="/">NomadCoffee(Home)</Link>
        </Logo>
        <Menu>
          <Link to="/add">Add</Link>
        </Menu>
        <Menu>Search around</Menu>
        <Menu>Message</Menu>
        <Menu>Support</Menu>
        <Menu>
          <button
            onClick={() => {
              logUserOut();
              history.push("/");
            }}
          >
            Logout
          </button>
        </Menu>
      </Container>
    </>
  );
}
