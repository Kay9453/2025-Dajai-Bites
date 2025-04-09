import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCartData } from "../../redux/cartSlice";
import { useCallback, useEffect } from "react";
import ProgressBar from "../../components/ProgressBar";
import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CheckoutSuccessPage() {

  const dispatch = useDispatch();

  // 取得購物車
  const getCart = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      // setCart(res.data.data);
      dispatch(updateCartData(res.data.data));      
    } catch (error) {
      console.error(error);
      // alert("取得購物車列表失敗");
      Swal.fire({
        title: "取得購物車列表失敗",
        icon: "error",
        confirmButtonText: "確定"
      });
    }
  }, [dispatch]);

  useEffect(()=>{
    getCart();
  },[getCart])

  return (
    <div className="container">
      <ProgressBar currentStep={4} />
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
