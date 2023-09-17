import { postData } from "../utils/Utils";
import { SubmitHandler } from "react-hook-form";
import { TaskDataType, TaskFormData } from "../type/Index";
import { toast } from "react-toastify";
import { getAccessTokenFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { BASE_API_URL } from "../../../utils/EndPoint";

export const onSubmitPostData: SubmitHandler<TaskFormData> = async (data) => {
  try {
    const endpoint = `${BASE_API_URL}/jsonapi/node/task`;
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
          title: data.title,
          field_description: data.description,
        },
      },
    };

    await postData(endpoint, headers, bodyData);
    toast.success(`Nodeの投稿に成功しました。${data.title}`);
  } catch (error) {
    console.error("Nodeの投稿に失敗しました。", error);
    toast.error("Nodeの投稿に失敗しました。");
  }
};
