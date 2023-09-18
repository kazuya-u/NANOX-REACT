import { BASE_API_URL } from "../../../../utils/EndPoint";
import { getAccessTokenFromLocalStorage } from "../../../AuthUser/utils/LocalStorageUtils";

export async function PostTag(data: string) {
  const accessToken = getAccessTokenFromLocalStorage();
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
    "Authorization": `Bearer ${accessToken}`,
  };
  const bodyData = {
    data: {
      type: "taxonomy_term--tags",
      attributes: {
        name: data,
      },
    },
  };
  const res = await fetch(`${BASE_API_URL}/jsonapi/taxonomy_term/tags`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(bodyData)
  });
  const createdOptionData = await res.json();
  return createdOptionData.data.id;
}
