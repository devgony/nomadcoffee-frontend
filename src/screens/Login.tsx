import { gql, useMutation, useReactiveVar } from "@apollo/client";
import {
  disableDarkMode,
  enableDarkMode,
  isLoggedInVar,
  darkModeVar,
  logUserIn,
} from "../apollo";
import Input from "../components/auth/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, loginVariables } from "../__generated__/login";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const darkMode = useReactiveVar(darkModeVar);
  const { register, handleSubmit } = useForm();
  const onCompleted = (data: login) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok && error) {
      console.log(error);
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading, data }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    { onCompleted }
  );
  const onSubmitValid: SubmitHandler<loginVariables> = data => {
    if (loading) {
      return;
    }
    const { username, password } = data;
    login({
      variables: { username, password },
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input
          ref={register({ required: "Username is required." })}
          name="username"
          type="text"
          placeholder="Username"
        />
        <Input
          ref={register({ required: "Password is required." })}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button>Log in now!</button>
        <button onClick={darkMode ? disableDarkMode : enableDarkMode}>
          DarkMode
        </button>
      </form>
    </>
  );
}
export default Login;
