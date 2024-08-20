import styled, { css } from 'styled-components';

import SettingGreenIcon from '@assets/images/icon/settingGreen.svg?react';
import SettingGrayIcon from '@assets/images/icon/settingGray.svg?react';
import PrevIcon from '@assets/images/icon/prevButton.svg?react';
import CloseIcon from '@assets/images/icon/closeButton.svg?react';
import LogoIcon from '@assets/images/icon/logoGreen.svg?react';
import LogoWhiteIcon from '@assets/images/icon/logoWhite.svg?react';
import SpeechBubbleIcon from '@assets/images/icon/speechBubble.svg?react';
import MikeIcon from '@assets/images/icon/mikeIcon.svg?react';
import EditIcon from '@assets/images/icon/editIcon.svg?react';
import SearchIcon from '@assets/images/icon/searchIcon.svg?react';
import FilterIcon from '@assets/images/icon/filterIcon.svg?react';
import TrashIcon from '@assets/images/icon/trashIcon.svg?react';
import VolumeIcon from '@assets/images/icon/volumeIcon.svg?react';

// SVG 아이콘 스타일
const buttonStyle = css`
  color: ${(props) =>
    props.theme.colors
      .darkLightGray2}; // svg 파일에 fill 이 속성으로 정의되어 있는 경우 사용 가능. (fill="currentColor")
  stroke: currentColor; // 현재 컬러를 stroke 색상으로 사용
  stroke-width: 1.5; // svg 파일에 stroke 이 속성으로 정의되어 있는 경우 사용 가능. (stroke="currentColor")
  transition:
    color 0.2s,
    transform 0.2s,
    stroke-width 0.2s; // 트랜지션 추가
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.darkGray}; // 마우스 호버 시 색상 변경
    transform: scale(1.1); // 10% 크기 증가
    stroke-width: 2;
  }
`;

export const CloseBtn = styled(CloseIcon)`
  ${buttonStyle}
  width: 20px;
  height: 20px;
  justify-content: flex-end;
`;

// 어떤 이벤트가 발생할지 모르는 버튼, 스타일 컴포넌트로 돌려주기
export const PrevBtn = styled(PrevIcon)`
  ${buttonStyle}
  color:${(props) => props.theme.colors.darkLightGray2};
  width: 20px;
  height: 20px;
`;

export const SettingGreenBtn = styled(SettingGreenIcon)`
  width: 24px;
  height: 24px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1); // 10% 크기 증가
  }
`;

export const SettingGrayBtn = styled(SettingGrayIcon)`
  width: 24px;
  height: 24px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1); // 10% 크기 증가
  }
`;

export const LogoBtn = styled(LogoIcon)`
  width: 110px;
  height: 26px;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
`;

export const LogoWhiteBtn = styled(LogoWhiteIcon)`
  width: 110px;
  height: 26px;
`;

export const SpeechBubbleBtn = styled(SpeechBubbleIcon)`
  width: 46px;
  height: 30px;
  color: ${(props) => props.theme.colors.darkGray};
`;

export const MikeBtn = styled(MikeIcon)`
  width: 24px;
  height: 24px;
`;

export const EditBtn = styled(EditIcon)`
  width: 18px;
  height: 18px;
  color: ${(props) => props.theme.colors.darkLightGray};
`;

export const TrashBtn = styled(TrashIcon)``;
export const SearchBtn = styled(SearchIcon)``;
export const FilterBtn = styled(FilterIcon)``;
export const VolumeBtn = styled(VolumeIcon)`
  width: 24px;
  height: 24px;
`;
