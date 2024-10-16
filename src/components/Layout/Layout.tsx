// Layout.tsx
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div>
      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
