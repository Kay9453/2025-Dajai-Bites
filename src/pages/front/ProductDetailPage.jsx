import axios from "axios";
import Swiper from "swiper";
import ReactLoading from "react-loading";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCartData } from "../../redux/cartSlice";
import Toast from "../../components/Toast";

export default function ProductDetailPage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_PATH = import.meta.env.VITE_API_PATH;

  const { id } = useParams();

  const [isScreenLoading, setIsScreenLoading] = useState(false); //儲存全螢幕 Loading 狀態
  const [isLoading, setIsLoading] = useState(false); //儲存小 Loading 狀態

  const [product, setProduct] = useState({});
  const [qtySelect, setQtySelect] = useState(1);

  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState(() => {
    const initFavorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : {};
    return initFavorites;
  });

  const getProductDetail = useCallback(
    async (id) => {
      setIsScreenLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/v2/api/${API_PATH}/product/${id}`
        );
        
        setProduct(res.data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setIsScreenLoading(false);
      }
    },
    [BASE_URL, API_PATH]
  );

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
      alert("加入購物車失敗!");
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
      alert("取得購物車列表失敗");
    }
  }, [BASE_URL, API_PATH,dispatch]);

  const initSwiper = () => {
    new Swiper(".product-swiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: ".product-thumbs-swiper",
      },
      modules: [FreeMode, Navigation, Thumbs],
    });
    new Swiper(".product-thumbs-swiper", {
      spaceBetween: 10,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,

      modules: [FreeMode, Navigation, Thumbs],
    });
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
    getProductDetail(id);
  }, [id, getProductDetail]);

  useEffect(() => {
    if (product) {
      initSwiper();
    }
  }, [product]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-7">
            <div className="swiper product-swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img
                    src={product.imageUrl}
                    className="d-block w-100"
                    alt={product.title}
                  />
                </div>
                {(product.imagesUrl !== undefined) && (product.imagesUrl?.[0] !== "")
                  ? product.imagesUrl.map((imageUrl) => {
                    return (
                      <div key={imageUrl} className="swiper-slide">
                        <img
                          src={imageUrl}
                          className="d-block w-100"
                          alt=""
                        />
                      </div>
                    );
                  })
                  : ""}
              </div>
              <div className="swiper-pagination"></div>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
            <div thumbsSlider="" className="swiper product-thumbs-swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img
                    src={product.imageUrl}
                    className="d-block"
                    alt={product.title}
                  />
                </div>
                {product.imagesUrl !== undefined
                  ? product.imagesUrl.map((imageUrl) => {
                    return (
                      <div key={imageUrl} className="swiper-slide">
                        <img src={imageUrl} className="d-block" alt="" />
                      </div>
                    );
                  })
                  : ""}
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
          <div className="col-md-5">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                <li className="breadcrumb-item">
                  <Link className="text-muted" to="/">
                    首頁
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link className="text-muted" to="/products">
                    商品列表
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.title}
                </li>
              </ol>
            </nav>
            <h2 className="fw-bold h1 mb-1">{product.title}</h2>
            <p className="">{product.description}</p>
            <p className="mb-0 text-muted text-end">
              <del>NT${product.origin_price}</del>
            </p>
            <p className="h4 fw-bold text-end text-brand-04">
              NT${product.price}
            </p>
            <div className="row align-items-center">
              <div className="col-12">
                <div className="input-group my-3 bg-light rounded">
                  <select
                    value={qtySelect}
                    onChange={(e) => setQtySelect(e.target.value)}
                    id="qtySelect"
                    className="form-select"
                  >
                    {Array.from({ length: 10 }).map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="d-flex text-nowrap btn btn-brand-01 text-white w-50 d-flex gap-1"
                    onClick={() => {
                      addCartItem(product.id, qtySelect);
                    }}
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
                <div className="">
                  <button
                    type="button"
                    className="btn btn-brand-01 d-flex align-items-center gap-1"
                    style={{ backgroundColor: "transparent" }}
                    onClick={() => {
                      toggleFavoriteItem(product.id);
                    }}
                  >
                    <i
                      className={` bi ${
                        favorites[product.id]
                          ? "bi-heart-fill text-brand-01"
                          : "bi-heart text-brand-01"
                      } fs-5`}
                    ></i> {favorites[product.id] ? "已加入我的最愛": "加入我的最愛"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-12 mb-3">
            <h4 className="text-brand-03 mb-2">商品內容</h4>
            <p className="mb-1">內容物：{product.content}</p>
            <p className="mb-1">加熱方式：</p>
            <p className="mb-1" style={{ whiteSpace: "pre-line" }}>
              {product.cookingWay}
            </p>
          </div>
          <div className="col-12">
            <h4 className="text-brand-03 mb-2">商品成分</h4>
            <p className="mb-1">熱量：{product.calories} 大卡</p>
          </div>
          <div className="col-md-6 col-12">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <div className="fs-5 text-brand-01">
                      {product.nutritionalInfo?.protein}g
                    </div>
                    蛋白質
                  </td>
                  <td>
                    <div className="fs-5 text-brand-01">
                      {product.nutritionalInfo?.fat}g
                    </div>
                    脂肪
                  </td>
                  <td>
                    <div className="fs-5 text-brand-01">
                      {product.nutritionalInfo?.carbohydrates}g
                    </div>
                    碳水化合物
                  </td>
                  <td>
                    <div className="fs-5 text-brand-01">
                      {product.nutritionalInfo?.sugar}g
                    </div>
                    糖
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* <h3 className="fw-bold">猜你喜歡</h3>
        <div className="swiper mt-4 mb-5">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  className="card-img-top rounded-0"
                  alt="..."
                />
                <a href="#" className="text-dark"></a>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3">
                    <a href="#">Lorem ipsum</a>
                  </h4>
                  <p className="card-text mb-0">
                    NT$1,080
                    <span className="text-muted ">
                      <del>NT$1,200</del>
                    </span>
                  </p>
                  <p className="text-muted mt-3"></p>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  className="card-img-top rounded-0"
                  alt="..."
                />
                <a href="#" className="text-dark"></a>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3">
                    <a href="#">Lorem ipsum</a>
                  </h4>
                  <p className="card-text mb-0">
                    NT$1,080
                    <span className="text-muted ">
                      <del>NT$1,200</del>
                    </span>
                  </p>
                  <p className="text-muted mt-3"></p>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  className="card-img-top rounded-0"
                  alt="..."
                />
                <a href="#" className="text-dark"></a>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3">
                    <a href="#">Lorem ipsum</a>
                  </h4>
                  <p className="card-text mb-0">
                    NT$1,080
                    <span className="text-muted ">
                      <del>NT$1,200</del>
                    </span>
                  </p>
                  <p className="text-muted mt-3"></p>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  className="card-img-top rounded-0"
                  alt="..."
                />
                <a href="#" className="text-dark"></a>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3">
                    <a href="#">Lorem ipsum</a>
                  </h4>
                  <p className="card-text mb-0">
                    NT$1,080
                    <span className="text-muted ">
                      <del>NT$1,200</del>
                    </span>
                  </p>
                  <p className="text-muted mt-3"></p>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  className="card-img-top rounded-0"
                  alt="..."
                />
                <a href="#" className="text-dark"></a>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3">
                    <a href="#">Lorem ipsum</a>
                  </h4>
                  <p className="card-text mb-0">
                    NT$1,080
                    <span className="text-muted ">
                      <del>NT$1,200</del>
                    </span>
                  </p>
                  <p className="text-muted mt-3"></p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
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
  );
}
