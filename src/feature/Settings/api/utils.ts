import { getAccessTokenFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { BASE_API_URL } from "../../../utils/EndPoint";

export async function SyncValue(id: string, inputValue: string, fieldName: string) {
  const bodyData = {
    data: {
      id: id,
      type: "us--us",
      attributes: {
        [fieldName]: inputValue,
      },
    },
  };
  const accessToken = getAccessTokenFromLocalStorage();
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${accessToken}`,
  }
  const endpoint = `${BASE_API_URL
  }/jsonapi/us/us/${id}`;
  return await fetch(endpoint, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(bodyData)
  }).then(res => res.json()); 
}
