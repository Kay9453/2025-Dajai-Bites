import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import Toast from "../components/Toast";
import PropTypes from "prop-types";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function OrderModal({ modalMode, tempOrder, isOpen, setIsOpen, getOrders }) {
  const [modalData, setModalData] = useState(tempOrder);
  const [orderProducts,setOrderProducts] = useState([]);
  
  // 當 tempOrder 有更新時，把 modalData 一起更新
  useEffect(() => {
    if (tempOrder?.products) {
      setOrderProducts(Object.entries(tempOrder.products));
    }
    setModalData({
      ...tempOrder,
    });
  }, [tempOrder]);

  const orderModalRef = useRef(null);

  useEffect(() => {
    new Modal(orderModalRef.current, {
      backdrop: false,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(orderModalRef.current);
      modalInstance.show();
    }
  }, [isOpen]);

  const handleCloseOrderModal = () => {
    const modalInstance = Modal.getInstance(orderModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
  };

  const handleModalInputChange = (e) => {
    const { value, name, checked, type } = e.target;

    if (name === "name" || name === "tel" || name === "email" || name === "address") {
      setModalData({
        ...modalData,
        user: {
          ...modalData.user,
          [name]: value,
        }
      });
    } else {
      setModalData({
        ...modalData,
        [name]: type === "checkbox" ? checked : value,
      });
    }

  };

  const updateOrder = async () => {
    try {
      await axios.put(
        `${BASE_URL}/v2/api/${API_PATH}/admin/order/${modalData.id}`,
        {
          data: {
            ...modalData,
          },
        }
      );
      Toast.fire({
        icon: "success",
        title: "編輯訂單成功!",
      });
    } catch (error) {
      console.error(error);
      // alert("編輯訂單失敗!");
      Swal.fire({
        title: "編輯訂單失敗",
        text: "請重新操作一次",
        icon: "error",
        confirmButtonText: "確定"
      });
    }
  };

  const handleUpdateOrder = async () => {
    const apiCall = modalMode === "create" ? "" : updateOrder;
    try {
      await apiCall();
      getOrders();
      handleCloseOrderModal();
    } catch (error) {
      console.error(error);
      // alert("更新訂單失敗!");
      Swal.fire({
        title: "更新訂單失敗",
        text: "請重新操作一次",
        icon: "error",
        confirmButtonText: "確定"
      });
    }
  };

  return (
    <div
      ref={orderModalRef}
      id="orderModal"
      className="modal"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fs-4">
              {modalMode === "create" ? "" : "編輯訂單"}
            </h5>
            <button
              type="button"
              onClick={handleCloseOrderModal}
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4">
            <div className="row g-4">
              <div className="col-md-10">
                <div className="d-flex">
                  <div className="mb-3 w-50">
                    <label htmlFor="create_at" className="form-label fw-bold">
                      訂單編號
                    </label>
                    <p className="" name="create_at" id="create_at">
                      {modalData.id}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="create_at" className="form-label fw-bold">
                      建立時間
                    </label>
                    <p className="" name="create_at" id="create_at">
                      {(new Date(modalData.create_at*1000)).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <h5 className="mb-2">訂購商品</h5>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">品項</th>
                        <th scope="col">數量</th>
                        <th scope="col">金額</th>
                        <th scope="col">折扣 %</th>
                        <th scope="col">折扣後的金額</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orderProducts.map((product)=>{
                          return (
                            <tr key={product[0]}>
                              <th scope="row">{product[1].product.title}</th>
                              <td>{product[1].qty}</td>
                              <td>{product[1].total}</td>
                              <td>{product[1].coupon?.percent ? product[1].coupon?.percent : 0}%</td>
                              <td>{product[1].final_total}</td>
                            </tr>
                          )
                        })
                      }
                      <tr>
                        <th scope="row">總金額</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{modalData.total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="">
                  <h5 className="mb-2">訂購人資訊</h5>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      訂購人
                    </label>
                    <input
                      value={modalData.user?.name}
                      onChange={handleModalInputChange}
                      name="name"
                      id="name"
                      type="text"
                      className="form-control"
                      placeholder="請輸入訂購人姓名"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tel" className="form-label">
                      聯絡電話
                    </label>
                    <input
                      value={modalData.user?.tel}
                      onChange={handleModalInputChange}
                      name="tel"
                      id="tel"
                      type="text"
                      className="form-control"
                      placeholder="請輸入電話"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      value={modalData.user?.email}
                      onChange={handleModalInputChange}
                      name="email"
                      id="email"
                      type="text"
                      className="form-control"
                      placeholder="請輸入信箱"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      地址
                    </label>
                    <input
                      value={modalData.user?.address}
                      onChange={handleModalInputChange}
                      name="address"
                      id="address"
                      type="text"
                      className="form-control"
                      placeholder="請輸入地址"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    訂單備註
                  </label>
                  <textarea
                    value={modalData.message}
                    onChange={handleModalInputChange}
                    name="message"
                    id="message"
                    className="form-control"
                    rows={4}
                    placeholder="請輸入備註"
                  ></textarea>
                </div>
                <div className="form-check">
                  <input
                    checked={modalData.is_paid}
                    onChange={handleModalInputChange}
                    name="is_paid"
                    type="checkbox"
                    className="form-check-input"
                    id="isPaided"
                  />
                  <label className="form-check-label" htmlFor="isPaided">
                    是否付款
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-top bg-light">
            <button
              type="button"
              onClick={handleCloseOrderModal}
              className="btn btn-secondary"
            >
              取消
            </button>
            <button
              onClick={handleUpdateOrder}
              type="button"
              className="btn btn-primary"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;

OrderModal.propTypes = {
  modalMode: PropTypes.oneOf(["edit"]),
  tempOrder: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  getOrders: PropTypes.func.isRequired
};
