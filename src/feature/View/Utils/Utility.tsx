import styled from "styled-components";

interface CategoryData {
  color_label: string;
  title: string;
}
interface RenderCategoryProps {
  data: CategoryData | CategoryData[];
  isMultiple?: boolean;
}


export function RenderCategory({ data, isMultiple = false }: RenderCategoryProps) {
  if (!data || (isMultiple && !data)) {
    return null;
  }

  return (
    <>
      {isMultiple
        ? (data as CategoryData[]).map((item) => (
            <StyledCategoryItem key={item.title} background={item.color_label}>
              <StyledCategoryItemWrapper>
                <StyledCategoryItemInnerWrapper>
                  {item.title}
                </StyledCategoryItemInnerWrapper>
              </StyledCategoryItemWrapper>
            </StyledCategoryItem>
          ))
        : (
          <StyledCategoryItem background={(data as CategoryData).color_label}>
            <StyledCategoryItemWrapper>
              <StyledCategoryItemInnerWrapper>
                {(data as CategoryData).title}
              </StyledCategoryItemInnerWrapper>
            </StyledCategoryItemWrapper>
          </StyledCategoryItem>
        )
      }
    </>
  );
}

const StyledCategoryItem = styled.div<{ background: string; }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  min-width: 0px;
  max-width: 100%;
  height: 20px;
  border-radius: 3px;
  padding-left: 6px;
  padding-right: 6px;
  font-size: 14px;
  line-height: 120%;
  color: rgb(73, 41, 14);
  background: ${(props) => (props.background ? props.background : "#e3e2e080")};
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledCategoryItemWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-flex;
  align-items: center;
  height: 20px;
  line-height: 20px;
`;

const StyledCategoryItemInnerWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
