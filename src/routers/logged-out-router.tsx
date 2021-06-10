import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../screens/Login";
import NotFound from "../screens/NotFound";
import SignUp from "../screens/SignUp";

export default function LoggedOutRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-up" exact>
          <SignUp />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
