import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import Toast from "../../components/Toast";

export default function RegisterPage(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("");
  const [passwordCheck,setPasswordCheck] = useState("");

  const [emailErrorMessage,setEmailErrorMessage] = useState("");
  const [passwordErrorMessage,setPasswordErrorMessage] = useState("");
  const [usernameErrorMessage,setUsernameErrorMessage] = useState("");
  const [passwordCheckErrorMessage,setPasswordCheckErrorMessage] = useState("");

  const navigate = useNavigate();

  // 正則式
  const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
  const usernameRule = /^[\u4e00-\u9fa5A-Za-z0-9_-]{1,20}$/;

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

  const validateUsername = () =>{
    if(username === ""){
      setUsernameErrorMessage("此欄位必填！");
      valid = false;
    }else if (username.search(usernameRule) == -1){
      setUsernameErrorMessage('至多允許 20 個字元，"-"、"＿"特殊字元');
      valid = false;
    }
  }

  const validatePassword = ()=>{
    if(password === ""){
      setPasswordErrorMessage("此欄位必填！");
      valid = false;
    }
  }

  const validatePasswordCheck = ()=>{
    if(passwordCheck === ""){
      setPasswordCheckErrorMessage("此欄位必填！");
      valid = false;
    }else if (passwordCheck !== password){
      setPasswordCheckErrorMessage("密碼不一致，請重新設定");
      valid = false;
    }
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    setPasswordCheckErrorMessage("");
    setUsernameErrorMessage("");
    try {
      valid = true;
      validateUsername();
      validatePassword();
      validatePasswordCheck();
      validateEmail();
      if (!valid) {
        return
      }
      
      const res = await createUserWithEmailAndPassword(auth,email,password);

      // 註冊後更新暱稱
      await updateProfile(res.user, {
        displayName: username,
        
      }).then((res)=>{
        console.log("更新成功",res);
      }).catch((err)=>{
        console.log("更新失敗",err);
        
      });

      Toast.fire({
        icon: "success",
        title: "註冊成功!",
      });
      console.log("✅ 使用者暱稱：", auth.currentUser.displayName);
      setTimeout(()=>{
        navigate("/login");
      },1000)
    } catch (error) {
      switch(error.code){
      case 'auth/email-already-in-use':
        setEmailErrorMessage("帳號已存在！");
        break;
      case 'auth/weak-password':
        setPasswordErrorMessage("密碼強度不足！請設定至少 6 位數！");
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
              <h2 className="fs-1 text-brand-03 text-center mb-lg-5 mb-3 ">註冊會員</h2>
              <form onSubmit={onSubmit} className="d-flex flex-column gap-3 px-md-5 px-2 login-form">
                <div className="form mb-3">
                  <label htmlFor="email" className="mb-2">帳號</label>
                  <input
                    value={email}
                    onChange={(e)=>{
                      setEmail(e.target.value);
                    }}
                    type="text"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                  />
                  {emailErrorMessage && (
                    <p className="text-danger my-2">
                      {emailErrorMessage}
                    </p>
                  )}
                </div>
                <div className="form mb-3">
                  <label htmlFor="username" className="mb-2">暱稱</label>
                  <input
                    value={username}
                    onChange={(e)=>{
                      setUsername(e.target.value);
                    }}
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    placeholder="請輸入你的暱稱"
                  />
                  {usernameErrorMessage && (
                    <p className="text-danger my-2">
                      {usernameErrorMessage}
                    </p>
                  )}
                </div>
                <div className="form mb-3">
                  <label htmlFor="password" className="mb-2">設定密碼</label>
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
                  {passwordErrorMessage && (
                    <p className="text-danger my-2">
                      {passwordErrorMessage}
                    </p>
                  )}
                </div>
                <div className="form">
                  <label htmlFor="passwordCheck" className="mb-2">確認密碼</label>
                  <input
                    value={passwordCheck}
                    onChange={(e)=>{
                      setPasswordCheck(e.target.value);
                    }}
                    type="password"
                    name="passwordCheck"
                    className="form-control"
                    id="passwordCheck"
                    placeholder=""
                  />
                  {passwordCheckErrorMessage && (
                    <p className="text-danger my-2">
                      {passwordCheckErrorMessage}
                    </p>
                  )}
                </div>
                <button type="submit" className="fs-5 btn btn-custom btn-filled">註冊</button>
                <p className="text-center">已經是會員？
                  <Link className="text-decoration-underline" to="/login">前往登入</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}