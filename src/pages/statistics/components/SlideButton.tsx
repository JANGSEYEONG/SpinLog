import { getRegisterTypeText } from '@models/expense';
import styled from 'styled-components';

type SlideButtonProps = {
  isChecked: boolean;
  onChange: () => void;
};
const SlideButton = ({ isChecked, onChange }: SlideButtonProps) => {
  const handleToggleClick = () => {
    onChange();
  };

  return (
    <Slider>
      <Container>
        <UncheckedLabel $checked={isChecked}>{getRegisterTypeText('SPEND')}</UncheckedLabel>
        <CheckedLabel $checked={isChecked}>{getRegisterTypeText('SAVE')}</CheckedLabel>
      </Container>
      <HiddenCheckbox checked={isChecked} onChange={handleToggleClick} />
      <Knob $checked={isChecked} />
    </Slider>
  );
};

export default SlideButton;

const Slider = styled.label`
  position: relative;
  width: 76px;
  height: 38px;
  background-color: ${(props) => props.theme.colors.lightGreen};
  border-radius: 26.98px;
  cursor: pointer;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 100;
`;

const Knob = styled.div<{ $checked: boolean }>`
  position: absolute;
  top: 4px;
  left: 3.42px;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 50%;
  transition: transform 0.2s;
  transform: ${(props) => (props.$checked ? 'translateX(40px)' : 'translateX(0)')};
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;
  z-index: -1;
`;

const UncheckedLabel = styled.div<{ $checked: boolean }>`
  position: absolute;
  z-index: 100;
  color: ${(props) => (props.$checked ? props.theme.colors.white : props.theme.colors.lightBlack)};
  left: 7px;
  top: 14px;
  font-size: 12px;
  font-family: 'SUIT';
`;

const CheckedLabel = styled.div<{ $checked: boolean }>`
  position: absolute;
  z-index: 100;
  color: ${(props) => (props.$checked ? props.theme.colors.lightBlack : props.theme.colors.white)};
  right: 6px;
  top: 14px;
  font-size: 12px;
  font-family: 'SUIT';
`;
