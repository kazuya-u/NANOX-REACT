import { postData } from "../utils/Utils";
import { SubmitHandler } from "react-hook-form";
import { TaskBodyDataType, TaskBodyRelatedDataType, TaskFormData, TaskRelatedData } from "../type/Index";
import { toast } from "react-toastify";
import { getAccessTokenFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { TmpRelatedDataType } from "../../../feature/Note/type/Index";
import { BASE_API_URL } from "../../../utils/EndPoint";

const generateRelatedData = (value: string, type: string): TmpRelatedDataType => ({
  type,
  id: value,
});

export const onSubmitPostData: SubmitHandler<TaskFormData> = async (data) => {
  try {
    const endpoint = `${BASE_API_URL}/jsonapi/node/task`;
    const accessToken = getAccessTokenFromLocalStorage();
    const headers = {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
      "Authorization": `Bearer ${accessToken}`,
    }; let projectData = null;
    let statusData = null;
    let tagsData = null;
    if (data.project && data.project.value) {
      projectData = generateRelatedData(data.project.value, "taxonomy_term--project");
    }
    if (data.status && data.status.value) {
      statusData = generateRelatedData(data.status.value, "taxonomy_term--status");
    }
    if (data.tags && data.tags.length) {
      tagsData = data.tags.map((tag) => generateRelatedData(tag.value, "taxonomy_term--tags"));
    }
    const relatedData: TaskBodyRelatedDataType = {};
    // データが存在する場合に関連データに追加
    if (projectData) {
      relatedData.field_ref_project = { data: projectData };
    }
    if (statusData) {
      relatedData.field_ref_status = { data: statusData };
    }
    if (tagsData) {
      relatedData.field_ref_tags = { data: tagsData };
    }
    const bodyData: TaskBodyDataType = {
      data: {
        type: "node--task",
        attributes: {
          title: data.title,
          field_description: data.description,
        },
        relationships: relatedData,
      },
    };

    await postData(endpoint, headers, bodyData);
    toast.success(`Nodeの投稿に成功しました。${data.title}`);
  } catch (error) {
    console.error("Nodeの投稿に失敗しました。", error);
    toast.error("Nodeの投稿に失敗しました。");
  }
};
