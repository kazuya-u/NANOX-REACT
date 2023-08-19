import "react-toastify/dist/ReactToastify.css";
import { getUserIdFromLocalStorage } from "../AuthUser/utils/LocalStorageUtils";
import { ToastContainer } from "react-toastify";
import Login from "../AuthUser/Login";
import MainContent from "./MainContent";

const Layout: React.FC = () => {
  const isAuth = getUserIdFromLocalStorage();
  if (isAuth == null) {
    return <Login />;
  } else {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <MainContent />
      </>
    );
  }
};

export default Layout;
