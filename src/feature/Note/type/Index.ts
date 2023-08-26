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
    type: string;
    id: string;
    attributes: {
      title: string;
      field_description: string;
    };
    relationships: {
      [key: string]: {
        data: NoteRelatedDataType;
      };
    } | {
      [key: string]: {
        data: NoteRelatedDataType[];
      };
    };
  };
};

export type NoteRelatedDataType = {
  label: string;
  value: string;
};

export type TmpRelatedDataType = {
  id: string;
  type: string,
}
