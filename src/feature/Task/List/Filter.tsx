import styled from 'styled-components';

const FilterForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const FilterSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-right: 16px;
  margin-bottom: 8px;
`;

const FilterLabel = styled.label`
  margin-right: 8px;
  font-weight: bold;
`;

const FilterSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FilterCheckbox = styled.input`
  margin-right: 4px;
`;

const SubmitButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;

const TaskFilter = () => {
  return (
    <FilterForm>
      <FilterSection>
        <FilterLabel>プロジェクト:</FilterLabel>
        <FilterSelect>
          <option value="">すべて</option>
          <option value="">パターン①</option>
        </FilterSelect>
      </FilterSection>
      <FilterSection>
        <FilterLabel>タグ:</FilterLabel>
        <FilterSelect>
          <option value="">すべて</option>
          <option value="">パターン①</option>
        </FilterSelect>
      </FilterSection>
      <FilterSection>
        <FilterLabel>ステータス:</FilterLabel>
        <FilterSelect>
          <option value="">すべて</option>
          <option value="">パターン①</option>
        </FilterSelect>
      </FilterSection>
      <FilterSection>
        <FilterCheckbox type="checkbox" id="incompleteOnly" />
        <FilterLabel htmlFor="incompleteOnly">未完了のみ</FilterLabel>
      </FilterSection>
      <FilterSection>
        <SubmitButton type="submit">フィルター</SubmitButton>
      </FilterSection>
    </FilterForm>
  );
};

export default TaskFilter;
