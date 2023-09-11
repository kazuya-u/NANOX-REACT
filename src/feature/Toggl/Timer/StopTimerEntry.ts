import { getTogglApiTokenLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";

export async function StopTimerEntry(workspaceId: string, timeEntryId: string) {
  const endpoint = `/api/api/v9/workspaces/${workspaceId}/time_entries/${timeEntryId}/stop`;
  const togglApiToken = getTogglApiTokenLocalStorage();
  try {
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        Authorization: "Basic " + btoa(`${togglApiToken}:api_token`),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("APIリクエストが失敗しました");
    }
    return await response.json();
  } catch (error) {
    console.error("エラーが発生しました:", error);
    throw error;
  }
}
