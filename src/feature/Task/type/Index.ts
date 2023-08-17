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
    attributes: {
      title: string;
      field_description: string;
    };
    relationships: {
      [key: string]: {
        data: TaskRelatedData;
      };
    };
  };
};

export type TaskRelatedData = {
  type: string;
  id: string;
};