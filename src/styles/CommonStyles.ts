// styles/CommonStyles.js
import { css } from 'styled-components';

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexColumnCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const flexBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const flexColumnBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const mainSection = css`
  background-color: ${(props) => props.theme.backgroundColor.contentBox};
  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadows.under};
  display: flex;
  padding: 15px;
`;

export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const overflowWithoutScroll = css`
  overflow: auto;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const addPageContainer = css`
  ${overflowWithoutScroll}
  overflow: auto;
  width: 100%;
  height: 100%;
  padding: 15px;
`;
export const addPageSubject = css`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.lightBlack};
  height: 40px;
`;

export const borderCheck = css`
  content: '';
  position: absolute;
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid;
  border-width: 0 3px 3px 0;
  border-radius: 2px;
  transform: rotate(45deg);
  border-color: #bbb; // 회색 체크 마크
`;

export const textAreaWrapper = css`
  ${mainSection}
  ${flexColumnCenter}
  justify-content: flex-start;
  padding: 14.5px 16px 2px 16px;
  width: 100%;
  height: 100%;
  gap: 5px;

  & span.title {
    font-size: 12px;
    font-weight: 300;
    color: #9f9f9f;
    width: 100%;
    flex-shrink: 0;
  }

  & span.count {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 10px;
    font-weight: 400;
    color: #9f9f9f;
    width: 100%;
    flex-shrink: 0;
    margin-bottom: 3px;
  }
`;

export const textArea = css`
  width: 100%;
  height: auto;
  border: none;
  resize: none;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #bcbcbc;
  }

  &:disabled {
    background-color: #ffffff;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const summaryArea = css`
  ${mainSection}
  ${flexCenter}
  width: 100%;
  height: 50px;

  padding: 15px 29px 15px 29px;

  color: #ffffff;
  background-color: #767676;

  font-weight: 600;
  font-size: 14px;
`;

export const divider = css`
  border: none;
  width: 100%;
  height: 1px;
  background-color: #dddddd;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const radioButtonStyle = css`
  appearance: none;
  width: 24px;
  height: 24px;

  margin: 0;
  margin-bottom: 10px;

  border: 2px solid gray;
  border-radius: 50%;

  cursor: pointer;

  position: relative;
  background: #e3e3e3;
  border: none;

  &:checked {
    background-color: #767676;
    border: none;
  }
  &::after {
    ${borderCheck}
    left: 8px;
    top: 4px;
    border-color: #fff;
  }
`;

export const radioButtonLabelStyle = css`
  font-size: 14px;
  font-weight: 500;
  color: #bcbcbc;
  cursor: pointer;

  &.selected {
    color: #333331;
    font-weight: 700;
  }
`;
