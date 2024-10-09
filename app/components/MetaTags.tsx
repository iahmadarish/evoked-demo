
import  React from 'react';

type MetaTagsProps = {
  title: string;
  description: string;
  image?: string;
};

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, image }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </>
  );
};

export default MetaTags;
