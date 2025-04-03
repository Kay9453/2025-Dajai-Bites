import { useEffect, useState } from "react";
import axios from "axios";

import Pagination from "../../components/Pagination";
import ProductModal from "../../components/ProductModal";
import DelProductModal from "../../components/DelProductModal";
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""],
  cookingWay: "",
  calories: 0,
  nutritionalInfo:{
    carbohydrates: 0,
    fat: 0,
    protein: 0,
    sugar: 0
  }
};

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);

  const [modalMode, setModalMode] = useState(null);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false); //控制 productModal 開關
  const [isDelProductModalOpen, setIsDelProductModalOpen] = useState(false); //控制 DelProductModal 開關

  const [isScreenLoading, setIsScreenLoading] = useState(false); //儲存全螢幕 Loading 狀態

  const navigate = useNavigate();

  const getProducts = async (page = 1) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      );
      setProducts(res.data.products);
      console.log(res.data.products)
      setPageInfo(res.data.pagination);
    } catch (error) {
      console.error(error);
      alert("取得產品失敗");
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
      getProducts();
    } else {
      // alert('請先登入')
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleOpenProductModal = (mode, product) => {
    setModalMode(mode);

    switch (mode) {
    case "create":
      setTempProduct(defaultModalState);
      break;
    case "edit":
      setTempProduct({
        ...product,
        imagesUrl: product.imagesUrl ? product.imagesUrl : [""], // 確保 imagesUrl 存在
      });
      break;
    default:
      break;
    }

    setIsProductModalOpen(true);
  };

  const handleOpenDelProductModal = (product) => {
    setTempProduct(product);
    setIsDelProductModalOpen(true);
  };

  const [tempProduct, setTempProduct] = useState(defaultModalState);

  const [pageInfo, setPageInfo] = useState({}); //儲存頁面資訊

  const handlePageChange = (page) => {
    getProducts(page);
  };

  return (
    <>
      <main className="admin-content container d-flex flex-column justify-content-between">
        <div>
          <div className="py-4 d-flex justify-content-between gap-3">
            <h3>商品列表</h3>
            <button
              type="button"
              onClick={() => {
                handleOpenProductModal("create");
              }}
              className="btn btn-filled"
            >
              建立新的產品
            </button>
          </div>
        </div>
        <div>
          <div className="admin-table-content overflow-y-auto">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>
                      {product.is_enabled ? (
                        <span className="text-success">啟用</span>
                      ) : (
                        <span>未啟用</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          onClick={() => {
                            handleOpenProductModal("edit", product);
                          }}
                          className="btn btn-outline-primary btn-sm"
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleOpenDelProductModal(product);
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
            <Pagination
              pageInfo={pageInfo}
              handlePageChange={handlePageChange}
            />
          </div>
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
      <ProductModal
        tempProduct={tempProduct}
        getProducts={getProducts}
        modalMode={modalMode}
        isOpen={isProductModalOpen}
        setIsOpen={setIsProductModalOpen}
      />
      <DelProductModal
        tempProduct={tempProduct}
        getProducts={getProducts}
        isOpen={isDelProductModalOpen}
        setIsOpen={setIsDelProductModalOpen}
      />
    </>
  );
  
}
