import { getUserSettingsIdFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { BASE_API_URL } from "../../../utils/EndPoint";
import { useFetchDataNoMutate } from "../../../utils/fetchData";
import styled from "styled-components";
import { InputText } from "../components/input";

interface UsData {
  data: {
    "type": "user--user",
    "id": string,
    "attributes": {
      "display_name": string,
      "drupal_internal__uid": number,
      "name": string,
      "mail": string,
      "timezone": string,
      "field_username": string,
      "field_pokemon_number": string,
      "field_chatwork_api_room_id": [],
      "field_chatwork_api_token": string,
      "field_toggl_api_token": string,
    }
  }
}

const MyProfile: React.FC = () => {
  const usId = getUserSettingsIdFromLocalStorage();
  const { data: SettinsData } = useFetchDataNoMutate<UsData>(`${BASE_API_URL}/jsonapi/us/us/${usId}`);
  return (
    <>
      <StyledHeadline>プロフィール</StyledHeadline>
      <StyledFormItemContainer>
        <StyledFormItemWrapper>
          <InputText id={usId} defaultValue={SettinsData?.data.attributes.field_username} label="ユーザー名" fieldName="field_username" />
        </StyledFormItemWrapper>
      </StyledFormItemContainer>
      <StyledSpace />
      <StyledFormItemContainer>
        <StyledFormItemWrapper>
          <InputText id={usId} defaultValue={SettinsData?.data.attributes.field_pokemon_number} label="アイコン" fieldName="field_pokemon_number" />
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
