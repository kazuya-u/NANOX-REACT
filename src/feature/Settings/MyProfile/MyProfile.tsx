import { getUserIdFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { BASE_API_URL } from "../../../utils/EndPoint";
import { useFetchData } from "../../../utils/fetchData";
import styled from "styled-components";

interface UserData {
  data: {
    "type": "user--user",
    "id": string,
    "attributes": {
      "display_name": string,
      "drupal_internal__uid": number,
      "name": string,
      "mail": string,
      "timezone": string,
      "field_chatwork_api_room_id": [],
      "field_chatwork_api_token": string,
      "field_toggl_api_token": string,
    }
  }
}

const MyProfile: React.FC = () => {
  const uid = getUserIdFromLocalStorage();
  const { data: UserData } = useFetchData<UserData>(`${BASE_API_URL}/jsonapi/user/user/${uid}`);
  return (
    <>
      <StyledHeadline>プロフィール</StyledHeadline>
      <StyledFormItemContainer>
        <StyledFormItemWrapper>
          <StyledFormItem>
            <StyledLabel>
              ユーザー名
            </StyledLabel>
            <StyledInputTextWrapper>
              <StyledInputText type="text" defaultValue={UserData?.data.attributes.name} />
            </StyledInputTextWrapper>
          </StyledFormItem>
        </StyledFormItemWrapper>
      </StyledFormItemContainer>
      <StyledSpace />
      <StyledFormItemContainer>
        <StyledFormItemWrapper>
          <StyledFormItem>
            <StyledLabel>
              アイコン
            </StyledLabel>
            <StyledInputTextWrapper>
              <StyledInputText type="text" />
            </StyledInputTextWrapper>
          </StyledFormItem>
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

const StyledFormItem = styled.div`
  margin-left: 20px;
  width: 450px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  color: rgba(55, 53, 47, 0.65);
`;

const StyledInputTextWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding: 4px 10px;
  position: relative;
  border-radius: 4px;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
  background: rgb(251, 251, 250);
  cursor: text;
`;

const StyledInputText = styled.input`
  font-size: inherit;
  line-height: inherit;
  border: none;
  background: none;
  width: 100%;
  display: block;
  resize: none;
  padding: 0px;
  :focus-visible {
    outline: none;
  }
`;

export default MyProfile;
