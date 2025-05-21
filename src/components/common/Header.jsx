import axios from "axios";
import { Collapse } from "bootstrap";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { updateCartData } from "../../redux/cartSlice";
import Swal from "sweetalert2";

import { auth } from "../../utils/firebase";
// import { onAuthStateChanged } from "firebase/auth";   //  監聽登入狀態
import { signOut } from "firebase/auth";
import { UserContext } from "../../context/UserContext";
import Toast from "../Toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function Header() {

  const routes = [
    { path: "/about", name: "關於我們", icon: "menu_book" },
    { path: "/products", name: "產品列表", icon: "breakfast_dining" },
    // { path: "/cart", name: "購物車", icon: "shopping_cart" },
  ];

  const [isOpen, setIsOpen] = useState(false); // 控制 Navbar 開關
  const navRef = useRef(null);

  // const [user,setUser] = useState(null);  //登入狀態
  const { user,setUser } = useContext(UserContext); //登入狀態

  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

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

  // const handleLogin = () =>{
  //   onAuthStateChanged(auth,(currentUser)=>{
  //     setUser(currentUser);
  //     console.log("currentUser",currentUser);
  //     if(user){
  //       console.log(user.displayName);
  //     }
  //   })
  // }

  const handleLogout = () =>{
    signOut(auth)
      .then(()=>{
        setUser(null);
        Toast.fire({
          icon: "success",
          title: "登出成功!",
        });
      }).catch((error)=>{
        console.error(error);
      }).finally(()=>{
        closeNavbar();
      })
  }

  // 取得購物車
  const getCart = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);

      dispatch(updateCartData(res.data.data));
      // setCart(res.data.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "取得購物車列表失敗",
        icon: "error",
        confirmButtonText: "確定"
      });
      // alert("取得購物車列表失敗");
    }
  }, [dispatch]);

  const handleCartClick = ()=>{
    if(user){
      navigate("/cart");
    }else{
      Swal.fire({
        title: "請先登入",
        icon: "warning",
        confirmButtonText: "確定"
      });
    }
    closeNavbar();
  }

  useEffect(() => {
    getCart();
  }, [getCart]);

  // useEffect(()=>{
  //   handleLogin();
  // },[]);

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
                      {route.icon}
                    </span>
                    {route.name}
                  </NavLink>
                );
              })}
              {<button
                type="button"
                onClick={handleCartClick}
                className={`nav-item nav-link me-4 d-flex align-items-center bg-transparent border-0 ${location.pathname === "/cart" ? "active":""}`}>
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
                    { user ? carts.length : 0 }
                  </span>
                </div>
              </button>}
              {user ?
                <>
                  {/* PC */}
                  <div className="nav-item dropdown me-4 d-none d-lg-block">
                    <button
                      className="btn nav-link dropdown-toggle d-flex align-items-center"
                      type="button"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="material-symbols-outlined me-1">person</span>
                      Hi! {user.displayName}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          登出
                        </button>
                      </li>
                    </ul>
                  </div>
                  {/* Mobile */}
                  <div className="nav-item me-4 d-flex flex-column flex-lg-row align-items-center gap-2 d-lg-none">
                    <div className="nav-link d-flex align-items-center">
                      <span className="material-symbols-outlined pe-2">
                        person
                      </span>
                      <span>Hi! {user.displayName}</span>
                    </div>
                    <button 
                      type="button"
                      className="btn nav-link text-decoration-none" 
                      onClick={()=>handleLogout()}>登出</button>
                  </div>
                </>: 
                <NavLink
                  key="/login"
                  className="nav-item nav-link me-4 d-flex align-items-center"
                  to="/login"
                  onClick={closeNavbar}
                >登入
                </NavLink>
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
