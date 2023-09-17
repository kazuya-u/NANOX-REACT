import { NoteDataType } from "../../type/Index";
import { NotePatchData } from "../utils/NoteFetch";

export async function SyncDescription(value: string, id: string) {
  const bodyData: NoteDataType = {
    data: {
      id: id,
      type: "node--note",
      attributes: {
        field_description: value,
      },
    },
  };
  NotePatchData(id, bodyData);
}
