import { NoteDataType } from "../../type/Index";
import { NotePatchData } from "../utils/NoteFetch";

export async function SyncProject(value: { label: string, value: string }, id: string) {
  const bodyData: NoteDataType = {
    data: {
      id: id,
      type: "node--note",
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
  NotePatchData(id, bodyData);
}
