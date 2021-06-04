import { logUserOut } from "../apollo";

function Home() {
  return (
    <>
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
