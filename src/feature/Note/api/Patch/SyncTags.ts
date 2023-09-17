import { MultiValue } from "react-select";
import { NoteDataType } from "../../type/Index";
import { NotePatchData } from "../utils/NoteFetch";

export async function SyncTags(value: MultiValue<{ label: string, value: string }>, id: string) {
  const tagsData = value.map(data => ({
    "type": "taxonomy_term--status",
    "id": data.value,
  }));

  const bodyData: NoteDataType = {
    data: {
      id: id,
      type: "node--note",
      relationships: {
        "field_ref_tags": {
          "data": tagsData,
        }
      },
    },
  };
  NotePatchData(id, bodyData);
}
