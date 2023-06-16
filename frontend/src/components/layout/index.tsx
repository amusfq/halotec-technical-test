import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: "240px" }}>
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
