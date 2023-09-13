import { TaskDataType } from "../../type/Index";
import { taskPatchData } from "../utils/TaskFetch";

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
  taskPatchData(id, bodyData);
}
