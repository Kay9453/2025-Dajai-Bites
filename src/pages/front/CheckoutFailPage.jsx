import { Link } from "react-router-dom"


export default function CheckoutFailPage(){
    return (
        <div className="container d-flex justify-content-center align-items-center " style={{height: "calc(100vh - 71px)"}}>
            <div className="h-100 d-flex flex-column justify-content-center mt-4">
                <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
                    <span className="material-symbols-outlined icon-unfilled text-error fs-1">Cancel</span>
                    {/* <img src="booking-fail.png" className="result-error-img" alt="預約失敗" /> */}
                    <h3 className="fs-2 text-error">預約失敗</h3>
                    <p className="text-md-20"></p>
                </div>
                <div className="d-flex justify-content-center gap-3 mt-4 mt-lg-5 mb-5 mb-lg-60">
                    <Link to='/' className="btn-custom btn-filled w-content text-nowrap">回首頁</Link>
                </div>
            </div>
        </div>
    )
}