import { useMutation } from "@apollo/client";
import { removeArgumentsFromDocument } from "@apollo/client/utilities";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $location: String!
    $password: String!
    $avatarURL: String
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      location: $location
      password: $password
      avatarURL: $avatarURL
    ) {
      ok
      error
    }
  }
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

function SignUp() {
  const history = useHistory();
  const clearSignUpError = () => {
    clearErrors("result");
  };
  const onCompleted = (data: createAccount) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok && error) {
      setError("result", {
        message: error,
      });
      return;
    }
    history.push({
      pathname: routes.home,
      state: {
        message: "Account created. Please log in.",
        username,
        password,
      },
    });
  };
  const [createAccount, { loading, data }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    watch,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const onSubmitValid: SubmitHandler<createAccountVariables> = data => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <Subtitle>Sign up to find the best caffes to work.</Subtitle>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "username is required.",
            })}
            name="username"
            type="text"
            placeholder="username"
            hasError={Boolean(errors?.username?.message)}
            onChange={clearSignUpError}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "email is required.",
            })}
            name="email"
            type="text"
            placeholder="email"
            hasError={Boolean(errors?.email?.message)}
            onChange={clearSignUpError}
          />
          <FormError message={errors?.email?.message} />
          <Input
            ref={register({
              required: "name is required.",
            })}
            name="name"
            type="text"
            placeholder="name"
            hasError={Boolean(errors?.name?.message)}
            onChange={clearSignUpError}
          />
          <FormError message={errors?.name?.message} />
          <Input
            ref={register({
              required: "location is required.",
            })}
            name="location"
            type="text"
            placeholder="location"
            hasError={Boolean(errors?.location?.message)}
            onChange={clearSignUpError}
          />
          <FormError message={errors?.location?.message} />
          <Input
            ref={register({
              required: "password is required.",
            })}
            name="password"
            type="password"
            placeholder="password"
            hasError={Boolean(errors?.password?.message)}
            onChange={clearSignUpError}
          />
          <FormError message={errors?.password?.message} />
          <Input
            ref={register()}
            name="avatarURL"
            type="text"
            placeholder="avatarURL"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}
export default SignUp;
