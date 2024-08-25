import styled from 'styled-components';

import { SettingIcon } from '@components/icon';
import { PagePath } from '@models/navigation';
import { useNavigate } from 'react-router-dom';

type GoSettingButtonProps = {
  isWhite?: boolean;
};

const GoSettingButton = ({ isWhite = false }: GoSettingButtonProps) => {
  const navigate = useNavigate();

  return (
    <Setting
      $isWhite={isWhite}
      onClick={() => {
        navigate(PagePath.Setting);
      }}
    />
  );
};

export default GoSettingButton;

const Setting = styled(SettingIcon)<{ $isWhite: boolean }>`
  width: 24px;
  height: 24px;
  color: ${(props) =>
    props.$isWhite ? props.theme.topNavigation.iconWhite : props.theme.topNavigation.iconGray};
`;
