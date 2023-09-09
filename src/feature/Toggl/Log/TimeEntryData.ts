import { getTogglApiTokenLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { SchedulerDataItem, TogglEnttyDataItem } from "../Type/Index";


function convertSchedulerData(datas: TogglEnttyDataItem[]): SchedulerDataItem[] {
  return datas.map(item => ({
    start: item.start,
    end: item.stop,
    title: item.description,
    // color: "#d7d7d7",
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

      const responseData: TogglEnttyDataItem[] = await response.json();
      TimeEntryData = convertSchedulerData(responseData);
      return TimeEntryData;
    } catch (error) {
      console.error("エラーが発生しました:", error);
      throw error;
    }
  }
  return TimeEntryData;
}
