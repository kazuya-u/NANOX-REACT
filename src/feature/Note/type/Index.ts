export type NoteFormData = {
  title: string;
  description: string;
  project: {
    label: string;
    value: string;
  };
  status: {
    label: string;
    value: string;
  };
  tags: NoteRelatedData[];
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
        data: NoteRelatedData;
      };
    };
  };
};

export type NoteRelatedData = {
  type: string;
  id: string;
};
