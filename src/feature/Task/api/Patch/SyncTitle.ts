import { TaskDataType } from "../../type/Index";
import { taskPatchData } from "../utils/TaskFetch";

export async function syncTitle(value: string, id: string) {
  const bodyData: TaskDataType = {
    data: {
      id: id,
      type: "node--task",
      attributes: {
        title: value,
      },
    },
  };
  taskPatchData(id, bodyData);
}
