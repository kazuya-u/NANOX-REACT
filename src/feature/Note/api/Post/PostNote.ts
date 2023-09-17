import { BASE_API_URL } from "../../../../utils/EndPoint";
import { getAccessTokenFromLocalStorage } from "../../../AuthUser/utils/LocalStorageUtils";
import { NoteDataType } from "../../type/Index";

export async function PostNote() {
  const accessToken = getAccessTokenFromLocalStorage();
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
    "Authorization": `Bearer ${accessToken}`,
  };
  const bodyData: NoteDataType = {
    data: {
      type: "node--note",
      attributes: {
        title: 'メモを追加',
      },
    },
  };
  const res = await fetch(`${BASE_API_URL}/jsonapi/node/note`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(bodyData)
  });
  const resData = await res.json();
  return resData.data.id;
}

export async function GetNotePostId() {
  const id = await PostNote();
  return id;
}
