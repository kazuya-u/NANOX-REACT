import { TaskDataType } from "../../type/Index";
import { TaskPatchData } from "../utils/TaskFetch";

export async function SyncDescription(value: string, id: string) {
  const bodyData: TaskDataType = {
    data: {
      id: id,
      type: "node--task",
      attributes: {
        field_description: value,
      },
    },
  };
  TaskPatchData(id, bodyData);
}
