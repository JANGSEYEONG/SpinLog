import { Helmet } from 'react-helmet-async';

const MetaThemeColor = ({ color }: { color: string }) => {
  return (
    <Helmet>
      <meta name="theme-color" content={color} />
    </Helmet>
  );
};

export default MetaThemeColor;
