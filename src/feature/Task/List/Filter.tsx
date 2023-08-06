import styled from 'styled-components';

const FilterForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  column-gap: 8px;
  padding: 16px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
`;

const FilterLabel = styled.label`
  margin-right: 8px;
  width: max-content;
  font-weight: bold;
`;

const FilterSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 8px;
  background-color: #007bff;
  color: #fff;
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
        <SubmitButton type="submit">検索</SubmitButton>
      </FilterSection>
    </FilterForm>
  );
};

export default TaskFilter;
