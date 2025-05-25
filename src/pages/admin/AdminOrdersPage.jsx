import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import OrderModal from "../../components/OrderModal";
import Pagination from "../../components/Pagination";
import DelOrderModal from "../../components/DelOrderModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  message: "",
  user: {
    address: "",
    email: "",
    name: "",
    tel: ""
  },
  is_paid: 0,
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [modalMode, setModalMode] = useState(null);

  const [tempOrder, setTempOrder] = useState(defaultModalState);
  const [pageInfo, setPageInfo] = useState({}); //儲存頁面資訊

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false); //控制 orderModal 開關
  const [isDelOrderModalOpen, setIsDelOrderModalOpen] = useState(false); //控制 DelOrderModal 開關

  const [isScreenLoading, setIsScreenLoading] = useState(false); //儲存全螢幕 Loading 狀態

  const navigate = useNavigate();

  const getOrders = async (page = 1) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/orders?page=${page}`
      );
      setOrders(res.data.orders);
      setPageInfo(res.data.pagination);
    } catch (error) {
      console.error(error);
      alert("取得訂單失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      getOrders();
    } else {
      // alert('請先登入')
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleOpenOrderModal = (mode, order) => {
    setModalMode(mode);

    switch (mode) {
    case "edit":
      setTempOrder({
        ...order,
      });
      break;
    default:
      break;
    }

    setIsOrderModalOpen(true);
  };

  const handleOpenDelOrderModal = (order) => {
    setTempOrder(order);
    setIsDelOrderModalOpen(true);
  };

  const handlePageChange = (page) => {
    getOrders(page);
  };

  return (
    <>
      <main className="admin-content container d-flex flex-column justify-content-between">
        <div>
          <div className="py-4 d-flex justify-content-between gap-3">
            <h3>訂單列表</h3>
          </div>
        </div>
        <div>
          <div className="admin-table-content overflow-y-auto">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">訂單時間</th>
                  <th scope="col">訂單金額</th>
                  <th scope="col">訂購人</th>
                  <th scope="col">是否付款</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>{new Date(order.create_at * 1000).toLocaleString()}</td>
                    <td>{order.total?.toLocaleString()}</td>
                    <td>{order.user.name}</td>
                    <td>{order.is_paid ? (
                      <span className="text-success">已付款</span>
                    ) : (
                      <span>未付款</span>
                    )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          onClick={() => {
                            handleOpenOrderModal("edit", order);
                          }}
                          className="btn btn-outline-primary btn-sm"
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleOpenDelOrderModal(order);
                          }}
                          className="btn btn-outline-danger btn-sm"
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            pageInfo={pageInfo}
            handlePageChange={handlePageChange}
          />
          {isScreenLoading && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(255,255,255,0.3)",
                zIndex: 999,
              }}
            >
              <ReactLoading
                type="spin"
                color="black"
                width="4rem"
                height="4rem"
              />
            </div>
          )}
        </div>
      </main>
      <OrderModal
        tempOrder={tempOrder}
        getOrders={getOrders}
        modalMode={modalMode}
        isOpen={isOrderModalOpen}
        setIsOpen={setIsOrderModalOpen}
      />
      <DelOrderModal
        tempOrder={tempOrder}
        getOrders={getOrders}
        isOpen={isDelOrderModalOpen}
        setIsOpen={setIsDelOrderModalOpen}
      />
    </>
  );
}
