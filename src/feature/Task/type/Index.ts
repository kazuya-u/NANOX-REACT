export type TaskFormData = {
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
  tags: TaskRelatedData[];
};

export type TaskDataType = {
  data: {
    type: string;
    id?: string;
    attributes?: {
      title?: string;
      field_description?: string;
      field_deadline?: string;
    };
    relationships?: TaskRelatedDataType;
  };
  included?: Array<RelationData>;
};

export type TaskRelatedDataType = {
  field_ref_project?: {
    data: TaskRelatedData | null;
  };
  field_ref_status?: {
    data: TaskRelatedData | null;
  };
  field_ref_tag?: {
    data: TaskRelatedData[];
  };
}

export type RelationDatas = {
  data: Array<RelationData>;
};

export type RelationData = {
  type: string;
  id: string;
  attributes: {
    title: string;
  };
};

export type TaskRelatedData = {
  type: string;
  id: string;
};
