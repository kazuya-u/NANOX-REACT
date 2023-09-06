import { BASE_API_URL } from "../utils/EndPoint";
import { getUserIdFromLocalStorage } from "../feature/AuthUser/utils/LocalStorageUtils";
import { useFetchData } from "../utils/fetchData";
import { useState } from "react";

type UserDateType = {
  data: {
    attributes: {
      field_toggl_api_token: string;
    };
  };
};

type TogglSessionDateType = {
  fullname: string;
}

const Toggl: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string | null>(null);
  const currentUUID = getUserIdFromLocalStorage();
  const { data: profileSettings } = useFetchData<UserDateType>(
    `${BASE_API_URL}/jsonapi/user/user/${currentUUID}`
  );
  const togglToken = profileSettings?.data.attributes.field_toggl_api_token;
  if (togglToken) {
    fetch("/api/api/v9/me", {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(`${togglToken}:api_token`),
      },
    })
      .then((resp) => resp.json())
      .then((responseData: TogglSessionDateType) => {
        setFullName(responseData.fullname);
        setLoading(false);
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error);
      });
    return (
      <>
        {loading ? (
          "Loading..."
        ) : (
          `${fullName} で Toggl ログイン中...`
        )}
      </>
    );
  }
};

export default Toggl;
