import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AdminLogin() {
  const navigate = useNavigate();

  const [account, setAccout] = useState({
    username: "example@gmail.com",
    password: "12345678",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setAccout({
      ...account,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, account);

      const { token, expired } = res.data;
      document.cookie = `myToken=${token}; expires=${new Date(expired)}`;

      // 設定 Authorization header
      axios.defaults.headers.common["Authorization"] = token;

      //   getProducts();
      navigate("/admin");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "登入失敗",
        text: "請重新登入",
        icon: "error",
        confirmButtonText: "確定"
      });
      // alert("登入失敗");
    }
  };

  const checkUserLogin = useCallback(async () => {
    try {
      await axios.post(`${BASE_URL}/v2/api/user/check`);
      // getProducts();
      // console.log('驗證成功！');
      navigate("/admin");
    } catch (error) {
      console.error(error);
    }
  }, [navigate]);

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    if (token) {
      checkUserLogin();
    }
  }, [checkUserLogin]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-5">請先登入</h1>
      <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
        <div className="form-floating mb-3">
          <input
            type="email"
            name="username"
            value={account.username}
            onChange={handleInputChange}
            className="form-control"
            id="username"
            placeholder="name@example.com"
          />
          <label htmlFor="username">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            name="password"
            value={account.password}
            onChange={handleInputChange}
            className="form-control"
            id="password"
            placeholder="Password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <button className="btn btn-primary">登入</button>
      </form>
      <p className="mt-5 mb-3 text-muted">&copy; 2025~∞ - 大家饒早</p>
    </div>
  );
}
