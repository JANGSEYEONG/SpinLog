import { flexCenter } from '@styles/CommonStyles';
import styled, { keyframes } from 'styled-components';

type SpinnerProps = {
  size?: number;
};

const Spinner = ({ size = 50 }: SpinnerProps) => {
  return (
    <SpinnerWrapper>
      <Circle $size={`${size}px`} />
    </SpinnerWrapper>
  );
};

export default Spinner;

// Spinner 스타일 컴포넌트
const SpinnerWrapper = styled.div`
  ${flexCenter}
  width: 100%;
`;
// 애니메이션 정의
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Circle = styled.div<{ $size: string }>`
  border: 8px solid ${(props) => props.theme.colors.transparentBlack}; // 회색 테두리
  border-top: 8px solid ${(props) => props.theme.colors.lightGreen}; // 파란색 상단 테두리
  border-radius: 50%;
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  animation: ${spin} 2s linear infinite;
`;
