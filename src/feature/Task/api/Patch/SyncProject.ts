import { getAccessTokenFromLocalStorage } from "../../../AuthUser/utils/LocalStorageUtils";
import { BASE_API_URL } from "../../../../utils/EndPoint";
import { TaskDataType } from "../../type/Index";
import { patchData } from "../../utils/Utils";

export async function SyncProject(value: { label: string, value: string }, id: string) {
  const endpoint = `${BASE_API_URL
    }/jsonapi/node/task/${id}`;
    
  const bodyData: TaskDataType = {
    data: {
      id: id,
      type: "node--task",
      relationships: {
        "field_ref_project": {
          "data": {
            "type": "taxonomy_term--project",
            "id": value.value,
          }
        }
      },
    },
  };
  const accessToken = getAccessTokenFromLocalStorage();
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${accessToken}`,
  }
  patchData(endpoint, headers, bodyData);
}
