import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="container-fluid bg-brand-03 py-5">
      <div className="container text-white">
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="d-flex flex-column justify-content-between align-items-center align-items-lg-start h-100">
              <Link className="text-white" to="/">
                <img src="dajai-bites-white.png" alt="大家饒早 logo" />
              </Link>
              <div className="d-lg-block d-none">
                <p className="mb-2">Copyright @ 2025 Search for Dajai Bites All rights reserved.</p>
                <p>@ 2025 大家饒早，本網站僅為學習用途，不做任何商業使用。</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-12">
            <div className="d-flex flex-column align-items-center d-lg-block mt-4 mt-lg-0">
              <h4 className="mb-lg-40 mb-8">關於本站</h4>
              <ul className="d-flex flex-column align-items-center align-items-lg-start list-unstyled">
                <li className="mb-12">
                  <Link to="/about" className="text-white">關於我們</Link>
                </li>
                <li className="mb-12">
                  <Link to="/products" className="text-white">產品列表</Link>
                </li>
                {/* <li className="mb-12">
                  <Link className="text-white">創意吃法</Link>
                </li> */}
                <li className="mb-12">
                  <Link to="admin-login" className="text-white">管理者登入</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-12">
            <div className="d-flex flex-column align-items-center d-lg-block mt-4 mt-lg-0">
              <h4 className="mb-lg-40 mb-8">聯絡我們</h4>
              <ul className="list-unstyled d-flex gap-4">
                <li>
                  <Link><i className="bi bi-facebook text-white fs-3"></i></Link>
                </li>
                <li>
                  <Link><i className="bi bi-instagram text-white fs-3"></i></Link>
                </li>
                <li>
                  <Link><i className="bi bi-line text-white fs-3"></i></Link>
                </li>
              </ul>
            </div>
            <div className="d-flex flex-column gap-2 align-items-center align-items-lg-start">
              <Link to="tel:+0800-123-456" className="text-white">客服專線：0800-123-456</Link>
              <Link to="mailto:service@dajaibites.com" className="text-white">客服信箱：service@dajaibites.com</Link>
              <span>服務時間：週一至週日 08:00~17:00</span>
            </div>
          </div>
          <div className="d-lg-none mt-4 text-center">
            <p className="mb-2 text-break">Copyright @ 2025 Search for Dajai Bites All rights reserved.</p>
            <p className="text-break">@ 2025 大家饒早，本網站僅為學習用途，不做任何商業使用。</p>
          </div>  
        </div>
      </div>
    </div>
  );
}
