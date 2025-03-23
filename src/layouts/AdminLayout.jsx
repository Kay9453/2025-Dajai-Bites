import axios from "axios";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AdminLayout(){

    const routes = [
        {path: "/admin/products",name: "產品列表"},
        {path: "/admin/orders",name: "訂單列表"},
    ]

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async() => {
        try {
            await axios.post(`${BASE_URL}/v2/logout`);
            document.cookie = "myToken=; path=/; max-age=0";
            navigate("/admin-login");
        } catch (error) {
            console.error(error);
        }
    }

    return(
    <div className="d-flex">
        <aside className="aside-navbar navbar bg-body-tertiary align-items-start vh-100 position-fixed">
            <div className="navbar-content container-fluid flex-column align-items-start h-100">
                <div className="w-100">
                    <NavLink to="/" className="navbar-brand">
                        <img src="dajai-logo.png" style={{height: 45}} className="img-fluid mb-5" alt="大家饒早 LOGO" />
                    </NavLink>
                    <ul className="navbar-nav flex-column gap-1">
                        {
                            routes.map((route,index) => {
                                return(
                                    <li className="nav-item" key={route.path}>
                                        <NavLink 
                                            to={route.path} 
                                            className={
                                                `nav-link fs-5 ps-3 border-start border-5 border-light 
                                                ${ location.pathname === route.path || (location.pathname === '/admin' && index === 0) 
                                                    ? "text-brand-03 active border-brand-03": ""    
                                            }`
                                        }>
                                            {route.name}
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="admin-user d-flex align-items-center mb-4">
                    <div className="flex-grow-1 ms-3">
                        <Link onClick={handleLogout} className="">登出</Link>
                    </div>
                </div>
            </div>
        </aside>
        <Outlet />
    </div>)
}