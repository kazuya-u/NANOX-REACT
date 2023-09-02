import { BASE_API_URL } from "../../../utils/EndPoint";
import { getAccessTokenFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { patchData } from "../utils/Utils";
import { SubmitHandler } from "react-hook-form";
import { TaskBodyDataType, TaskBodyRelatedDataType, TaskFormData } from "../type/Index";
import { TmpRelatedDataType } from "../../../feature/Note/type/Index";
import { toast } from "react-toastify";

const generateRelatedData = (value: string, type: string): TmpRelatedDataType => ({
  type,
  id: value,
});

export const onSubmitPatchData: SubmitHandler<TaskFormData> = async (data, taskId) => {
  try {
    const baseUrl = `${BASE_API_URL}/jsonapi/node/task/${taskId}`;
    const accessToken = getAccessTokenFromLocalStorage();
    const headers = {
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${accessToken}`,
    };
    
    let projectData = null;
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
        id: taskId,
        attributes: {
          title: data.title,
          field_description: data.description,
        },
        relationships: relatedData,
      },
    };

    const response = await patchData(baseUrl, headers, bodyData);
    toast.success('編集しました。');
    return { patch: response };
  } catch (error) {
    console.error("エラーが発生しました:", error);
    throw error;
  }
};
