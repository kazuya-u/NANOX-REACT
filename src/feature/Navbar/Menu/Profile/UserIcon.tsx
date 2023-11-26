import { BASE_API_URL } from "../../../../utils/EndPoint";
import styled from "styled-components"

type Props = {
  iconNumber: string | undefined,
}

export const UserIcon: React.FC<Props> = ({ iconNumber }) => {
  const POKE_URL = iconNumber ? `${BASE_API_URL}/sites/default/files/api/pokemon/${String(iconNumber).padStart(4, '0')}/front_default.png` : '';

  return (
    <StyledIcon>
      <StyledContainer>
        <StyledWrapper>
          <StyledInner>
            <StyledImage src={POKE_URL} />
          </StyledInner>
        </StyledWrapper>
      </StyledContainer>
    </StyledIcon>
  )
}

const StyledIcon = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 3px;
  color: rgba(55, 53, 47, 0.65);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  border-radius: 0.25em;
  flex-shrink: 0;
  margin-top: 1px;
  color: rgb(55, 53, 47);
  font-weight: 500;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
`;

const StyledInner = styled.span`
  /* height: 26.8px;
  width: 26.8px;
  font-size: 26.8px; */
  line-height: 1;
  margin-left: 0px;
  color: black;
`;

const StyledImage = styled.img`
width: 100%;
height: auto;
`;
