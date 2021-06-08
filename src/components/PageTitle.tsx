import { Helmet } from "react-helmet-async";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Nomadcoffee</title>
    </Helmet>
  );
};

export default PageTitle;
