import useIsDemoMode from '@hooks/useIsDemo';
import { useTheme } from 'styled-components';

type DemoTextProps = {
  isBackgroundGreen?: boolean;
};

const DemoText = ({ isBackgroundGreen = false }: DemoTextProps) => {
  const theme = useTheme();
  const isDemoMode = useIsDemoMode();

  return isDemoMode ? (
    <span
      style={{
        fontSize: '12px',
        color: isBackgroundGreen ? theme.colors.white : theme.colors.lightGreen,
      }}>
      {' '}
      (체험중)
    </span>
  ) : null;
};

export default DemoText;
