import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";

export default function ProductsPage() {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const API_PATH = import.meta.env.VITE_API_PATH;

    const navigate = useNavigate();

    // const [isScreenLoading, setIsScreenLoading] = useState(false);  //儲存全螢幕 Loading 狀態
    // const [isLoading, setIsLoading] = useState(false);  //儲存小 Loading 狀態
    
    const [products,setProducts] = useState([]);
    const [category,setCategory] = useState([]);

    const [selectedCategory,setSelectedCategory] = useState("全部");


    const getProducts = async () =>{
        try {
            const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products/all`);
            console.log("取得陣列",res.data.products);
            
            setProducts(res.data.products);
            getCategory(res.data.products);
        } catch (error) {
            console.error(error);
        }
    }

    // 取得分類
    const getCategory = (products)=>{
        const categoryArr = ["全部",...new Set(products.map((product)=>product.category))];
        console.log(categoryArr);
        setCategory(categoryArr);
    }

    // 加入購物車
    const addCartItem = async (product_id, qty) => {
        try {
            await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`,{
                data:{
                product_id,
                qty: Number(qty)
                }
            })
            Toast.fire({
                icon: "success",
                title: "商品已加入購物車!",
            });
        } catch (error) {
            console.error(error);
            alert("加入購物車失敗!");
        }
    }

    useEffect(()=>{
        getProducts();
    },[])



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
                        {
                            category.map((item)=>{
                                return(
                                    <>
                                        <li>
                                            <Link 
                                                type="button"
                                                data-value={item}
                                                onClick={(e)=>{
                                                    console.log(e.target.value)
                                                    setSelectedCategory(e.target.dataset.value);
                                                }} 
                                                className="py-2 d-block text-muted">
                                                {item}
                                            </Link>
                                        </li>
                                    </>
                                )
                            })
                        }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
                {
                    products.filter((product)=> (product.category === selectedCategory) || selectedCategory === "全部").map((product)=>{
                        return (
                            <div key={product.id} className="col-md-6">
                                <div className="card border-0 mb-4 position-relative position-relative">
                                <img
                                    src={product.imageUrl}
                                    className="card-img-top rounded-0"
                                    style={{height: 280, objectFit: "cover"}}
                                    alt={product.title}
                                />
                                <Link to="/" className="text-dark">
                                    <i
                                    className="far fa-heart position-absolute"
                                    style={{ right: "16px", top: "16px" }}
                                    ></i>
                                </Link>
                                <div className="card-body p-0">
                                    <h4 className="mb-0 mt-3">
                                        <Link to={`/products/${product.id}`}>{product.title}</Link>
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
                                            onClick={()=>{addCartItem(product.id,1)}} 
                                            className="btn btn-custom-sm btn-outlined text-nowrap">
                                                加入購物車
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={async()=>{ await addCartItem(product.id,1); navigate("/cart")}} 
                                            className="btn btn-custom-sm btn-filled text-nowrap">
                                                直接購買
                                        </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        )
                        })
                    }
            </div>
            {/* <nav className="d-flex justify-content-center">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav> */}
          </div>
        </div>
      </div>
    </div>
  );
}
