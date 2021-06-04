import { logUserOut } from "../apollo";
import { H1 } from "../components/shared";

function Home() {
  return (
    <>
      <H1>HOME</H1>
      <button
        onClick={() => {
          logUserOut();
        }}
      >
        LOGOUT
      </button>
    </>
  );
}
export default Home;
