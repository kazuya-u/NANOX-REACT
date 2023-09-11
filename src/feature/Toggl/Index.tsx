import { getTogglApiTokenLocalStorage } from "../AuthUser/utils/LocalStorageUtils";
import Auth from "./Auth/Index";
import Log from "./Log/Index";
import Timer from "./Timer/Index";

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
      <Timer />
      <Log />
    </>
  );
}

export default Index;
