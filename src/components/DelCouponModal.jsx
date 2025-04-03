import { useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DelCouponModal({ tempCoupon, getCoupons, isOpen, setIsOpen }) {
  const delCouponModalRef = useRef(null);

  useEffect(() => {
    new Modal(delCouponModalRef.current, {
      backdrop: false,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(delCouponModalRef.current);
      modalInstance.show();
    }
  }, [isOpen]);

  const handleCloseDelProductModal = () => {
    const modalInstance = Modal.getInstance(delCouponModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
  };

  const deleteCoupon = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${tempCoupon.id}`
      );
    } catch (error) {
      console.error(error);
      alert("刪除優惠券失敗!");
    }
  };

  const handleDeleteCoupon = async () => {
    try {
      await deleteCoupon();
      getCoupons();
      handleCloseDelProductModal();
    } catch (error) {
      console.error(error);
      alert("刪除優惠券失敗");
    }
  };

  return (
    <div
      ref={delCouponModalRef}
      className="modal fade"
      id="delCouponModal"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除優惠券</h1>
            <button
              onClick={handleCloseDelProductModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            你是否要刪除
            <span className="text-danger fw-bold">{tempCoupon.title}</span>
          </div>
          <div className="modal-footer">
            <button
              onClick={handleCloseDelProductModal}
              type="button"
              className="btn btn-secondary"
            >
              取消
            </button>
            <button
              onClick={handleDeleteCoupon}
              type="button"
              className="btn btn-danger"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DelCouponModal;
