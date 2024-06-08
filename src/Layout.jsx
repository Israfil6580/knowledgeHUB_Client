import { Outlet } from "react-router-dom";
import { Navbar } from "./Components/Common_Components/Navbar";
import { Footer } from "./Components/Common_Components/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
