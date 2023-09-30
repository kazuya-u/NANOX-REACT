import "react-toastify/dist/ReactToastify.css";
import { getUserIdFromLocalStorage } from "../AuthUser/utils/LocalStorageUtils";
import Login from "../AuthUser/Login";
import Toast from "../Toast/Index";
import LayoutContainer from "./LayoutContainer/Index";

const Layout: React.FC = () => {
  const isAuth = getUserIdFromLocalStorage();
  if (isAuth == null) {
    return <Login />;
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
