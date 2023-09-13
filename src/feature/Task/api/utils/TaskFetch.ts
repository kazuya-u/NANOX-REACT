import { BASE_API_URL } from "../../../../utils/EndPoint";
import { getAccessTokenFromLocalStorage } from "../../../../feature/AuthUser/utils/LocalStorageUtils";

export async function taskPatchData<T>(id: string, bodyData: T) {
  const accessToken = getAccessTokenFromLocalStorage();
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${accessToken}`,
  }
  const endpoint = `${BASE_API_URL
  }/jsonapi/node/task/${id}`;
  return await fetch(endpoint, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(bodyData)
  }).then(res => res.json());
}
