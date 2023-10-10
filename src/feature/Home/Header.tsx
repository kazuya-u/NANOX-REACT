import styled from "styled-components";

interface Props {
  title: string,
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <>
      <StyledHeader>
        <StyledWrapper>
          <StyledInnerWrapper>
            <StyledText>
            { title }
            </StyledText>
          </StyledInnerWrapper>
        </StyledWrapper>
      </StyledHeader>
    </>
  )
}

const StyledHeader = styled.div`
  background: rgb(241, 241, 239);
`;

const StyledWrapper = styled.div`
display: flex;
`;

const StyledInnerWrapper = styled.div`
max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding: 3px 2px;
`;

const StyledText = styled.div`
font-weight:600;
`;


export default Header;
