import { getTogglApiTokenLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { TogglEnttyDataItem } from "../Type/Index";

export async function fetchCurrentTimeEntry(): Promise<TogglEnttyDataItem | null> {
  let CurrentTimeEntry: TogglEnttyDataItem | null = null;
  const togglApiToken = getTogglApiTokenLocalStorage();
  if (togglApiToken) {
    try {
      const response = await fetch("/api/api/v9/me/time_entries/current", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(`${togglApiToken}:api_token`),
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("APIリクエストが失敗しました");
      }
      return CurrentTimeEntry = await response.json();
    } catch (error) {
      console.error("エラーが発生しました:", error);
      throw error;
    }
  }
  return CurrentTimeEntry;
}
