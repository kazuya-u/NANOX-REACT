import { getUserSettingsIdFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { BASE_API_URL } from "../../../utils/EndPoint";
import { useFetchData } from "../../../utils/fetchData";
import styled from "styled-components";
import { ProfileInputCheckboxField, ProfileInputField } from "../components/input";

interface CategoryType {
  data: Category[];
}

interface Category {
  type: string;
  id: string;
  links: {
    self: {
      href: string;
    };
  };
  attributes: {
    title: string;
    drupal_internal__id: number;
  };
}

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

const MyDisplay: React.FC = () => {
  const usId = getUserSettingsIdFromLocalStorage();
  const { data: CategoryData } = useFetchData<CategoryType>(`${BASE_API_URL}/jsonapi/uc/status?fields[uc--status]=drupal_internal__id,title`);
  const { data: USData } = useFetchData<UsData>(`${BASE_API_URL}/jsonapi/us/us/${usId}?include=field_ref_status_filter&fields[uc--settings]=drupal_internal__id`);  
  const InitialData: Array<string> = [];
  if (USData) {
    USData.included.forEach((element: RelatedType) => (
      InitialData.push(element.id.toString())
    ));
  }
  return (
    <>
      <StyledHeadline>表示設定</StyledHeadline>
      <StyledFormItemContainer>
        <StyledFormItemWrapper>
          <StyledFormItemWrapper>
            {CategoryData ? CategoryData.data.map((item) => (
              <StyledFormItem key={item.id}>
                <StyledLabel>
                  {item.attributes.title}
                </StyledLabel>
                <StyledInputCheckboxContainer>
                  <StyledInputTextWrapper>
                    {USData !== undefined && CategoryData !== undefined ? <ProfileInputCheckboxField id={usId} fieldName="field_ref_status_filter" initial={InitialData.includes(item.id)} statusId={item.id.toString()} defaultValue={InitialData} /> : 'Loading...'}
                  </StyledInputTextWrapper>
                </StyledInputCheckboxContainer>
              </StyledFormItem>
            )) : 'Loading...'}
          </StyledFormItemWrapper>
        </StyledFormItemWrapper>
      </StyledFormItemContainer>
    </>
  );
};

const StyledFormItemWrapper = styled.div`

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

const StyledInputCheckboxContainer = styled.div`

user-select: none; --pseudoSelection--background: transparent; margin-right: 2px; width: 24px; display: flex; align-items: center; justify-content: center; flex-grow: 0; flex-shrink: 0; min-height: calc(1.5em + 3px + 3px);
`;

export default MyDisplay;
