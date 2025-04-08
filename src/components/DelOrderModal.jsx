import { useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import Toast from "../components/Toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DelOrderModal({ tempOrder, getOrders, isOpen, setIsOpen }) {
  const delOrderModalRef = useRef(null);

  useEffect(() => {
    new Modal(delOrderModalRef.current, {
      backdrop: false,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(delOrderModalRef.current);
      modalInstance.show();
    }
  }, [isOpen]);

  const handleCloseDelOrderModal = () => {
    const modalInstance = Modal.getInstance(delOrderModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
  };

  const deleteOrder = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/order/${tempOrder.id}`
      );
      Toast.fire({
        icon: "success",
        title: "刪除訂單成功!",
      });
    } catch (error) {
      console.error(error);
      // alert("刪除訂單失敗!");
      Swal.fire({
        title: "刪除訂單失敗",
        text: "請重新操作一次",
        icon: "error",
        confirmButtonText: "確定"
      });
    }
  };

  const handleDeleteOrder = async () => {
    try {
      await deleteOrder();
      getOrders();
      handleCloseDelOrderModal();
    } catch (error) {
      console.error(error);
      alert("刪除訂單失敗");
    }
  };

  return (
    <div
      ref={delOrderModalRef}
      className="modal fade"
      id="delOrderModal"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除訂單</h1>
            <button
              onClick={handleCloseDelOrderModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            你是否要刪除
            <span className="text-danger fw-bold">{tempOrder.title}</span>
          </div>
          <div className="modal-footer">
            <button
              onClick={handleCloseDelOrderModal}
              type="button"
              className="btn btn-secondary"
            >
              取消
            </button>
            <button
              onClick={handleDeleteOrder}
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

export default DelOrderModal;
