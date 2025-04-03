import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../../components/Toast";
import { useDispatch } from "react-redux";
import { updateCartData } from "../../redux/cartSlice";

export default function HomePage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_PATH = import.meta.env.VITE_API_PATH;

  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState(() => {
    const initFavorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : {};
    return initFavorites;
  });

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

      dispatch(updateCartData(res.data.data));
      // setCart(res.data.data);
    } catch (error) {
      console.error(error);
      alert("取得購物車列表失敗");
    }
  }, [BASE_URL, API_PATH,dispatch]);

  // 加入購物車
  const addCartItem = async (product_id, qty) => {
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
      alert("加入購物車失敗!");
    }
  };

  const toggleFavoriteItem = (product_id) => {
    const newFavorites = {
      ...favorites,
      [product_id]: !favorites[product_id],
    };
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  useEffect(() => {
    getProducts();
    getCart();
  }, [getProducts,getCart]);

  return (
    <div className="container-fluid px-0">
      <div
        className="w-100 position-absolute"
        style={{
          height: "calc(100vh - 71px)",
          top: 71,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1497729695694-e0409368e309?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center center",
          opacity: 0.9,
          zIndex: -1,
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="container d-flex flex-column"
        style={{ minHeight: "calc(100vh - 71px)" }}
      >
        <div className="row my-auto">
          <div className="col-md-8 sec-banner-text" data-aos="fade-right">
            <h2 className="fs-1 text-white bg-brand-01 mb-3">
              美味早餐，輕鬆上桌！
            </h2>
            <p className="fs-4 fw-bold text-brand-01 bg-white mb-0">
              從產地到餐桌，簡單享受現做的美好滋味！
            </p>
            <Link
              to="/products"
              className="fs-5 btn btn-custom btn-outlined mt-4 d-flex align-items-center w-content"
            >
              <span className="material-symbols-outlined me-2">
                arrow_forward
              </span>
              立即選購
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid sec-features px-0">
        <div className="container">
          <div className="text-center pt-120">
            <h2 className="fs-1 text-brand-03">商品特色</h2>
            <p className="fs-4 text-brand-04 mt-3">Features</p>
          </div>
          <div className="row mt-40 pb-120">
            <div className="col-md-4" data-aos="fade-up">
              <div className="card border-0 mb-4">
                <img
                  src="Microwave.png"
                  className="card-img-top rounded-0"
                  alt="簡單方便"
                />
                <div className="card-body text-center">
                  <h4 className="card-title text-brand-03">簡單方便</h4>
                  <div className="d-flex justify-content-between">
                    <p className="card-text text-muted mb-0">
                      只要簡單組裝或加熱，就能享受美味的早餐。無需繁瑣的烹飪步驟，讓你的早晨更從容自在。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
              <div className="card border-0 mb-4">
                <img
                  src="Eat.png"
                  className="card-img-top rounded-0"
                  alt="低卡無負擔"
                />
                <div className="card-body text-center">
                  <h4 className="card-title text-brand-03">低卡無負擔</h4>
                  <div className="d-flex justify-content-between">
                    <p className="card-text text-muted mb-0">
                      清楚標示熱量與營養成分，享受美味的同時，無需擔心攝取過多的熱量，讓你吃得健康又安心。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="600">
              <div className="card border-0 mb-4">
                <img
                  src="Eco.png"
                  className="card-img-top rounded-0"
                  alt="環境友善"
                />
                <div className="card-body text-center">
                  <h4 className="card-title text-brand-03">環境友善</h4>
                  <div className="d-flex justify-content-between">
                    <p className="card-text text-muted mb-0">
                      與在地小農合作，嚴選當季食材，搭配可自然分解包裝，美味之餘，也為地球盡一份心力。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light">
        <div className="container sec-recommended">
          <div className="pt-120 d-flex justify-content-between align-items-center mb-5">
            <div className="d-flex gap-3 align-items-center">
              <h2 className="fs-1 text-brand-03">熱銷推薦</h2>
              <p className="fs-4 text-brand-04">Recommended</p>
            </div>
            <Link className="btn btn-custom btn-outlined" to="/products">
              查看更多
            </Link>
          </div>
          <div className="row pb-5 g-3">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="col-lg-3 col-md-6">
                <div className="card">
                  <div className="position-relative">
                    <img
                      src={product.imageUrl}
                      className="card-img-top"
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
                  <div className="card-body d-flex flex-column gap-3">
                    <h5 className="card-title">{product.title}</h5>
                    <div className="d-flex gap-2">
                      <span className="text-brand-04 fw-bold">
                        NT${product.origin_price}
                      </span>
                      <span>
                        <del className="text-custom-gray">NT${product.price}</del>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        addCartItem(product.id, 1);
                      }}
                      className="btn btn-custom btn-filled"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-brand-05">
        <div className="container pb-120">
          <div className="text-center pt-120">
            <h2 className="fs-1 text-brand-03">常見問題</h2>
            <p className="fs-4 text-brand-04 mt-3">Q & A</p>
          </div>
          <div className="row justify-content-center g-3 mt-40">
            <div className="col-lg-6 col-md-8 col-12" data-aos="fade-right">
              <div className="px-3 py-4 qa-card">
                <h4 className="card-title text-brand-03 mb-2">
                  Ｑ：你們的早餐需要自己煮嗎？
                </h4>
                <p className="card-text">
                  我們的商品為簡單加熱或輕鬆組裝，不需要繁瑣的烹飪步驟，即可快速享受美味早餐！
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-8 col-12" data-aos="fade-right">
              <div className="px-3 py-4 qa-card">
                <h4 className="card-title text-brand-03 mb-2">
                  Ｑ：食材有健康認證嗎？
                </h4>
                <p className="card-text">
                  我們選用在地小農當季食材，並標示完整營養資訊，讓你輕鬆掌握熱量與營養成分。
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-8 col-12" data-aos="fade-right" data-aos-delay="600">
              <div className="px-3 py-4 qa-card">
                <h4 className="card-title text-brand-03 mb-2">
                  Q：有哪些付款方式？
                </h4>
                <p className="card-text">
                  我們提供信用卡、ATM
                  轉帳、Linepay、貨到付款等多元支付方式，讓你輕鬆購物。
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-8 col-12" data-aos="fade-right" data-aos-delay="600">
              <div className="px-3 py-4 qa-card">
                <h4 className="card-title text-brand-03 mb-2">
                  Ｑ：配送方式有哪些？
                </h4>
                <p className="card-text">
                  配送送方式有超商（7-11、全家），可於結帳時進行選擇。
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-8 col-12" data-aos="fade-right" data-aos-delay="1200">
              <div className="px-3 py-4 qa-card">
                <h4 className="card-title text-brand-03 mb-2">
                  Ｑ：可以指定出貨時間嗎？
                </h4>
                <p className="card-text">
                  可以在訂單備註欄上備註指定出貨的時間唷！若需週六收件，可以在訂單備註欄上備註指定週六收件唷！
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-8 col-12" data-aos="fade-right" data-aos-delay="1200">
              <div className="px-3 py-4 qa-card">
                <h4 className="card-title text-brand-03 mb-2">
                  Ｑ：下單後多久會出貨？
                </h4>
                <p className="card-text">
                  下完訂單並完成付款手續後，將於 1 - 3
                  個工作天安排寄出。特殊商品或預購商品會在頁面上標示出貨時間。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
