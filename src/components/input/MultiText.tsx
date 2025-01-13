import { XIcon } from '@components/icon';
import { textArea, textAreaWrapper } from '@styles/CommonStyles';
import styled from 'styled-components';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

type MultiTextProps = {
  hookFormFieldName: string;
  title?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisable?: boolean;
};

const MultiText = ({
  hookFormFieldName,
  title = '내용',
  placeholder = '',
  isRequired = false,
  isDisable = false,
}: MultiTextProps) => {
  const { register, watch, setValue } = useFormContext();

  const textValue = watch(hookFormFieldName); // 'message' 필드의 현재 값을 실시간으로 관찰
  const maxLength = 150; // #20240508.syjang, DB 용량 문제로 150자 제한으로 변경

  // 입력값 전체삭제
  const handleDeleteAll = () => {
    setValue(hookFormFieldName, '', { shouldValidate: true });
  };

  // 높이 재설정을 위해 onInput 이벤트 trigger
  useEffect(() => {
    const textarea = document.querySelector(`[name="${hookFormFieldName}"]`);
    if (textarea) {
      const event = new Event('input', { bubbles: true });
      textarea.dispatchEvent(event);
    }
  });
  return (
    <TextAreaWrapper>
      <span className="title">{title}</span>
      <span style={{ display: 'flex', width: '100%', height: '100%' }}>
        <TextArea
          onInput={(event) => {
            const target = event.target as HTMLTextAreaElement;
            target.style.height = 'auto'; // Reset the height
            target.style.height = `${target.scrollHeight}px`;
          }}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={isDisable}
          {...register(hookFormFieldName, { required: isRequired })}
        />
        {!isDisable && <DeleteAllButton onClick={handleDeleteAll} />}
      </span>
      <span className="count">{`${textValue?.length || 0}/${maxLength}`}</span>
    </TextAreaWrapper>
  );
};

export default MultiText;

const TextAreaWrapper = styled.div`
  ${textAreaWrapper}
  &:hover svg,
  &:focus svg {
    opacity: 1; // 호버되거나 포커스될 때 보이기
  }
`;

const TextArea = styled.textarea`
  ${textArea};
`;

const DeleteAllButton = styled(XIcon)`
  width: 15px;
  height: 15px;
  padding: 3px;

  border-radius: 50%;

  opacity: 0; // 기본적으로 숨김처리
  transition: opacity 0.2s ease-in-out; // 페이드 인/아웃 효과

  color: ${(props) => props.theme.colors.white};

  background-color: ${(props) => props.theme.colors.gray2};
`;
