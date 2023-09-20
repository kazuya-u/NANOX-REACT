import { BASE_API_URL } from "../../../../utils/EndPoint";
import { getAccessTokenFromLocalStorage } from "../../../AuthUser/utils/LocalStorageUtils";

export async function DeleteTask(id: string) {
  const accessToken = getAccessTokenFromLocalStorage();
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
    "Authorization": `Bearer ${accessToken}`,
  };
  return await fetch(`${BASE_API_URL}/jsonapi/node/task/${id}`, {
    method: 'DELETE',
    headers: headers,
  });
}
