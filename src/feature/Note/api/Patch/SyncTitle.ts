import { NoteDataType } from "../../type/Index";
import { NotePatchData } from "../utils/NoteFetch";

export async function SyncTitle(value: string, id: string) {
  const bodyData: NoteDataType = {
    data: {
      id: id,
      type: "node--note",
      attributes: {
        title: value,
      },
    },
  };
  NotePatchData(id, bodyData);
}
