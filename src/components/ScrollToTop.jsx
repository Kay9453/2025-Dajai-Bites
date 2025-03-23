import { useLocation } from 'react-router';
import { useEffect } from 'react';

// 頁面跳轉置頂方法
export default function ScrollToTop(){

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);
}