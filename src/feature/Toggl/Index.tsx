import { getTogglApiTokenLocalStorage } from "../AuthUser/utils/LocalStorageUtils";
import Auth from "./Auth/Index";
import Log from "./Log/Index";

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
      
      <Log />
    </>
  );
}

export default Index;
