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
import FormBox from "../components/auth/FormBox";
import AuthLayout from "../components/auth/AuthLayout";
import PageTitle from "../components/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import Separator from "../components/auth/Separator";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import Button from "../components/auth/Button";
import { useLocation } from "react-router";
import FormError from "../components/auth/FormError";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: orange;
`;

function Login() {
  const location =
    useLocation<{ username: string; password: string; message: string }>();
  const { register, handleSubmit, formState, errors, setError, clearErrors } =
    useForm({
      mode: "onChange",
      defaultValues: {
        username: location?.state?.username || "",
        password: location?.state?.password || "",
        result: undefined,
      },
    });
  const clearLoginError = () => {
    clearErrors("result");
  };
  const onCompleted = (data: login) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok && error) {
      setError("result", {
        message: error,
      });
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
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Notification>{location?.state?.message}</Notification>
          <Input
            ref={register({
              required: "Username is required.",
              minLength: {
                value: 2,
                message: "Username should be longer than 2 chars.",
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
            onChange={clearLoginError}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({ required: "Password is required." })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
            onChange={clearLoginError}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}
export default Login;
