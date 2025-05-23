import { useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";

export default function ResetPasswordPage(){
  
  const [email,setEmail] = useState("");
  const [emailErrorMessage,setEmailErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false); //儲存小 Loading 狀態

  // email 正則式
  const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
  const navigate = useNavigate();

  let valid;

  const validateEmail = () =>{
    if(email === ""){
      setEmailErrorMessage("此欄位必填！");
      valid = false;
    }else if (email.search(emailRule) == -1){
      setEmailErrorMessage("信箱格式不正確！");
      valid = false;
    }
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    setEmailErrorMessage("");
    try {
      valid = true;
      validateEmail();
      if (!valid){
        return
      }

      await sendPasswordResetEmail(auth,email);
      navigate("/reset-password-success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "寄送失敗，請稍候再試!",
        text: error.code,
        confirmButtonText: "確定"
      });
    } finally {
      setIsLoading(false);
    }
  }
  return(
    <div className="d-flex flex-column justify-content-center min-vh-100 bg-brand-05">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 mx-auto">
            <div className="mx-auto bg-white border-16 py-5 my-5">
              <div className="mb-lg-5 mb-3">
                <h2 className="fs-1 text-brand-03 text-center mb-3">重設密碼</h2>
                <p className="text-center text-custom-gray">請輸入您的會員帳號，以重新設定密碼</p>
              </div>
              <form onSubmit={onSubmit} className="d-flex flex-column gap-3 px-md-5 px-2 login-form">
                <div className="form mb-3">
                  <label htmlFor="username" className="mb-2">帳號</label>
                  <input
                    value={email}
                    onChange={(e)=>{
                      setEmail(e.target.value);
                    }}
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    placeholder="name@example.com"
                  />
                  {emailErrorMessage && (
                    <p className="fs-14 text-danger my-2">
                      {emailErrorMessage}
                    </p>
                  )}
                </div>
                {/* {errorMessage && (
                  <p className="text-danger text-center my-2">
                    {errorMessage}
                  </p>
                )} */}
                <button type="submit" className="fs-5 btn btn-custom btn-filled d-flex justify-content-center gap-2">
                  {isLoading && (
                    <ReactLoading
                      type={"spin"}
                      color={"#000"}
                      height={"1.5rem"}
                      width={"1.5rem"}
                    />
                  )}
                  寄送重設密碼信件
                </button>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}