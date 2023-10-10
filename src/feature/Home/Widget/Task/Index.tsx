import styled from "styled-components";
import TaskHeader from "../../Header";
import Layout from "./Layout/Layout";
import { useFetchData } from "../../../../utils/fetchData";
import { BASE_API_URL } from "../../../../utils/EndPoint";
import { getUserSettingsIdFromLocalStorage } from "../../../../feature/AuthUser/utils/LocalStorageUtils";

interface UsData {
  data: {
    "type": "us--us",
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
  },
  included: RelatedType[]
}

interface RelatedType {
  id: string,
  "attributes": {
    drupal_internal__id: string,
  },
}

const Index: React.FC = () => {
  const usId = getUserSettingsIdFromLocalStorage();
  const { data: SettingsData } = useFetchData<UsData>(`${BASE_API_URL}/jsonapi/us/us/${usId}?include=field_ref_status_filter&fields[uc--settings]=drupal_internal__id`);
  const FilterId: Array<string> = [];
  SettingsData?.included.forEach(i => {
    FilterId.push(i.attributes.drupal_internal__id);
  });  
  return (
    <>
      <StyledTask>
        <StyledTaskContainer>
          <TaskHeader title="Task" />
          <StyledTaskWrapper>
            <StyledTaskInnerWrapper_1>
              <StyledTaskInnerWrapper_2>
                <StyledTaskInnerWrapper_3>
                  <StyledTaskInnerWrapper_4>
                    <StyledTaskInnerWrapper_5>
                      <Layout IdArray={FilterId} />
                    </StyledTaskInnerWrapper_5>
                  </StyledTaskInnerWrapper_4>
                </StyledTaskInnerWrapper_3>
              </StyledTaskInnerWrapper_2>
            </StyledTaskInnerWrapper_1>
          </StyledTaskWrapper>
        </StyledTaskContainer>
      </StyledTask>
    </>
  )
}

const StyledTask = styled.div`
  display: flex; flex-direction: column;
`;

const StyledTaskContainer = styled.div`
  width: 100%; max-width: 100%; margin-top: 2px; margin-bottom: 1px;
`;

const StyledTaskWrapper = styled.div`
width: 100%; max-width: 100%; margin-top: 1px; margin-bottom: 1px;
`;

const StyledTaskInnerWrapper_1 = styled.div`
  flex-grow: 1; flex-shrink: 0; display: flex; flex-direction: column;
`;

const StyledTaskInnerWrapper_2 = styled.div`
  position: relative;
`;

const StyledTaskInnerWrapper_3 = styled.div`
  z-index: 1; flex-grow: 1; flex-shrink: 0; overflow: auto hidden; margin-right: 0px; margin-bottom: 0px;
`;

const StyledTaskInnerWrapper_4 = styled.div`
  margin-left: 0px; margin-right: 0px; float: left; min-width: 100%;
`;

const StyledTaskInnerWrapper_5 = styled.div`
  display: flex; position: relative; flex-grow: 1; padding-bottom: 0px;
`;

export default Index;
