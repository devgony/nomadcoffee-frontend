import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout";
import { HelmetProvider } from "react-helmet-async";
import SignUp from "./screens/SignUp";
import LoggedOutRouter from "./routers/logged-out-router";
import LoggedInRouter from "./routers/logged-in-router";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
