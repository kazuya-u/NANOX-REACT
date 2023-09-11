import { getTogglApiTokenLocalStorage } from "../../AuthUser/utils/LocalStorageUtils";
import { TogglMeDataType } from "../Type/Index";

export async function getMe(): Promise<TogglMeDataType | null> {
  let MeData: TogglMeDataType | null = null;
  const togglApiToken = getTogglApiTokenLocalStorage();
  if (togglApiToken) {
    try {
      const response = await fetch("/api/api/v9/me?with_related_data=true", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(`${togglApiToken}:api_token`),
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("APIリクエストが失敗しました");
      }
      return MeData = await response.json();
    } catch (error) {
      console.error("エラーが発生しました:", error);
      throw error;
    }
  }
  return MeData;
}
