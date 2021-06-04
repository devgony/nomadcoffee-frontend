import { logUserIn } from "../apollo";
import { H1 } from "../components/shared";

function Login() {
  return (
    <>
      <H1>Login Page!</H1>
      <button
        onClick={() => {
          logUserIn();
        }}
      >
        Login
      </button>
    </>
  );
}
export default Login;
