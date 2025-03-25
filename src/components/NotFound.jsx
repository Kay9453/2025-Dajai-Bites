import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 4000)

    return  () => clearTimeout(timer);
  }, [navigate])

  return (
    <>
      <div className='container vh-100'>
        <div className='d-flex flex-column align-items-center p-5'>
          <img className="w-50 mb-4 px-md-5" src="notfound.png" alt="error" />
          <h6>啊呀。･ﾟ･(つд`ﾟ)･ﾟ･無此頁面。即將為您傳送回首頁繼續探索美食...</h6>
        </div>
      </div>
    </>
  )
}