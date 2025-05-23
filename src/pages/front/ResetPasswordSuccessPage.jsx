import { Link } from "react-router-dom";

export default function ResetPasswordSuccessPage(){
  return(
    <div className="container" style={{ height: "calc(100vh - 71px)" }}>
      <div className="h-100 d-flex flex-column justify-content-center">
        <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
          <div className="mb-3 text-center">
            <h2 className="fs-1 text-brand-03 mb-2">確認您的信箱</h2>
            <p className="fs-5 text-custom-gray">重設密碼信件已寄出，請至您的信箱收取信件，並重新設定密碼</p>
          </div>
          <img src="reset-pwd-success.png" className="" alt="重設密碼信件已寄出" />
        </div>
        <div className="d-flex justify-content-center gap-3 mt-4 mt-lg-5 mb-5 mb-lg-60">
          <Link to="/login" className="btn-custom btn-filled text-nowrap">
            回登入頁
          </Link>
        </div>
      </div>
    </div>    
  )
}