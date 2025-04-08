import axios from "axios";
import { Collapse } from "bootstrap";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateCartData } from "../../redux/cartSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function Header() {

  const routes = [
    { path: "/about", name: "關於我們", icon: "menu_book" },
    { path: "/products", name: "產品列表", icon: "breakfast_dining" },
    { path: "/cart", name: "購物車", icon: "shopping_cart" },
    // {path: "/login", name:"登入/註冊", icon: "login"}
  ];

  const [isOpen, setIsOpen] = useState(false); // 控制 Navbar 開關
  const navRef = useRef(null);

  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();

  // 點擊 NavLink 時關閉 Navbar
  const closeNavbar = () => {
    if (navRef.current) {
      const bsCollapse = new Collapse(navRef.current, { toggle: false });
      bsCollapse.hide();
      setIsOpen(false); // 更新 state
    }
  };

  // 點擊漢堡選單時切換 Navbar 展開/收合
  const toggleNavbar = () => {
    if (navRef.current) {
      const bsCollapse = new Collapse(navRef.current, { toggle: false });
      isOpen ? bsCollapse.hide() : bsCollapse.show();
      setIsOpen(!isOpen); // 更新開合狀態
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
  }, [dispatch]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <div className="container-fluid d-flex flex-column px-0">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img
              src="dajai-logo.png"
              style={{ height: 45 }}
              alt="大家饒早 logo"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            aria-expanded={isOpen}
            onClick={toggleNavbar}
            // data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            // aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
            ref={navRef}
          >
            <div className="navbar-nav align-items-center gap-3 gap-lg-0">
              {routes.map((route) => {
                return (
                  <NavLink
                    key={route.path}
                    className="nav-item nav-link me-4 d-flex align-items-center"
                    to={route.path}
                    onClick={closeNavbar}
                  >
                    <span className="material-symbols-outlined pe-2">
                      {route.icon === "shopping_cart" ? "" : route.icon}
                    </span>
                    {route.name === "購物車" ? (
                      <div className="position-relative d-flex align-items-center">
                        <span className="material-symbols-outlined">
                          shopping_cart
                        </span>
                        <span
                          className="position-absolute badge bg-brand-01 rounded-circle"
                          style={{
                            bottom: "12px",
                            left: "12px",
                          }}
                        >
                          {carts.length}
                        </span>
                      </div>
                    ) : (
                      route.name
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
