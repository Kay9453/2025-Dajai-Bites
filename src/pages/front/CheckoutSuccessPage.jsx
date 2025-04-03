import { Link } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";

export default function CheckoutSuccessPage() {
  return (
    <div className="container">
      <ProgressBar currentStep={5} />
      <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column justify-content-center">
          <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
            <img src="checkout-success.png" className="" alt="訂單建立成功" />
            <h3 className="fs-2 text-brand-03">訂單建立成功</h3>
          </div>
          <div className="d-flex justify-content-center gap-3 mt-4 mt-lg-5 mb-5 mb-lg-60">
            <Link to="/" className="btn-custom btn-filled text-nowrap">
              回首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
