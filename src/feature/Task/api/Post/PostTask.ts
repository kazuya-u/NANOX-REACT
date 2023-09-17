import { BASE_API_URL } from "../../../../utils/EndPoint";
import { getAccessTokenFromLocalStorage } from "../../../../feature/AuthUser/utils/LocalStorageUtils";
import { TaskDataType } from "../../type/Index";

export async function PostTask() {
  const accessToken = getAccessTokenFromLocalStorage();
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
    "Authorization": `Bearer ${accessToken}`,
  };
  const bodyData: TaskDataType = {
    data: {
      type: "node--task",
      attributes: {
        title: 'タスクを追加',
      },
    },
  };
  const res = await fetch(`${BASE_API_URL}/jsonapi/node/task`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(bodyData)
  });
  const resData = await res.json();
  return resData.data.id;
}

export async function GetPostId() {
  const id = await PostTask();
  return id;
}
