import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import Toast from "../../components/Toast";
import Swal from "sweetalert2";

export default function LoginPage(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [emailErrorMessage,setEmailErrorMessage] = useState("");
  const [passwordErrorMessage,setPasswordErrorMessage] = useState("");
  const [errorMessage,setErrorMessage] = useState("");

  const navigate = useNavigate();
  const providerGoogle = new GoogleAuthProvider();

  // email 正則式
  const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

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

  const validatePassword = ()=>{
    if(password === ""){
      setPasswordErrorMessage("此欄位必填！");
      valid = false;
    }
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    setErrorMessage("");
    try {
      valid = true;
      validateEmail();
      validatePassword();
      if (!valid){
        return
      }

      await signInWithEmailAndPassword(auth,email,password);
      Toast.fire({
        icon: "success",
        title: "登入成功!",
      });
      setTimeout(()=>{
        navigate("/");
      },1000)
    } catch (error) {
      switch(error.code){
      case 'auth/invalid-credential':
        setErrorMessage("帳號或密碼錯誤，請再試一次！");
        break;
      default:
      }
    }
  }

  const signInByGoogle = async ()=>{
    try {
      await signInWithPopup(auth,providerGoogle);
      Toast.fire({
        icon: "success",
        title: "登入成功!",
      });
      setTimeout(()=>{
        navigate("/");
      },1000)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "登入失敗，請重新嘗試!",
        text: error.code,
        confirmButtonText: "確定"
      });
    }
  }

  return(
    <div className="d-flex flex-column justify-content-center min-vh-100 bg-brand-05">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 mx-auto">
            <div className="mx-auto bg-white border-16 py-5 my-5">
              <h2 className="fs-1 text-brand-03 text-center mb-lg-5 mb-3">會員登入</h2>
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
                <div className="form">
                  <label htmlFor="password" className="mb-2">密碼</label>
                  <div>
                    <input
                      value={password}
                      onChange={(e)=>{
                        setPassword(e.target.value);
                      }}
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      placeholder=""
                    />
                    {passwordErrorMessage ? 
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-14 text-danger my-2">
                          {passwordErrorMessage}
                        </p>
                        <Link to="/reset-password" className="fs-14 text-decoration-underline">忘記密碼?</Link>
                      </div>:
                      <div className="text-end">
                        <Link to="/reset-password" className="fs-14 text-decoration-underline">忘記密碼?</Link>
                      </div>}
                  </div>
                </div>
                {errorMessage && (
                  <p className="text-danger text-center my-2">
                    {errorMessage}
                  </p>
                )}
                <button type="submit" className="fs-5 btn btn-custom btn-filled">登入</button>
                <p className="text-center">還不是會員？
                  <Link className="text-decoration-underline" to="/register">前往註冊</Link>
                </p>
              </form>
              <div className="divider my-4 px-md-6 px-3">
                <span className="divider-text">或使用第三方登入</span>
              </div>

              <div className="d-flex justify-content-center px-md-5 px-2">
                <button className="gsi-material-button google-login-btn" onClick={signInByGoogle}>
                  <div className="gsi-material-button-state"></div>
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{display: "block"}}>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">使用 Google 帳號登入</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}