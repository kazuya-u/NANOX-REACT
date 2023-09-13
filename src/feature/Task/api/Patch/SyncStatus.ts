import { TaskDataType } from "../../type/Index";
import { taskPatchData } from "../utils/TaskFetch";

export async function SyncStatus(value: { label: string, value: string }, id: string) {
  const bodyData: TaskDataType = {
    data: {
      id: id,
      type: "node--task",
      relationships: {
        "field_ref_status": {
          "data": {
            "type": "taxonomy_term--status",
            "id": value.value,
          }
        }
      },
    },
  };
  taskPatchData(id, bodyData);
}
