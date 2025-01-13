import Check from '@assets/images/icon/check.svg?react';
import Edit from '@assets/images/icon/edit.svg?react';
import Filter from '@assets/images/icon/filter.svg?react';
import SpinLog from '@assets/images/icon/logoGreen.svg?react';
import SpinLogWhite from '@assets/images/icon/logoWhite.svg?react';
import Mic from '@assets/images/icon/mic.svg?react';
import Search from '@assets/images/icon/search.svg?react';
import Trash from '@assets/images/icon/trash.svg?react';
import Volume from '@assets/images/icon/volume.svg?react';
import styled from 'styled-components';

import { IoClose } from 'react-icons/io5';
import { LuChevronLeft } from 'react-icons/lu';
import { RiSettings4Fill } from 'react-icons/ri';

import { commonButtonRotate, commonButtonStyle } from './iconStyle';

/* Logo */
export const SpinLogIcon = styled(SpinLog)`
  width: 110px;
  height: 26px;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
`;

export const SpinLogWhiteIcon = styled(SpinLogWhite)`
  width: 110px;
  height: 26px;
`;

/* React-Icon Common */
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

/* Custom-Icon Common */
export const MicIcon = styled(Mic)`
  width: 24px;
  height: 24px;
`;
export const EditIcon = styled(Edit)`
  width: 18px;
  height: 18px;
  color: ${(props) => props.theme.colors.darkLightGray};
`;
export const TrashIcon = styled(Trash)``;

export const VolumeIcon = styled(Volume)`
  width: 24px;
  height: 24px;
`;

export const SearchIcon = styled(Search)``;
export const FilterIcon = styled(Filter)``;
export const CheckIcon = styled(Check)``;
