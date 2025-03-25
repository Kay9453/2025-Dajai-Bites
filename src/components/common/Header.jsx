import { NavLink } from "react-router-dom"

export default function Header() {

  const routes = [
    {path: "/about", name: "關於我們", icon: "menu_book"},
    {path: "/products", name: "產品列表", icon: "breakfast_dining"},
    {path: "/cart", name: "購物車", icon: "shopping_cart"},
    // {path: "/login", name:"登入/註冊", icon: "login"}
  ]

  return (
      <div
        className="container-fluid d-flex flex-column px-0"
      >
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              <img src="dajai-logo.png" style={{height: 45}} alt="大家饒早 logo" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNavAltMarkup"
            >
              <div className="navbar-nav align-items-center gap-3 gap-lg-0">
                {
                  routes.map((route)=>{
                    return(
                      <NavLink key={route.path} className="nav-item nav-link me-4 d-flex align-items-center" to={route.path}>
                        <span className="material-symbols-outlined pe-2">
                          {route.icon}
                        </span>
                        {route.name}
                      </NavLink>      
                    )
                  })
                }
              </div>
            </div>
          </div>
        </nav>
      </div>
  )
}
