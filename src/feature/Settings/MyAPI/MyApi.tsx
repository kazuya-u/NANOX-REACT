import { getUserSettingsIdFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import styled from "styled-components";
import { ProfileInputField } from "../components/input";
import { useUser } from "../../../utils/api/UserProvider";

const MyApi: React.FC = () => {
  const usId = getUserSettingsIdFromLocalStorage();
  const SettingsData = useUser();

  return (
    <>
      <StyledHeadline>API連携</StyledHeadline>
      <StyledFormItemContainer>
        <StyledFormItemWrapper>
          {SettingsData === undefined ? 'Loading...' : <ProfileInputField id={usId} defaultValue={SettingsData?.data.attributes.field_slack_app_token} label="Slack API Token" fieldName="field_slack_app_token" inputType="password" />}
        </StyledFormItemWrapper>
      </StyledFormItemContainer>
      <StyledSpace />
      <StyledFormItemContainer>
        <StyledFormItemWrapper>
          {SettingsData === undefined ? 'Loading...' : <ProfileInputField id={usId} defaultValue={SettingsData?.data.attributes.field_toggl_api_token} label="Toggl API Token" fieldName="field_toggl_api_token" inputType="password" />}
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
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default MyApi;
