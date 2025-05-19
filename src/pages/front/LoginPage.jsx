import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Toast from "../../components/Toast";

export default function LoginPage(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [emailErrorMessage,setEmailErrorMessage] = useState("");
  const [passwordErrorMessage,setPasswordErrorMessage] = useState("");
  const [errorMessage,setErrorMessage] = useState("");

  const navigate = useNavigate();

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

      const res = await signInWithEmailAndPassword(auth,email,password);
      console.log("登入成功",res);
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

  return(
    <div className="d-flex flex-column justify-content-center vh-100 bg-brand-05">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 mx-auto">
            <div className="mx-auto bg-white border-16 py-5">
              <h2 className="fs-1 text-brand-03 text-center mb-lg-5 mb-3 ">會員登入</h2>
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
                    <p className="text-danger my-2">
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
                    <Link to="/" className="fs-14 text-decoration-underline text-end">忘記密碼?</Link>
                    {passwordErrorMessage && (
                      <p className="text-danger my-2">
                        {passwordErrorMessage}
                      </p>
                    )}
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
              <p className="text-center my-3">----- 或使用第三方登入 -----</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}