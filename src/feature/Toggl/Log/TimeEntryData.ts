import { getTogglApiTokenLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";

interface TogglDataItem {
  id: number;
  workspace_id: number;
  project_id: number;
  task_id: number | null;
  billable: boolean;
  start: string;
  stop: string;
  duration: number;
  description: string;
  tags: string[];
  tag_ids: number[];
  duronly: boolean;
  at: string;
  server_deleted_at: string | null;
  user_id: number;
  uid: number;
  wid: number;
  pid: number;
}

export interface SchedulerDataItem {
  startDate: string;
  endDate: string;
  title: string;
}

function convertSchedulerData(datas: TogglDataItem[]): SchedulerDataItem[] {
  return datas.map(item => ({
    startDate: item.start,
    endDate: item.stop,
    title: item.description
  }));
}

export async function fetchTimeEntryData(): Promise<SchedulerDataItem[]> {
  let TimeEntryData: SchedulerDataItem[] = [];
  const togglApiToken = getTogglApiTokenLocalStorage();
  if (togglApiToken) {
    try {
      const response = await fetch("/api/api/v9/me/time_entries", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(`${togglApiToken}:api_token`),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("APIリクエストが失敗しました");
      }

      const responseData: TogglDataItem[] = await response.json();
      TimeEntryData = convertSchedulerData(responseData);
      return TimeEntryData;
    } catch (error) {
      console.error("エラーが発生しました:", error);
      throw error;
    }
  }
  return TimeEntryData;
}
