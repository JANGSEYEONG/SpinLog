import styled, { keyframes } from 'styled-components';
import { flexCenter } from '@styles/CommonStyles';
import { MikeBtn } from '@components/button';

import useVoiceMultiText from '@hooks/useVoiceMutlText';
import MultiText from './MultiText';

import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

// react hook form + FormProvider 전용
// 한 페이지 내에서 여러개의 VoiceMultiText를 사용할 경우, ActiveListeningField를 넘겨 한번에 하나만 동작하게 해야함.
type VoiceMultiTextProps = {
  hookFormFieldName: string;
  title?: string;
  placeholder?: string;
  isRequired?: boolean;
  activeListeningField?: string | null;
  setActiveListeningField?: (fieldName: string | null) => void;
};

const VoiceMultiText = ({
  hookFormFieldName,
  title = '내용',
  placeholder = '',
  isRequired = false,
  activeListeningField = null,
  setActiveListeningField,
}: VoiceMultiTextProps) => {
  const { getValues, setValue } = useFormContext();

  const handleVoiceResult = (result: string) => {
    const currentValue = getValues(hookFormFieldName);
    setValue(hookFormFieldName, currentValue ? `${currentValue} ${result}` : result);
  };

  // 필드 별로 생성 필요함
  const [startListen, isListening, stopListen] = useVoiceMultiText(handleVoiceResult);

  const handleVoiceClick = () => {
    try {
      if (activeListeningField && activeListeningField !== hookFormFieldName) {
        alert('다른 필드가 음성 인식 중입니다.');
        return;
      }
      if (isListening) {
        stopListen();
        // 활성화 field 이름 초기화
        if (setActiveListeningField) setActiveListeningField(null);
      } else {
        startListen({ lang: 'ko', interimResults: false });
        // 활성화 field 이름 update
        if (setActiveListeningField) setActiveListeningField(hookFormFieldName);
      }
    } catch (err) {
      console.error(`음성 인식 오류: ${err}`);
      stopListen();
    }
  };

  useEffect(() => {
    // unmount 시 recognize stop 필요
    return () => {
      stopListen();
    };
  }, [stopListen]);

  return (
    <Container>
      <MultiText
        hookFormFieldName={hookFormFieldName}
        title={title}
        placeholder={placeholder}
        isRequired={isRequired}
        isDisable={false}
      />
      <VoiceButton $listening={isListening} onClick={handleVoiceClick}>
        {isListening ? (
          <>
            <Bar $delay={0} />
            <Bar $delay={0.2} />
            <Bar $delay={0.4} />
            <Bar $delay={0.6} />
            <Bar $delay={0.8} />
          </>
        ) : (
          <MikeBtn />
        )}
      </VoiceButton>
    </Container>
  );
};
export default VoiceMultiText;

const Container = styled.div`
  ${flexCenter}
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const VoiceButton = styled.div<{ $listening: boolean }>`
  ${flexCenter}
  justify-content: space-around;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 6px;
  border-radius: 6px;
  background-color: ${(props) =>
    props.$listening ? props.theme.colors.lightGreen : props.theme.colors.lightGray};
  box-shadow: ${(props) => props.theme.shadows.around};
  &:hover {
    filter: brightness(102%);
  }
`;

// 음성 인식 애니메이션 정의
const pulse = keyframes`
  0%, 100% { height: 10px; }
  50% { height: 20px; }
`;

// 음석 인식 중 개별 막대 스타일
const Bar = styled.div<{ $delay: number }>`
  width: 5px;
  height: 9px;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.white};
  animation: ${pulse} 1s infinite ease-in-out;
  animation-delay: ${(props) => props.$delay}s;
`;
