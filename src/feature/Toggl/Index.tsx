import { getTogglApiTokenLocalStorage } from "../AuthUser/utils/LocalStorageUtils";
import Auth from "./Auth/Index";

const Index: React.FC = () => {
  const isTogglAuth = getTogglApiTokenLocalStorage();
  if (isTogglAuth == null) {
    return (
      <>
        <Auth />
      </>
    );
  }
  return (
    <>
      Togglログイン中...
    </>
  );
}

export default Index;
