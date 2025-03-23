import { Link } from "react-router-dom"


export default function CheckoutSuccessPage(){
    return (
        <div className="container d-flex justify-content-center align-items-center " style={{height: "calc(100vh - 71px)"}}>
            <div className="d-flex flex-column justify-content-center">
                <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
                    <span className="material-symbols-outlined icon-unfilled fs-1 text-brand-03">check_circle</span>
                    {/* <img src="booking-success.png" className="result-success-img" alt="預約成功" /> */}
                    <h3 className="fs-2 text-brand-03">預約成功</h3>
                </div>
                <div className='d-flex justify-content-center gap-3 mt-4 mt-lg-5 mb-5 mb-lg-60'>
                    {/* <Link to='/' className="btn-custom btn-outlined w-lg-25 w-md-50 w-xs-100 text-nowrap">查看訂單</Link> */}
                    <Link to='/' className="btn-custom btn-filled text-nowrap">回首頁</Link>
                </div>
            </div>
        </div>
    )
}