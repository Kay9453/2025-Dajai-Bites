import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Toast from "../../components/Toast";

export default function ProductDetailPage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_PATH = import.meta.env.VITE_API_PATH;

  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [qtySelect, setQtySelect] = useState(1);

  const getProductDetail = async (id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/product/${id}`
      );

      setProduct(res.data.product);
    } catch (error) {
      console.error(error);
    }
  };

  // 加入購物車
  const addCartItem = async (product_id, qty) => {
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
        data: {
          product_id,
          qty: Number(qty),
        },
      });
      Toast.fire({
        icon: "success",
        title: "商品已加入購物車!",
      });
    } catch (error) {
      console.error(error);
      alert("加入購物車失敗!");
    }
  };

  useEffect(() => {
    getProductDetail(id);
  }, [id]);

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-7">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={product.imageUrl}
                    className="d-block w-100"
                    style={{ height: 400, objectFit: "cover" }}
                    alt={product.title}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
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
                    className="d-flex text-nowrap btn btn-brand-01 text-white w-50"
                    onClick={() => {
                      addCartItem(product.id, qtySelect);
                    }}
                  >
                    加入購物車
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
            <table class="table table-bordered">
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
      </div>
    </div>
  );
}
