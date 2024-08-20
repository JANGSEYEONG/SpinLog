import {
  divider,
  flexBetween,
  flexCenter,
  flexColumnCenter,
  overflowWithoutScroll,
} from '@styles/CommonStyles';
import styled from 'styled-components';
import { CloseBtn } from '@components/button';

import React, { useState, useRef, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useToast from '@hooks/useToast';

import type { ExpenseFilterType } from '@models/expense';

import SelectEmotion from './SelectEmotion';
import SelectPeriod from './SelectPeriod';
import SelectRegister from './SelectRegister';
import SelectSatisfaction from './SelectSatisfaction';

type FilterPopupProps = {
  onClose: () => void;
  prevCondition: ExpenseFilterType;
  updateCondition: (data: ExpenseFilterType) => void;
};

const FilterPopup = ({ onClose, prevCondition, updateCondition }: FilterPopupProps) => {
  const [height, setHeight] = useState<number>(500);
  const resizeRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  // 필터의 설정값들을 모아다가, 적용 버튼 클릭 시 부모에게 돌려준다.
  // 서버로 보내야 할 조건 값들. 필수값은 없음. (비어있는 경우는 모든 조건이 포함된다는 뜻)
  const methods = useForm<ExpenseFilterType>({
    mode: 'onSubmit',
    defaultValues: prevCondition,
  });
  // 현재 필터에서 선택한 조건 상태.
  // 적용을 누를 경우에만 반영해야한다.
  const handleSubmit = (data: ExpenseFilterType) => {
    // from이 to보다 이전 날짜인지 검증
    if (data.from > data.to) {
      showToast('끝 날짜는 시작 날짜보다 앞설 수 없습니다.');
      return;
    }

    console.log(`필터 선택 값: ${JSON.stringify(data)}`);
    updateCondition(data);
    showToast('필터가 적용되었습니다.');
    onClose();
  };

  // 헤더를 마우스로 잡아끄는 높이를 계산하여 모달창의 높이를 구해준다.
  // 40은 헤더 높이때문에 보정값
  const resizing = useCallback((e: MouseEvent | TouchEvent) => {
    const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
    if (resizeRef.current) {
      setHeight(window.innerHeight - clientY - 40);
    }
  }, []);

  // 드래그를 뗐을 때의 모달창 높이로, 새로 지정해준다.
  const stopResize = useCallback(() => {
    document.removeEventListener('mousemove', resizing as EventListener);
    document.removeEventListener('touchmove', resizing as EventListener);
    document.removeEventListener('mouseup', stopResize as EventListener);
    document.removeEventListener('touchend', stopResize as EventListener);

    // 현재 브라우저창이 700px 이하면, 그냥 기본 위치로 리턴시킨다.
    if (window.innerHeight < 700) {
      setHeight(500);
      return;
    }
    const nowHeight = resizeRef.current?.getBoundingClientRect().height;
    if (nowHeight) {
      // 필터창 높이를 500 초과로 잡아끌면 800
      if (nowHeight > 500) {
        setHeight(800);
        return;
      }
      // 200 이상으로 잡아끌면 500
      if (nowHeight > 200) {
        setHeight(500);
        return;
      }
      // 그 이하로 잡아끌면 닫히게 설정.
      onClose();
    }
  }, [resizeRef, resizing, onClose]);

  const startResize = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if ('touches' in e) {
        document.addEventListener('touchmove', resizing as EventListener);
        document.addEventListener('touchend', stopResize as EventListener);
      } else {
        e.preventDefault();
        document.addEventListener('mousemove', resizing as EventListener);
        document.addEventListener('mouseup', stopResize as EventListener);
      }
    },
    [resizing, stopResize],
  );

  return (
    <Container ref={resizeRef} style={{ height: `${height}px` }}>
      <Header
        onMouseDown={startResize as unknown as React.MouseEventHandler<HTMLDivElement>}
        onTouchStart={startResize as unknown as React.TouchEventHandler<HTMLDivElement>}>
        <span className="title">필터</span>
        <Draggable />
        <CloseBtn style={{ width: '15px', height: '15px' }} onClick={onClose} />
      </Header>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Content>
            <SelectPeriod />
            <Divider />
            <SelectRegister />
            <Divider />
            <SelectEmotion />
            <Divider />
            <SelectSatisfaction />
          </Content>
          <ApplyButton>적용</ApplyButton>
        </Form>
      </FormProvider>
    </Container>
  );
};

export default FilterPopup;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 20px 20px 0 0;
  padding: 20px;
  transition: height 0.3s ease-out;
  overflow: hidden;
`;

const Header = styled.header`
  ${flexBetween}
  width: 100%;
  height: 40px;
  cursor: ns-resize;
  flex-shrink: 0;

  & span.title {
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.lightBlack};
  }

  margin-bottom: 30px;
`;

const Form = styled.form`
  ${flexColumnCenter}
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Content = styled.section`
  ${overflowWithoutScroll}
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  & span.sub-title {
    font-size: 16px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.lightBlack};
  }
  & > div {
    flex-shrink: 0;
  }
`;

const ApplyButton = styled.button`
  ${flexCenter}
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  flex-shrink: 0;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.lightGreen};

  color: ${(props) => props.theme.colors.white};
  font-size: 20px;
  font-weight: 700;
`;

const Divider = styled.div`
  ${divider}
`;

const Draggable = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.gray2};
  margin-bottom: 60px;
`;
