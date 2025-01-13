import { css } from 'styled-components';

export const commonButtonStyle = css`
  transition: transform 0.3s;
  cursor: pointer;
  &.disable {
    cursor: not-allowed;
  }
  &:hover {
    transform: scale(1.1); // 10% 크기 증가
  }
`;

export const commonButtonRotate = css`
  &.rotate-90 {
    transform: rotate(90deg);
  }
  &.rotate-90:hover {
    transform: scale(1.1) rotate(90deg);
  }
  &.rotate-180 {
    transform: rotate(180deg);
  }
  &.rotate-180:hover {
    transform: scale(1.1) rotate(180deg);
  }
  &.rotate-270 {
    transform: rotate(270deg);
  }
  &.rotate-270:hover {
    transform: scale(1.1) rotate(270deg);
  }
`;
