import Spinner from '@components/information/Spinner';
import { flexCenter } from '@styles/CommonStyles';
import LoadingPortal from '@utils/ui/LoadingPortal';
import styled from 'styled-components';

const LoadingModal = () => {
  return (
    <LoadingPortal>
      <Overlay>
        <Spinner />
      </Overlay>
    </LoadingPortal>
  );
};

export default LoadingModal;

const Overlay = styled.div`
  ${flexCenter}
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.backGroundColor.overlay};
  z-index: 9999;
`;
