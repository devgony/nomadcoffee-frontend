interface IAuthLayout {
  children: React.ReactNode;
}

function Layout({ children }: IAuthLayout) {
  return <>{children}</>;
}

export default Layout;
