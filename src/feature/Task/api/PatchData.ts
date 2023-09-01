import { getAccessTokenFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { patchData } from "../utils/Utils";
import { SubmitHandler } from "react-hook-form";
import { TaskBodyDataType, TaskFormData, TaskRelatedData } from "../type/Index";
import { TmpRelatedDataType } from "../../../feature/Note/type/Index";

export const onSubmitPatchData: SubmitHandler<TaskFormData> = async (data, taskId) => {
  const endpoint = `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task`;
  const baseUrl = `${endpoint}/${taskId}`;
  const accessToken = getAccessTokenFromLocalStorage();
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${accessToken}`,
  };
  const TmpRelatedData: TmpRelatedDataType[] = [];
  if (data.project && data.project.value) {
    TmpRelatedData.push({
      type: "taxonomy_term--project",
      id: data.project.value,
    });
  }

  if (data.status && data.status.value) {
    TmpRelatedData.push({
      type: "taxonomy_term--status",
      id: data.status.value,
    });
  }
  const generateRelatedData = (
    value: string,
    type: string
  ): TmpRelatedDataType => ({
    type,
    id: value,
  });
  if (data.tags && data.tags.length) {
    data.tags.forEach((tag) => {
      TmpRelatedData.push(
        generateRelatedData(tag.value, "taxonomy_term--tags")
      );
    });
  }
  const relatedData: TaskRelatedData = {
    field_ref_project: {
      data: TmpRelatedData.filter(
        (item) => item.type === "taxonomy_term--project"
      )[0],
    },
    field_ref_status: {
      data: TmpRelatedData.filter(
        (item) => item.type === "taxonomy_term--status"
      )[0],
    },
    field_ref_tags: {
      data: TmpRelatedData.filter(
        (tag) => tag.type === "taxonomy_term--tags"
      ).map((tag) => ({
        type: tag.type,
        id: tag.id,
      })),
    },
  };
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
  const patch = patchData(baseUrl, headers, bodyData);
  return { patch };
};
