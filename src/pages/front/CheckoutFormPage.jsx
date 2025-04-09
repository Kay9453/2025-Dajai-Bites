import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";
import { useCallback, useEffect, useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CheckoutFormPage() {

  const [cart, setCart] = useState({}); //儲存購物車列表
  const navigate = useNavigate();

  // 取得購物車
  const getCart = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      setCart(res.data.data);
    } catch (error) {
      console.error(error);
      // alert("取得購物車列表失敗");
      Swal.fire({
        title: "取得購物車列表失敗",
        icon: "error",
        confirmButtonText: "確定"
      });
    }
  }, []);

  useEffect(() => {
    getCart();
  }, [getCart]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const paymentWay = watch("paymentWay");

  const onSubmit = (data) => {
    const {
      contactEmail,
      contactMessage,
      contactName,
      contactPhone,
      shippingWay,
      paymentWay,
    } = data;
    const userInfo = {
      data: {
        user: {
          name: contactName,
          email: contactEmail,
          tel: contactPhone,
          address: "台北市中山區民生東路二段131號",
        },
        message: contactMessage,
        shippingWay,
        paymentWay,
      },
    };
    checkout(userInfo);
  };  

  const checkout = async (data) => {
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, data);
      Toast.fire({
        icon: "success",
        title: "訂單已成功送出",
      });
      reset();
      getCart();
      navigate("/checkout-success");
    } catch (error) {
      console.error(error);
      navigate("/checkout-fail");
    }
  };

  return (
    <div className="container">
      <ProgressBar currentStep={2} />
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h3 className="fw-bold mb-4 pt-3">填寫聯絡方式與付款</h3>
        </div>
      </div>
      <div className="row flex-row-reverse justify-content-center pb-5">
        <div className="col-md-4">
          <div className="border p-4 mb-4">
            {cart.carts?.map((cartItem) => {
              return (
                <div key={cartItem.id} className="d-flex my-2">
                  <img
                    src={cartItem.product.imageUrl}
                    alt={cartItem.product.title}
                    className="me-2"
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <p className="mb-0 fw-bold">{cartItem.product.title}</p>
                      <p className="mb-0">
                        NT${cartItem.total?.toLocaleString()}
                      </p>
                    </div>
                    <p className="mb-0 fw-bold">x {cartItem.qty}</p>
                  </div>
                </div>
              );
            })}
            <table className="table mt-4 border-top border-bottom text-muted">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-4 font-weight-normal"
                  >
                    商品金額
                  </th>
                  <td className="text-end border-0 px-0 pt-4">
                    NT${cart.total?.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                  >
                    折扣
                  </th>
                  <td className="text-end border-0 px-0 pt-0 pb-4">-NT${(cart.total-cart.final_total)?.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-between mt-4">
              <p className="mb-0 h4 fw-bold">總金額</p>
              <p className="mb-0 h4 fw-bold">
                NT${cart.final_total?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <form id="checkoutForm" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h4 className="text-brand-03 mb-2">訂購人資訊</h4>
              <div className="mb-2">
                <label htmlFor="contactName" className="text-muted mb-0">
                  姓名
                </label>
                <input
                  {...register("contactName", {
                    required: "必填",
                    minLength: {
                      value: 2,
                      message: "請至少輸入 2 個字",
                    },
                    maxLength: {
                      value: 12,
                      message: "最多只能輸入 12 個字",
                    },
                  })}
                  type="text"
                  className={`form-control ${
                    errors.contactName && "is-invalid"
                  }`}
                  id="contactName"
                  placeholder="請輸入真實姓名"
                />
                {errors.contactName && (
                  <p className="text-danger my-2 ">
                    {errors.contactName.message}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="contactEmail" className="text-muted mb-0">
                  Email
                </label>
                <input
                  {...register("contactEmail", {
                    required: "必填",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email 欄位格式錯誤",
                    },
                  })}
                  type="email"
                  className={`form-control ${
                    errors.contactEmail && "is-invalid"
                  }`}
                  id="contactEmail"
                  aria-describedby="emailHelp"
                  placeholder="example@gmail.com"
                />
                {errors.contactEmail && (
                  <p className="text-danger my-2 ">
                    {errors.contactEmail.message}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="contactPhone" className="text-muted mb-0">
                  聯絡電話
                </label>
                <input
                  {...register("contactPhone", {
                    required: "必填",
                    pattern: {
                      value: /^(0[2-8]\d{7,8}|09\d{8})$/,
                      message: "電話欄位格式錯誤",
                    },
                  })}
                  type="tel"
                  className={`form-control ${
                    errors.contactPhone && "is-invalid"
                  }`}
                  id="contactPhone"
                  placeholder="請輸入手機 09 開頭或是市話"
                />
                {errors.contactPhone && (
                  <p className="text-danger my-2">
                    {errors.contactPhone.message}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="contactMessage" className="text-muted mb-0">
                  備註
                </label>
                <textarea
                  {...register("contactMessage")}
                  className="form-control"
                  rows="3"
                  id="contactMessage"
                  placeholder="有任何建議或想法，歡迎跟我們說呦～"
                ></textarea>
              </div>
            </div>
            <div>
              <h4 className="mt-4 text-brand-03 mb-2">寄送方式</h4>
              <div className="mb-2 d-flex flex-column gap-2">
                <div className="form-check">
                  <input
                    {...register("shippingWay", {
                      required: "必選",
                    })}
                    value="homeDelivery"
                    className={`form-check-input ${
                      errors.shippingWay && "is-invalid"
                    }`}
                    type="radio"
                    name="shippingWay"
                    id="homeDelivery"
                  />
                  <label className="form-check-label" htmlFor="homeDelivery">
                    宅配
                  </label>
                </div>
                <div className="form-check">
                  <input
                    {...register("shippingWay", {
                      required: "必選",
                    })}
                    value="instorePickup1"
                    className={`form-check-input ${
                      errors.shippingWay && "is-invalid"
                    }`}
                    type="radio"
                    name="shippingWay"
                    id="instorePickup1"
                  />
                  <label className="form-check-label" htmlFor="instorePickup1">
                    7-11 超商取貨
                  </label>
                </div>
                <div className="form-check">
                  <input
                    {...register("shippingWay", {
                      required: "必選",
                    })}
                    value="instorePickup2"
                    className={`form-check-input ${
                      errors.shippingWay && "is-invalid"
                    }`}
                    type="radio"
                    name="shippingWay"
                    id="instorePickup2"
                  />
                  <label className="form-check-label" htmlFor="instorePickup2">
                    全家 超商取貨
                  </label>
                </div>
                {errors.shippingWay && (
                  <p className="text-danger my-2">
                    {errors.shippingWay.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <h4 className="mt-4 text-brand-03 mb-2">付款方式</h4>
              <div className="mb-2 d-flex flex-column gap-2">
                <div>
                  <div className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseCreditCard" aria-expanded="true" aria-controls="collapseCreditCard">
                    <div className="form-check">
                      <input
                        {...register("paymentWay", {
                          required: "必選",
                        })}
                        value="creditCard"
                        className={`form-check-input ${
                          errors.paymentWay && "is-invalid"
                        }`}
                        type="radio"
                        name="paymentWay"
                        id="creditCard"
                      />
                      <label className="form-check-label" htmlFor="creditCard">
                        信用卡
                      </label>
                    </div>
                  </div>
                  <div id="collapseCreditCard" className="accordion-collapse collapse hide">
                    <div className="accordion-body m-4">
                      <div className="mb-2">
                        <label htmlFor="cardNumber" className="me-2">卡號</label>
                        <input
                          {...register("cardNumber", {
                            required: paymentWay === 'creditCard' && "必填",
                          })}
                          type="text" 
                          className={`form-control ${
                            errors.cardNumber && "is-invalid"
                          }`} 
                          id="cardNumber" inputMode="numeric" placeholder="請輸入卡號"/>
                        {errors.cardNumber && (
                          <p className="text-danger my-2 ">
                            {errors.cardNumber.message}
                          </p>
                        )}
                      </div>
                      <div className="d-flex gap-2">
                        <div className="d-flex flex-column">
                          <label htmlFor="cardDueDate" className="me-2">到期日</label>
                          <input
                            {...register("cardDueDate", {
                              required: paymentWay === 'creditCard' && "必填",
                            })} 
                            type="text"
                            className={`form-control ${
                              errors.cardDueDate && "is-invalid"
                            }`}  
                            id="cardDueDate" 
                            placeholder="mm/yy"/>
                          {errors.cardDueDate && (
                            <p className="text-danger my-2 ">
                              {errors.cardDueDate.message}
                            </p>
                          )}
                        </div>
                        <div className="d-flex flex-column">
                          <label htmlFor="cardSafeCode" className="me-2">安全碼</label>
                          <input
                            {...register("cardSafeCode", {
                              required: paymentWay === 'creditCard' && "必填",
                            })} 
                            type="text"
                            className={`form-control ${
                              errors.cardSafeCode && "is-invalid"
                            }`}  
                            id="cardSafeCode" 
                            placeholder="cvc"/>
                          {errors.cardSafeCode && (
                            <p className="text-danger my-2 ">
                              {errors.cardSafeCode.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-check">
                  <input
                    {...register("paymentWay", {
                      required: "必選",
                    })}
                    value="bankTransfer"
                    className={`form-check-input ${
                      errors.paymentWay && "is-invalid"
                    }`}
                    type="radio"
                    name="paymentWay"
                    id="bankTransfer"
                  />
                  <label className="form-check-label" htmlFor="bankTransfer">
                    銀行轉帳
                  </label>
                </div>
                <div className="form-check">
                  <input
                    {...register("paymentWay", {
                      required: "必選",
                    })}
                    value="cashOnDelivery"
                    className={`form-check-input ${
                      errors.paymentWay && "is-invalid"
                    }`}
                    type="radio"
                    name="paymentWay"
                    id="cashOnDelivery"
                  />
                  <label className="form-check-label" htmlFor="cashOnDelivery">
                    貨到付款
                  </label>
                </div>
                <div className="form-check">
                  <input
                    {...register("paymentWay", {
                      required: "必選",
                    })}
                    value="LinePay"
                    className={`form-check-input ${
                      errors.paymentWay && "is-invalid"
                    }`}
                    type="radio"
                    name="paymentWay"
                    id="LinePay"
                  />
                  <label className="form-check-label" htmlFor="LinePay">
                    LINE PAY
                  </label>
                </div>
                <div className="form-check">
                  <input
                    {...register("paymentWay", {
                      required: "必選",
                    })}
                    value="ApplePay"
                    className={`form-check-input ${
                      errors.paymentWay && "is-invalid"
                    }`}
                    type="radio"
                    name="paymentWay"
                    id="ApplePay"
                  />
                  <label className="form-check-label" htmlFor="ApplePay">
                    Apple Pay
                  </label>
                </div>
                {errors.paymentWay && (
                  <p className="text-danger my-2">
                    {errors.paymentWay.message}
                  </p>
                )}
              </div>
            </div>
          </form>
          <div className="d-flex flex-column-reverse flex-md-row mt-4 gap-3 justify-content-between align-items-md-center align-items-end w-100">
            <Link to="/cart" className="btn btn-custom btn-outlined w-100">
              <i className="bi bi-arrow-left me-2"></i> 上一步
            </Link>
            <button
              type="submit"
              form="checkoutForm"
              className="btn btn-custom btn-filled w-100"
              disabled={cart.carts?.length === 0 && true}
            >
              結帳
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
