import { FilterBtn, SearchBtn } from '@components/button';
import SlideModal from '@components/modal/SlideModal';
import { getEmotionText } from '@models/emotion';
import { type ExpenseFilterType, getRegisterTypeText } from '@models/expense';
import { flexCenter, flexColumnCenter, overflowWithoutScroll } from '@styles/CommonStyles';
import { formatYMD } from '@utils/dateUtils';
import { cloneDeep } from 'lodash';
import styled from 'styled-components';

import { useReducer } from 'react';

import FilterPopup from './FilterPopup';

type SearchConditionProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  condition: ExpenseFilterType;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  updateCondition: (data: ExpenseFilterType) => void;
};

const SearchCondition = ({
  inputRef,
  condition,
  handleKeyDown,
  updateCondition,
}: SearchConditionProps) => {
  const [showModal, toggleModal] = useReducer((state) => !state, false); // 내림차순 = 최신순

  return (
    <Container>
      <FilterWrapper>
        <span className="filter-btn" onClick={toggleModal}>
          <FilterBtn />
        </span>
        <SelectList onClick={toggleModal}>
          <Select>{`${formatYMD(condition.from)}-${formatYMD(condition.to)}`}</Select>
          {condition.registerType.length > 0 && (
            <Select>
              {condition.registerType
                .map((register) => `${getRegisterTypeText(register)}했어요`)
                .join(',')}
            </Select>
          )}
          {condition.emotion.length > 0 && (
            <Select>
              {`${getEmotionText(condition.emotion[0])}`}
              {condition.emotion.length > 1 ? ` 외 ${condition.emotion.length - 1}건` : ``}
            </Select>
          )}
          {condition.satisfaction.length > 0 && (
            <Select>{`만족도 ${condition.satisfaction.sort((a, b) => a - b).join(',')}`}</Select>
          )}
        </SelectList>
      </FilterWrapper>
      <SearchBoxWrapper>
        <SearchBtn />
        <SearchInput
          type="search"
          placeholder="감정 메모,소비 내역 등의 키워드를 검색하세요"
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
      </SearchBoxWrapper>
      {showModal && (
        <SlideModal onClose={toggleModal}>
          <FilterPopup
            onClose={toggleModal}
            updateCondition={updateCondition}
            prevCondition={cloneDeep(condition)}
          />
        </SlideModal>
      )}
    </Container>
  );
};

export default SearchCondition;

const Container = styled.div`
  ${flexColumnCenter}
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.lightGreen};
  width: 100%;
  height: 130px;
  flex-shrink: 0;

  padding: 0 20px 10px 20px;
  gap: 20px;
`;
const FilterWrapper = styled.div`
  ${flexCenter};
  justify-content: flex-start;
  width: 100%;
  height: 30px;
  flex-shrink: 0;
  margin-bottom: 5px;

  & span.filter-btn {
    cursor: pointer;
    flex-shrink: 0;
    width: 40px;
    color: ${(props) => props.theme.colors.white};
    font-size: 16px;
    font-weight: 600;
  }
`;

const SelectList = styled.span`
  ${overflowWithoutScroll}
  ${flexCenter}
  gap: 10px;
  justify-content: flex-start;
  width: 100%;
  height: 30px;
`;

const Select = styled.span`
  ${flexCenter}
  /* width: 70px; */
  height: 30px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.white};
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.darkLightGray2};
  font-size: 10px;
  font-weight: 600;
  padding: 12.5px;
`;

const SearchBoxWrapper = styled.div`
  ${flexCenter}
  justify-content: flex-start;
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 6px;
  padding-left: 15px;
  padding-right: 15px;
`;

const SearchInput = styled.input.attrs({ type: 'text' })`
  width: 90%;
  height: 50px;
  font-size: 14px;
  font-weight: 400;
  margin-left: 10px;

  &::placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }
`;
