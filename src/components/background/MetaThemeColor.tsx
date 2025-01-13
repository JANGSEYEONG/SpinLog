import { useTheme } from 'styled-components';

import { Helmet } from 'react-helmet-async';

interface MetaThemeColorProps {
  isBackgroundGreen?: boolean;
}
const MetaThemeColor = ({ isBackgroundGreen = false }: MetaThemeColorProps) => {
  const theme = useTheme();
  return (
    <Helmet>
      <meta
        name="theme-color"
        content={isBackgroundGreen ? theme.colors.lightGreen : theme.backgroundColor.layout}
      />
    </Helmet>
  );
};

export default MetaThemeColor;
