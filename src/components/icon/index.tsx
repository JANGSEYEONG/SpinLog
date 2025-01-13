import styled, { css } from 'styled-components';

import { IoClose } from 'react-icons/io5';
import { LuChevronLeft } from 'react-icons/lu';
import { RiSettings4Fill } from 'react-icons/ri';

const commonButtonStyle = css`
  transition: transform 0.3s;
  cursor: pointer;
  &.disable {
    cursor: not-allowed;
  }
  &:hover {
    transform: scale(1.1); // 10% 크기 증가
  }
`;

const commonButtonRotate = css`
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
export const XIcon = styled(IoClose)`
  ${commonButtonStyle}
`;

export const SettingIcon = styled(RiSettings4Fill)`
  ${commonButtonStyle}
`;

export const ChevronIcon = styled(LuChevronLeft)`
  ${commonButtonStyle}
  ${commonButtonRotate}
`;
