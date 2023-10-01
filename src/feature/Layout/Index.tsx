import "react-toastify/dist/ReactToastify.css";
import { getAccessTokenFromLocalStorage, getUserSettingsIdFromLocalStorage } from "../AuthUser/utils/LocalStorageUtils";
import Login from "../AuthUser/Login";
import Toast from "../Toast/Index";
import LayoutContainer from "./LayoutContainer/Index";
import { getUserSettinsUUID } from "../AuthUser/utils/ApiUtils";

const Layout: React.FC = () => {
  const isAuthAccessToken = getAccessTokenFromLocalStorage();
  
  if (isAuthAccessToken == null) {
    return (
      <>
        <Toast />
        <Login />
      </>
    )
    ;
  } else {
    const currentUserUUID = getAccessTokenFromLocalStorage();
    if (currentUserUUID || !getUserSettingsIdFromLocalStorage()) {
      getUserSettinsUUID();
    }
    return (
      <>
        <Toast />
        <LayoutContainer />
      </>
    );
  }
};

export default Layout;
