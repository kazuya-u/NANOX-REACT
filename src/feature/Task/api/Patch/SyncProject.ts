import { TaskDataType } from "../../type/Index";
import { TaskPatchData } from "../utils/TaskFetch";

export async function SyncProject(value: { label: string, value: string }, id: string) {
  const bodyData: TaskDataType = {
    data: {
      id: id,
      type: "node--task",
      relationships: {
        "field_ref_project": {
          "data": {
            "type": "uc--project",
            "id": value.value,
          }
        }
      },
    },
  };
  TaskPatchData(id, bodyData);
}
