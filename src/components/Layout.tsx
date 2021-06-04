import { useReactiveVar } from "@apollo/client";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";

interface IAuthLayout {
  children: React.ReactNode;
}

function Layout({ children }: IAuthLayout) {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <>
      {children}
      <button
        onClick={() => {
          darkMode ? disableDarkMode() : enableDarkMode();
        }}
      >
        Toggle Darkmode
      </button>
    </>
  );
}

export default Layout;
