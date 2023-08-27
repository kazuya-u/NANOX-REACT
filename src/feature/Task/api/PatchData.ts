import { getAccessTokenFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { patchData } from "../utils/Utils";
import { SubmitHandler } from "react-hook-form";
import { TaskBodyDataType, TaskFormData, TaskRelatedData } from "../type/Index";

export const onSubmitPatchData: SubmitHandler<TaskFormData> = async (data, taskId) => {
  const endpoint = `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task`;
  const baseUrl = `${endpoint}/${taskId}`;
  const accessToken = getAccessTokenFromLocalStorage();
    const headers = {
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${accessToken}`,
    };
  const bodyData: TaskBodyDataType = {
    data: {
      type: "node--task",
      id: taskId,
      attributes: {
        title: data.title,
        field_description: data.description,
      },
      relationships: {},
    },
  };

  const relatedData: TaskRelatedData[] = [];
  if (data.project && data.project.value) {
    relatedData.push({
      type: "taxonomy_term--project",
      id: data.project.value,
    });
  }

  if (data.status && data.status.value) {
    relatedData.push({
      type: "taxonomy_term--status",
      id: data.status.value,
    });
  }

  const generateRelatedData = (
    value: string,
    type: string
  ): TaskRelatedData => ({
    type,
    id: value,
  });

  if (data.tags && data.tags.length) {
    data.tags.forEach((tag) => {
      relatedData.push(generateRelatedData(tag.value, "taxonomy_term--tags"));
    });
  }

  relatedData.forEach((related) => {
    const relationshipKey = `field_ref_${related.type.split("--")[1]}`;
    bodyData.data.relationships[relationshipKey] = {
      data: related,
    };
  });
  const patch = patchData(baseUrl, headers, bodyData);
  return { patch };
};
