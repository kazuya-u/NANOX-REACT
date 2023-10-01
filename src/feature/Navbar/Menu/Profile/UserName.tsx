import { BASE_API_URL } from "../../../../utils/EndPoint";
import { getUserIdFromLocalStorage } from "../../../../feature/AuthUser/utils/LocalStorageUtils";
import { useFetchData } from "../../../../utils/fetchData";
import styled from "styled-components"

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

export default function UserName() {
  const uid = getUserIdFromLocalStorage();
  const { data: UserData } = useFetchData<UserData>(`${BASE_API_URL}/jsonapi/user/user/${uid}`);
  return (
    <StyledUserName>
      <StyledContainer>
        <StyledWrapper>
          <StyledInner>
            {UserData?.data.attributes.name}
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
