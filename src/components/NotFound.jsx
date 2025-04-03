import { useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "./common/Header";
import Footer from "./common/Footer";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="d-flex flex-column justify-content-between min-vh-100">
      <Header />
      <div className="container">
        <div className="d-flex flex-column align-items-center p-5">
          <img className="mb-4 px-md-5" src="notfound.png" alt="error" />
          <h6>
            啊呀。･ﾟ･(つд`ﾟ)･ﾟ･無此頁面。即將為您傳送回首頁繼續探索美食...
          </h6>
        </div>
      </div>
      <Footer />
    </div>
  );
}
