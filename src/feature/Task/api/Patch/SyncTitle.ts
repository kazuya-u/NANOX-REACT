import { TaskDataType } from "../../type/Index";
import { TaskPatchData } from "../utils/TaskFetch";

export async function SyncTitle(value: string, id: string) {
  const bodyData: TaskDataType = {
    data: {
      id: id,
      type: "node--task",
      attributes: {
        title: value,
      },
    },
  };
  TaskPatchData(id, bodyData);
}
