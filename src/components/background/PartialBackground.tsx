import BackgroundPortal from '@utils/ui/BackgroundPortal';
import styled from 'styled-components';

type PartialBackgroundProps = {
  height: string;
};

const PartialBackground = ({ height = '100%' }: PartialBackgroundProps) => {
  return (
    <BackgroundPortal>
      <Overlay $height={height} />
    </BackgroundPortal>
  );
};

export default PartialBackground;

const Overlay = styled.div<{ $height: string }>`
  position: absolute;
  width: 100%;
  height: ${(props) => props.$height};
  top: 0;
  left: 0;
  background: ${(props) => props.theme.colors.lightGreen};
  z-index: -1;
`;
