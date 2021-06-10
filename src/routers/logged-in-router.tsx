import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Shop from "../components/Shop";
import Add from "../screens/Add";
import Home from "../screens/Home";
import NotFound from "../screens/NotFound";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function LoggedInRouter() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/add" exact>
            <Add />
          </Route>
          <Route path="/shop/:id" exact>
            <Shop />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
