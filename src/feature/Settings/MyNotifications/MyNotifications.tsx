import styled from "styled-components";

const MyNotifications: React.FC = () => {
  return (
    <>
      <StyledHeadline>
        通知機能
      </StyledHeadline>
      <StyledFormItemContainer>
        <StyledFormItemWrapper>
          <StyledFormItem>
            <StyledLabel>
              Slack通知
            <StyledHelpText>
              Drupalサーバーから各環境へ通知を送信します。
            </StyledHelpText>
            </StyledLabel>
            <StyledInputCheckboxContainer>
              <StyledInputTextWrapper>
                <StyledInputCheckbox type="checkbox" />
              </StyledInputTextWrapper>
            </StyledInputCheckboxContainer>
          </StyledFormItem>
        </StyledFormItemWrapper>
        <StyledSpace />
        <StyledSpace  />
        <StyledFormItemWrapper>
          <StyledFormItem>
            <StyledLabel>
              Chatwork
            <StyledHelpText>
              DrupalサーバーからChatworkへ通知を送信します。
            </StyledHelpText>
            </StyledLabel>
            <StyledInputCheckboxContainer>
              <StyledInputTextWrapper>
                <StyledInputCheckbox type="checkbox" />
              </StyledInputTextWrapper>
            </StyledInputCheckboxContainer>
          </StyledFormItem>
        </StyledFormItemWrapper>
      </StyledFormItemContainer>
    </>
  );
};

const StyledSpace = styled.div`
  display: flex; align-items: center; justify-content: center; pointer-events: none; width: 100%; height: 8px; flex: 0 0 auto;
`;

const StyledHeadline = styled.div`
  border-bottom: 1px solid rgba(55, 53, 47, 0.09);
  margin-bottom: 16px;
  margin-top: 0px;
  padding-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
  width: auto;
  color: rgb(55, 53, 47);
`;

const StyledFormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFormItemWrapper = styled.div`

`;

const StyledFormItem = styled.div`
display: flex;
justify-content: space-between;
margin-left: 20px;
margin-right: 20px;
`;

const StyledLabel = styled.label`
border-bottom: 0px; margin-bottom: 2px; margin-top: 0px; padding-bottom: 0px; font-size: 14px; font-weight: 400; width: auto; color: rgb(55, 53, 47);
`;

const StyledInputTextWrapper = styled.div`
position: relative; flex-shrink: 0; flex-grow: 0; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; transition: background 200ms ease-out 0s; --pseudoHover--background: rgba(55,53,47,.08); --pseudoActive--background: rgba(55,53,47,.16); background: rgb(35, 131, 226);;
`;

const StyledInputCheckbox = styled.input`
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0px;
  left: 0px;
  cursor: pointer;
`;
const StyledInputCheckboxContainer = styled.div`

user-select: none; --pseudoSelection--background: transparent; margin-right: 2px; width: 24px; display: flex; align-items: center; justify-content: center; flex-grow: 0; flex-shrink: 0; min-height: calc(1.5em + 3px + 3px);
`;


const StyledHelpText = styled.div`
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  color: rgba(55, 53, 47, 0.65);
`;


export default MyNotifications;
