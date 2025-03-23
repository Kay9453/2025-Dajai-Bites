import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function AdminOrdersPage(){

    const navigate = useNavigate();

    const [orders,setOrders] = useState([]);

    const getOrders = async ( page=1 ) => {
        try {
            const res = await axios.get(
            `${BASE_URL}/v2/api/${API_PATH}/admin/orders?page=${page}`
            );
            console.log("訂單資料",res.data.orders);
            setOrders(res.data.orders);
            
        } catch (error) {
            console.error(error);
            alert("取得訂單失敗");
        }
    };
  
    useEffect(() => {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1",
          );

        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
            getOrders();
        } else {
            // alert('請先登入')
            navigate("/admin-login");
        }
    },[])

    return(
        <>
        <main className="admin-content container d-flex flex-column justify-content-between">
            <div>
                <div className="py-4 d-flex justify-content-between gap-3">
                    <h3>訂單列表</h3>
                </div>
            </div>
            <div>
                <div className="admin-table-content overflow-y-auto">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">訂單時間</th>
                        <th scope="col">訂單金額</th>
                        <th scope="col">訂購人</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                        <tr key={order.id}>
                            <th scope="row">{order.id}</th>
                            <td>{new Date(order.create_at * 1000).toLocaleString()}</td>
                            <td>{order.total?.toLocaleString()}</td>
                            <td>{order.user.name}</td>
                            <td>
                            <div className="btn-group">
                            {/* <button type="button" onClick={() => {handleOpenProductModal('edit',product)}} className="btn btn-outline-primary btn-sm">編輯</button>
                            <button type="button" onClick={()=>{handleOpenDelProductModal(product)}} className="btn btn-outline-danger btn-sm">刪除</button> */}
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                {/* <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} /> */}
                </div>
            </div>
        </main>
        </>
    )
}