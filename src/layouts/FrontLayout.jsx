import { Outlet } from "react-router-dom"
import Footer from "../components/common/Footer"
import Header from "../components/common/Header"

export default function FrontLayout(){
    return(
        <>
            <Header />
                <Outlet />
            <Footer />
        </>
    )
}