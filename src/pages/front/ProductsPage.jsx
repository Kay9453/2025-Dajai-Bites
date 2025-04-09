import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import Toast from "../../components/Toast";
import { useDispatch } from "react-redux";
import { updateCartData } from "../../redux/cartSlice";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProductsPage() {

  const [isScreenLoading, setIsScreenLoading] = useState(false); //儲存全螢幕 Loading 狀態
  const [isLoading, setIsLoading] = useState(false); //儲存小 Loading 狀態

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("全部");

  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState(() => {
    const initFavorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : {};
    return initFavorites;
  });

  const getProducts = useCallback(async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/products/all`
      );

      setProducts(res.data.products);
      getCategory(res.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setIsScreenLoading(false);
    }
  }, []);

  // 取得分類
  const getCategory = (products) => {
    const categoryArr = [
      "全部",
      ...new Set(products.map((product) => product.category)),
    ];
    setCategory(categoryArr);
  };

  // 加入購物車
  const addCartItem = async (product_id, qty) => {
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
        data: {
          product_id,
          qty: Number(qty),
        },
      });
      getCart();
      Toast.fire({
        icon: "success",
        title: "商品已加入購物車!",
      });
    } catch (error) {
      console.error(error);
      // alert("加入購物車失敗!");
      Swal.fire({
        title: "加入購物車失敗",
        text: "請重新操作一次",
        icon: "error",
        confirmButtonText: "確定"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 取得購物車
  const getCart = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);

      dispatch(updateCartData(res.data.data));
      // setCart(res.data.data);
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

  const toggleFavoriteItem = (product_id) => {
    const isFavorited = !favorites[product_id];
    const newFavorites = {
      ...favorites,
      [product_id]: isFavorited,
    };
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);

    if (isFavorited) {
      Toast.fire({
        icon: "success",
        title: "已加入我的最愛",
      });
    } else {
      Toast.fire({
        icon: "success",
        title: "已移除我的最愛",
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="container-fluid">
      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ minHeight: "400px" }}
      >
        <div
          className="position-absolute"
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1629380072264-cf7495d7abcf?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundPosition: "center center",
            opacity: 0.9,
            zIndex: -1,
          }}
        ></div>
        <h2 className="fw-bold text-brand-05">早餐新選擇，美味自己動手！</h2>
      </div>
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          <div className="col-md-4">
            <div
              className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
              id="accordionExample"
            >
              <div className="card border-0">
                <div
                  className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                  id="headingOne"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h4 className="mb-0">商品分類</h4>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body py-0">
                    <ul className="list-unstyled">
                      {category.map((item) => {
                        return (
                          <li key={item}>
                            <Link
                              type="button"
                              data-value={item}
                              onClick={(e) => {
                                setSelectedCategory(e.target.dataset.value);
                              }}
                              className="py-2 d-block text-muted"
                            >
                              {item}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              {products
                .filter(
                  (product) =>
                    product.category === selectedCategory ||
                    selectedCategory === "全部"
                )
                .map((product) => {
                  return (
                    <div key={product.id} className="col-md-6">
                      <div className="card border-0 mb-4">
                        <div className="position-relative">
                          <img
                            src={product.imageUrl}
                            className="card-img-top rounded-0"
                            style={{ height: 280, objectFit: "cover" }}
                            alt={product.title}
                          />
                          <button
                            type="button"
                            className="border-0 add-fav-icon"
                            style={{ backgroundColor: "transparent" }}
                            onClick={() => {
                              toggleFavoriteItem(product.id);
                            }}
                          >
                            <i
                              className={` bi ${
                                favorites[product.id]
                                  ? "bi-heart-fill text-brand-01"
                                  : "bi-heart text-white"
                              } fs-5`}
                            ></i>
                          </button>
                        </div>
                        <div className="card-body p-0">
                          <h4 className="mb-0 mt-3">
                            <Link to={`/products/${product.id}`}>
                              {product.title}
                            </Link>
                          </h4>
                          <div className="d-flex mt-1">
                            <p className="card-text mb-0 text-brand-04 fw-bold me-2">
                              NT${product.price}
                            </p>
                            <span className="text-muted ">
                              <del>NT${product.origin_price}</del>
                            </span>
                          </div>
                          <div className="mt-2 d-flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                addCartItem(product.id, 1);
                              }}
                              className="btn btn-custom-sm btn-filled text-nowrap d-flex gap-2 justify-content-center w-100"
                            >
                              加入購物車
                              {isLoading && (
                                <ReactLoading
                                  type={"spin"}
                                  color={"#000"}
                                  height={"1.5rem"}
                                  width={"1.5rem"}
                                />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
        </div>
      </div>
    </div>
  );
}
