import BackgroundPortal from '@utils/ui/BackgroundPortal';
import styled from 'styled-components';

type BackgroundProps = {
  height: string;
};

const Background = ({ height = '100%' }: BackgroundProps) => {
  return (
    <BackgroundPortal>
      <Overlay $height={height} />
    </BackgroundPortal>
  );
};

export default Background;

const Overlay = styled.div<{ $height: string }>`
  position: absolute;
  width: 100%;
  height: ${(props) => props.$height};
  top: 0;
  left: 0;
  background: ${(props) => props.theme.colors.lightGreen};
  z-index: -1;
`;
