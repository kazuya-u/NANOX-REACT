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

export interface TogglMeDataType {
  id: number;
  api_token: string;
  email: string;
  fullname: string;
  timezone: string;
  toggl_accounts_id: string;
  default_workspace_id: number;
  beginning_of_week: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  openid_email: string | null;
  openid_enabled: boolean;
  country_id: number;
  has_password: boolean;
  at: string;
  intercom_hash: string;
  oauth_providers: string[];
  projects: Project[];
  workspaces: Workspace[];
  time_entries: TogglEnttyDataItem[];
}

export interface Project {
  id: number;
  workspace_id: number;
  client_id: number;
  name: string;
  is_private: boolean;
  active: boolean;
  at: string;
  created_at: string;
  server_deleted_at: string | null;
  color: string;
  billable: number | null;
  template: number | null;
  auto_estimates: number | null;
  estimated_hours: number | null;
  rate: number | null;
  rate_last_updated: string | null;
  currency: string | null;
  recurring: boolean;
  recurring_parameters: string | null;
  current_period: string | null;
  fixed_fee: number | null;
  actual_hours: number;
  wid: number;
  cid: number;
}

interface Workspace {
  id: number;
  organization_id: number;
  name: string;
  profile: number;
  premium: boolean;
  business_ws: boolean;
  admin: boolean;
  role: string;
  suspended_at: string | null;
  server_deleted_at: string | null;
  default_hourly_rate: number | null;
  rate_last_updated: string | null;
  default_currency: string;
  only_admins_may_create_projects: boolean;
  only_admins_may_create_tags: boolean;
  only_admins_see_billable_rates: boolean;
  only_admins_see_team_dashboard: boolean;
  projects_billable_by_default: boolean;
  reports_collapse: boolean;
  rounding: number;
  rounding_minutes: number;
  api_token: string | null;
  at: string;
  logo_url: string;
  ical_url: string;
  ical_enabled: boolean;
  csv_upload: string | null;
  subscription: string | null;
  working_hours_in_minutes: number | null;
}
