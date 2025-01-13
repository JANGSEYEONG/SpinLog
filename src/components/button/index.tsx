import EditIcon from '@assets/images/icon/editIcon.svg?react';
import FilterIcon from '@assets/images/icon/filterIcon.svg?react';
import LogoIcon from '@assets/images/icon/logoGreen.svg?react';
import LogoWhiteIcon from '@assets/images/icon/logoWhite.svg?react';
import MikeIcon from '@assets/images/icon/mikeIcon.svg?react';
import SearchIcon from '@assets/images/icon/searchIcon.svg?react';
import SpeechBubbleIcon from '@assets/images/icon/speechBubble.svg?react';
import TrashIcon from '@assets/images/icon/trashIcon.svg?react';
import VolumeIcon from '@assets/images/icon/volumeIcon.svg?react';
import styled from 'styled-components';

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
