import { EditBtn } from '@components/button';
import Spinner from '@components/information/Spinner';
import VoiceMultiText from '@components/input/VoiceMultiText';
import Modal from '@components/modal';
import { getEmotionIcon, getEmotionText } from '@models/emotion';
import type { EmotionKey } from '@models/index';
import {
  addPageContainer,
  addPageSubject,
  flexCenter,
  flexColumnCenter,
  overflowWithoutScroll,
  summaryArea,
} from '@styles/CommonStyles';
import { getSpendSumamryText } from '@utils/textsUtils';
import { lazyWithRetries } from 'src/routes/lazyWithRetries';
import styled, { css } from 'styled-components';

import { Suspense, useEffect, useReducer, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// import EmotionPopup from './EmotionPopup';
const EmotionPopup = lazyWithRetries(() => import('./EmotionPopup'));

// 사건, 생각, 감정
const WriteEmotion = () => {
  const { register, getValues, setValue } = useFormContext();

  const summaryText = getSpendSumamryText(
    ...getValues(['spendDate', 'content', 'amount', 'registerType']),
  );

  const emotionKey = getValues('emotion'); // emotionKey는 빈 값일 수 있다.

  const [isSelectEmotion, setIsSelectEmotion] = useState<boolean>(false);
  const [emotionText, setEmotionText] = useState<string>('없음');
  const [EmotionSVG, setEmotionSVG] = useState<React.ComponentType | null>(null);
  const [showModal, toggleModal] = useReducer((state) => !state, false);

  // 활성화된 음성 인식 필드 상태
  const [activeListeningField, setActiveListeningField] = useState<string | null>(null);

  const selectEmotion = (emotion: EmotionKey) => {
    setValue('emotion', emotion, { shouldValidate: true });
    updateEmotionState(emotion);
    toggleModal();
  };

  const updateEmotionState = (key: EmotionKey) => {
    setIsSelectEmotion(true);
    setEmotionText(getEmotionText(key));
    setEmotionSVG(getEmotionIcon(key));
  };

  useEffect(() => {
    if (emotionKey) {
      updateEmotionState(emotionKey);
    }
  }, [emotionKey]);

  return (
    <>
      <Container>
        <Subject>그 때 사건과 생각을 말해주세요</Subject>
        <Summary>{summaryText}</Summary>
        <EventContainer>
          <VoiceMultiText
            hookFormFieldName="event"
            title="사건"
            placeholder="예) 부장님이 소리 지름"
            activeListeningField={activeListeningField}
            setActiveListeningField={setActiveListeningField}
          />
        </EventContainer>
        <ThoughtContainer>
          <VoiceMultiText
            hookFormFieldName="thought"
            title="생각"
            placeholder="예) 별 일도 아닌데 왜저래?.."
            activeListeningField={activeListeningField}
            setActiveListeningField={setActiveListeningField}
          />
        </ThoughtContainer>
        <EmotionContainer>
          {/* 필수값 */}
          <Subject>
            느낀 감정 1가지를 선택해주세요
            <span className="required">* 필수</span>
          </Subject>
          <HiddenInput {...register('emotion', { required: true })} />
          <Emotion>
            {!isSelectEmotion ? (
              <>
                <EmotionAddBtn onClick={toggleModal} />
                <span className="select">감정 선택</span>
              </>
            ) : (
              <>
                <EmotionEditBtn onClick={toggleModal}>
                  <EditBtn />
                </EmotionEditBtn>
                {EmotionSVG && <EmotionSVG />}
                <EmotionText>{emotionText}</EmotionText>
              </>
            )}
          </Emotion>
        </EmotionContainer>
      </Container>
      {showModal && (
        <Suspense fallback={<Spinner />}>
          <Modal onClose={toggleModal}>
            <EmotionPopup
              defaultEmotion={emotionKey}
              selectEmotion={selectEmotion}
              onClose={toggleModal}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default WriteEmotion;

const Container = styled.div`
  ${flexColumnCenter}
  justify-content: flex-start;
  ${overflowWithoutScroll}
  ${addPageContainer}
`;
const Subject = styled.h1`
  ${addPageSubject}
  width: 100%;

  & span.required {
    margin-left: 5px;
    color: ${(props) => props.theme.colors.orange};
    font-size: 12px;
    font-weight: 400;
  }
`;
const Summary = styled.div`
  ${summaryArea}
`;

const EventContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 20px;
`;
const ThoughtContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;
const EmotionContainer = styled.div`
  ${flexColumnCenter}
  align-items: flex-start;
  width: 100%;
`;

const EmotionBorder = css`
  border-radius: 50%;
  border: 1px dashed ${(props) => props.theme.colors.gray2};
`;

const Emotion = styled.div`
  ${flexColumnCenter}
  ${EmotionBorder}
  position: relative;

  width: 120px;
  height: 120px;

  background-color: ${(props) => props.theme.colors.white};

  & span.select {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 300;
    color: ${(props) => props.theme.colors.darkLightGray};
  }
`;

const buttonStyle = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.lightGray};
  transition: background-color 0.2s ease-out;
  &:hover {
    filter: brightness(105%);
  }
`;

const EmotionEditBtn = styled.div`
  ${buttonStyle}
  ${flexCenter}

  position: absolute;
  top: 0;
  right: 0;
`;

const EmotionAddBtn = styled.div`
  ${buttonStyle}

  // + 그리기
  position: relative;
  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: ${(props) => props.theme.colors.darkLightGray}; // + 기호의 색상
    border-radius: 10px;

    // 중앙 정렬
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    width: 10px; /* 가로 막대의 너비 */
    height: 2px; /* 가로 막대의 높이 */
  }

  &::after {
    width: 2px; /* 세로 막대의 너비 */
    height: 10px; /* 세로 막대의 높이 */
  }
`;

const EmotionText = styled.div`
  ${flexCenter}
  position: absolute;
  color: ${(props) => props.theme.colors.white};
  font-size: 12px;
  font-weight: 700;
  bottom: 10px;
`;

const HiddenInput = styled.input.attrs({ type: 'text' })`
  opacity: 0;
  position: absolute;
`;
