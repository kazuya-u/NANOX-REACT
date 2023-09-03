export type NoteFormData = {
  title: string;
  description: string;
  project: {
    label: string;
    value: string;
  };
  tags: NoteRelatedDataType[];
};

export type NoteBodyDataType = {
  data: {
    type?: string;
    id?: string;
    attributes?: {
      title?: string;
      field_description?: string;
    };
    relationships?: {
      field_ref_project?: {
        data: NoteRelatedDataType | null;
      };
      field_ref_tags?: {
        data: NoteRelatedDataType;
      };
    };
  };
};

export type NoteRelatedDataType = {
  type?: string;
  id?: string;
  attributes?: {
    name: string;
  };
};

export type TmpRelatedDataType = {
  id: string;
  type: string,
}
