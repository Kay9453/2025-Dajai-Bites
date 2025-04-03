import axios from "axios";
import Toast from "../../components/Toast";
import { useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ProgressBar from "../../components/ProgressBar";

export default function CartPage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_PATH = import.meta.env.VITE_API_PATH;

  const [cart, setCart] = useState({}); //儲存購物車列表
  const [products, setProducts] = useState([]);
  const [coupon,setCoupon] = useState("");

  const swiperRef = useRef();

  useEffect(() => {
    if (products.length > 0) {
      new Swiper(swiperRef.current, {
        modules: [Autoplay],
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
          767: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });
    }
  }, [products]);

  const getProducts = useCallback(async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/products/all`
      );
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  }, [BASE_URL, API_PATH]);

  // 取得購物車
  const getCart = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      console.log("購物車裡的東西",res.data.data);
      
      setCart(res.data.data);
    } catch (error) {
      console.error(error);
      alert("取得購物車列表失敗");
    }
  }, [BASE_URL, API_PATH]);

  // 清空購物車
  const removeCart = async () => {
    const result = await Swal.fire({
      title: "你確定要刪除所有品項?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#99C180",
      cancelButtonColor: "#FF5049",
      confirmButtonText: "刪除",
      cancelButtonText: "取消",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
        getCart();
        Toast.fire({
          icon: "success",
          title: "購物車已清空!",
        });
      } catch (error) {
        console.error(error);
        alert("清空購物車失敗!");
      }
    }
  };

  // 購物車刪除單一品項
  const removeCartItem = async (cartItem_id) => {
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`);
      Toast.fire({
        icon: "success",
        title: "刪除單一商品成功!",
      });
      getCart();
    } catch (error) {
      console.error(error);
      alert("刪除單一商品失敗!");
    }
  };

  // 調整購物車產品數量
  const updateCartItem = async (cartItem_id, product_id, cartItem_qty) => {
    try {
      await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`, {
        data: {
          product_id,
          qty: Number(cartItem_qty),
        },
      });
      getCart();
    } catch (error) {
      console.error(error);
      alert("更新購物車商品數量失敗!");
    }
  };

  const handleCoupon = async (coupon_code) => {
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/coupon`,{
        data: {
          code: coupon_code
        }
      })
      Toast.fire({
        icon: "success",
        title: "已套用優惠券",
      });
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
      
    } finally {
      getCart();
    }
  };

  useEffect(() => {
    getCart();
    getProducts();
  }, [getCart, getProducts]);

  return (
    <div className="container-fluid">
      <div className="container">
        <ProgressBar currentStep={1} />
        <div className="mt-3">
          <h3 className="mt-3 mb-4">購物車</h3>
          <div className="row">
            <div className="col-md-8">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="border-0 ps-0">
                      品項
                    </th>
                    <th scope="col" className="border-0">
                      數量
                    </th>
                    <th scope="col" className="border-0">
                      金額
                    </th>
                    <th scope="col" className="border-0"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.carts?.length === 0 ? (
                    <td colSpan={4}>
                      <div className="d-flex flex-column align-items-center gap-2 pt-3">
                        購物車裡沒有東西
                        <Link
                          to="/products"
                          className="btn btn-filled w-content"
                        >
                          去逛逛
                        </Link>
                      </div>
                    </td>
                  ) : (
                    cart.carts?.map((cartItem) => {
                      return (
                        <tr
                          key={cartItem.id}
                          className="border-bottom border-top"
                        >
                          <th
                            scope="row"
                            className="border-0 px-0 font-weight-normal py-4"
                          >
                            <img
                              src={cartItem.product.imageUrl}
                              alt={cartItem.product.title}
                              style={{
                                width: "72px",
                                height: "72px",
                                objectFit: "cover",
                              }}
                            />
                            <p className="mb-0 fw-bold ms-3 d-inline-block">
                              {cartItem.product.title}
                            </p>
                          </th>
                          <td
                            className="border-0 align-middle"
                            style={{ maxWidth: "160px" }}
                          >
                            <div className="input-group pe-5">
                              <div className="input-group-prepend">
                                <button
                                  className="btn btn-outline-dark border-0 py-2"
                                  type="button"
                                  id="button-addon1"
                                  onClick={() => {
                                    updateCartItem(
                                      cartItem.id,
                                      cartItem.product_id,
                                      cartItem.qty - 1
                                    );
                                  }}
                                  disabled={cartItem.qty === 1}
                                >
                                  <i className="bi bi-dash-lg"></i>
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control border-0 text-center my-auto shadow-none"
                                placeholder=""
                                aria-label="Example text with button addon"
                                aria-describedby="button-addon1"
                                value={cartItem.qty}
                                readOnly
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-dark border-0 py-2"
                                  type="button"
                                  id="button-addon2"
                                  onClick={() => {
                                    updateCartItem(
                                      cartItem.id,
                                      cartItem.product_id,
                                      cartItem.qty + 1
                                    );
                                  }}
                                >
                                  <i className="bi bi-plus-lg"></i>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="border-0 align-middle">
                            <p className="mb-0 ms-auto">
                              NT${cartItem.total?.toLocaleString()}
                            </p>
                          </td>
                          <td className="border-0 align-middle">
                            <button
                              onClick={() => {
                                removeCartItem(cartItem.id);
                              }}
                              className="btn btn-outline-dark border-0 py-2"
                              type="button"
                              id="button-addon2"
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              {/* 優惠券 */}
              <div className={`input-group w-50 mb-3 ${cart.carts?.length === 0 ? "d-none":""}`}>
                <input
                  value={coupon}
                  onChange={(e)=>{
                    setCoupon(e.target.value)
                  }}
                  type="text"
                  className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
                  placeholder="請輸入優惠券"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <div className="input-group-append">
                  <button
                    onClick={()=>{
                      handleCoupon(coupon);
                    }}
                    className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
                    type="button"
                    id="button-addon2"
                  >
                    <i className="bi bi-send"></i>
                  </button>
                </div>
              </div>
              <div
                className={`d-flex justify-content-end ${
                  cart.carts?.length === 0 ? "d-none" : ""
                }`}
              >
                <button
                  onClick={() => {
                    removeCart();
                  }}
                  type="button"
                  className="btn-sm btn-outlined"
                  style={{ fontSize: 14, borderRadius: 4 }}
                >
                  清空購物車
                </button>
              </div>
            </div>
            <div className="col-md-4 mt-4 mt-md-0">
              <div className="border p-4 mb-4">
                <h4 className="fw-bold mb-4">訂單摘要</h4>
                <table className="table text-muted border-bottom">
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-4 font-weight-normal"
                      >
                        商品總計
                      </th>
                      <td className="text-end border-0 px-0 pt-4">
                        NT${cart.total?.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                      >
                        折扣
                      </th>
                      <td className="text-end border-0 px-0 pt-0 pb-4">
                        -NT${(cart.total-cart.final_total)?.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">總金額</p>
                  <p className="mb-0 h4 fw-bold">
                    NT${cart.final_total?.toLocaleString()}
                  </p>
                </div>
                <Link to="/checkout" className={`btn btn-dark w-100 mt-4 ${cart.carts?.length === 0 ? "disabled":""}`}>
                  前往結賬
                </Link>
              </div>
            </div>
          </div>
          <div className="my-5">
            <h3 className="fw-bold">猜你喜歡</h3>
            <div className="swiper mt-4 mb-5" ref={swiperRef}>
              <div className="swiper-wrapper">
                {products.map((product) => {
                  return (
                    <div key={product.id} className="swiper-slide">
                      <div className="card border-0 mb-4 position-relative position-relative">
                        <img
                          src={product.imageUrl}
                          className="card-img-top rounded-0"
                          alt={product.title}
                          style={{ height: 277, objectFit: "cover" }}
                        />
                        <Link to="/" className="text-dark"></Link>
                        <div className="card-body p-0">
                          <h4 className="mb-0 mt-3">
                            <Link
                              to={`/products/${product.id}`}
                              target="_blank"
                            >
                              {product.title}
                            </Link>
                          </h4>
                          <p className="card-text mb-0 d-flex gap-2">
                            <span className="text-brand-04 fw-bold">
                              NT${product.price}
                            </span>
                            <del className="text-custom-gray">NT${product.origin_price}</del>
                          </p>
                          <p className="text-muted mt-3"></p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
