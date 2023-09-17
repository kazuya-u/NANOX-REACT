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

export type NoteDataType = {
  data: {
    type: string;
    id?: string;
    attributes?: {
      title?: string;
      field_description?: string;
    };
    relationships?: NoteRelatedDataType;
  };
  included?: Array<RelationData>;
};

export type NoteRelatedDataType = {
  field_ref_project?: {
    data: NoteRelatedData | null;
  };
  field_ref_status?: {
    data: NoteRelatedData | null;
  };
  field_ref_tags?: {
    data: NoteRelatedData[];
  };
}

export type RelationDatas = {
  data: Array<RelationData>;
};

export type RelationData = {
  type: string;
  id: string;
  attributes: {
    name: string;
  };
};

export type NoteRelatedData = {
  type: string;
  id: string;
};
