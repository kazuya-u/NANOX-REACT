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

export type TaskBodyDataType = {
  data: {
    type: string;
    id: string;
    attributes: {
      title: string;
      field_description: string;
    };
  };
  included: Array<RelationData>;
};

type RelationData = {
  attributes: {
    name: string;
  };
  type: string;
};

export type TaskRelatedData = {
  type: string;
  id: string;
};
