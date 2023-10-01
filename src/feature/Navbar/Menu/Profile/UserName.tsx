import styled from "styled-components"

type Props = {
  name: string | undefined,
}

export const UserName: React.FC<Props> = ({ name }) => {
  return (
    <StyledUserName>
      <StyledContainer>
        <StyledWrapper>
          <StyledInner>
            {name ? name : '取得中...'}
          </StyledInner>
        </StyledWrapper>
      </StyledContainer>
    </StyledUserName>
  )
}

const StyledUserName = styled.div`
  flex: 1 1 auto;
  white-space: nowrap;
  min-width: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 6px;
  margin-top: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledInner = styled.span`
  color: rgb(55, 53, 47);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
