import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

export default function FrontLayout() {
  return (
    <div className="d-flex flex-column justify-content-between min-vh-100">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
