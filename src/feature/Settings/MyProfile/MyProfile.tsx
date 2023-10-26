import { getUserSettingsIdFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import styled from "styled-components";
import { ProfileInputField } from "../components/input";
import { useUser } from "../../../utils/api/UserProvider";

const MyProfile: React.FC = () => {
  const usId = getUserSettingsIdFromLocalStorage();
  const SettingsData = useUser();
  return (
    <>
      <StyledHeadline>プロフィール</StyledHeadline>
      <StyledFormItemContainer>
        <StyledFormItemWrapper>
          {SettingsData === undefined ? 'Loading...' : <ProfileInputField id={usId} defaultValue={SettingsData?.data.attributes.field_username} label="ユーザー名" fieldName="field_username" inputType="text" />}
         
        </StyledFormItemWrapper>
      </StyledFormItemContainer>
      <StyledSpace />
      <StyledFormItemContainer>
        <StyledFormItemWrapper>
          {SettingsData === undefined ? 'Loading...' : <ProfileInputField id={usId} defaultValue={SettingsData?.data.attributes.field_pokemon_number} label="アイコン" fieldName="field_pokemon_number" inputType="text" />}
        </StyledFormItemWrapper>
      </StyledFormItemContainer>
    </>
  );
};

const StyledSpace = styled.div`
  display: flex; align-items: center; justify-content: center; pointer-events: none; width: 100%; height: 18px; flex: 0 0 auto;
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

export default MyProfile;
