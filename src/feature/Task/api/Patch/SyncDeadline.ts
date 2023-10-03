import { TaskDataType } from "../../type/Index";
import { TaskPatchData } from "../utils/TaskFetch";

export async function SyncDeadline(value: string, id: string) {
  const targetDateTime = new Date(value);
  const year = String(targetDateTime.getFullYear());
  const month = String(targetDateTime.getMonth() + 1).padStart(2, '0');
  const day = String(targetDateTime.getDate()).padStart(2, '0');
  const hours = String(targetDateTime.getHours()).padStart(2, '0');
  const minutes = String(targetDateTime.getMinutes()).padStart(2, '0');
  const customFormattedDate = `${year}-${month}-${day}T${hours}:${minutes}:00+09:00`;
  const bodyData: TaskDataType = {
    data: {
      id: id,
      type: "node--task",
      attributes: {
        field_deadline: customFormattedDate,
      },
    },
  };
  TaskPatchData(id, bodyData);
}
