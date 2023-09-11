export interface TogglEnttyDataItem {
  id: string;
  workspace_id: string;
  project_id: string;
  task_id: string | null;
  billable: boolean;
  start: string;
  stop: string;
  duration: string;
  description: string;
  tags: string[];
  tag_ids: string[];
  duronly: boolean;
  at: string;
  server_deleted_at: string | null;
  user_id: string;
  uid: string;
  wid: string;
  pid: string;
}

export interface SchedulerDataItem {
  start: string;
  end: string;
  title: string;
}
