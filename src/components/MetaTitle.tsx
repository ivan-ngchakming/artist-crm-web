import { Helmet } from "react-helmet-async";

const MetaTitle = ({ title }: { title?: string }) => {
  return (
    <>
      <Helmet>
        <title>{title ? `${title} - ArtistCRM` : "ArtistCRM"}</title>
      </Helmet>
    </>
  );
};

export default MetaTitle;
