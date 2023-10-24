import "react-toastify/dist/ReactToastify.css";
import { getAccessTokenFromLocalStorage } from "../AuthUser/utils/LocalStorageUtils";
import Login from "../AuthUser/Login";
import Toast from "../Toast/Index";
import LayoutContainer from "./LayoutContainer/Index";

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
    return (
      <>
        <Toast />
        <LayoutContainer />
      </>
    );
  }
};

export default Layout;
