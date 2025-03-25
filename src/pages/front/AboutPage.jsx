import { Link } from "react-router-dom";

export default function AboutPage(){
    return (
        <>
            <div className="container-fluid px-0">
                <img
                    className="cover" 
                    src="https://images.unsplash.com/photo-1495214783159-3503fd1b572d?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="關於我們" />
            </div>
            <div className="container mt-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb article-breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">首頁</a></li>
                    <li className="breadcrumb-item active" aria-current="page">關於我們</li>
                    </ol>
                </nav>
                <h2 className="mb-3 text-brand-03">關於我們</h2>
                <div className="d-flex flex-column gap-2 gap-lg-4">
                    <div className="card mb-3 border-0">
                        <div className="row">
                            <div className="col-md-6">
                                <img className="w-100 object-fit-cover border-16 about-img" src="https://images.unsplash.com/photo-1516226392000-3536759b78e7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="品牌故事" />
                            </div>
                            <div className="col-md-6 my-auto">
                                <div className="card-body d-flex flex-column">
                                    <h3 className="card-title fw-bold mb-4 text-brand-03">大家饒早</h3>
                                    <p className="card-text mb-3">早餐，是一天的開始，也是一份簡單卻深刻的幸福。有人喜歡睡到中午再吃，有人習慣早起補充一天的活力，而對我們來說，早餐不只是一頓飯，更是一種儀式感，象徵著迎接新一天的美好時刻。</p>
                                    <p className="card-text mb-3">創辦人本身熱愛早餐，無論何時，都想來上一份溫暖的早餐。然而，在外用餐時，往往無法掌握食材來源與食物品質，在享受美味的同時，可能也不小心攝取過多的熱量與添加物。有鑑於此，我們創立了
                                        <span className="fw-bold">大家饒早</span>，希望透過<span className="fw-bold">嚴選食材與簡單調理方式</span>，讓每個人都能輕鬆在家享受健康、美味的早餐，無需妥協於時間或品質。</p>
                                    <p className="card-text mb-3">我們相信 <span className="fw-bold">“  好的早餐，不該只是填飽肚子，而是讓身心都充滿能量，迎接每一天的開始！ ”</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card mb-3 border-0">
                        <div className="row flex-md-row-reverse">
                            <div className="col-md-6">
                                <img className="w-100 object-fit-cover border-16 about-img" src="https://images.unsplash.com/photo-1526127230111-0197afe94d72?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="品牌理念" />
                            </div>
                            <div className="col-md-6 my-auto">
                                <div className="card-body d-flex flex-column">
                                    <h3 className="card-title fw-bold mb-4 text-brand-03">品牌理念</h3>
                                    <p className="card-text fw-bold mb-2">簡單 × 美味 × 健康</p>
                                    <p className="card-text mb-2">我們堅持提供「簡單調理卻不失美味」的早餐選擇，讓你無需繁瑣烹飪，即可享受現做般的口感。我們關心健康，嚴選優質食材，確保每一口都能吃得安心、無負擔！</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-5 border-0">
                        <div className="row">
                            <div className="col-md-6">
                                <img className="w-100 object-fit-cover border-16 about-img" src="https://images.unsplash.com/photo-1486590868314-c6c18732d981?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3" alt="使命與願景" />
                            </div>
                            <div className="col-md-6 my-auto">
                                <div className="card-body d-flex flex-column">
                                    <h3 className="card-title fw-bold mb-4 text-brand-03">使命與願景</h3>
                                    <p className="card-text mb-3 fw-bold">讓美味的早餐變得輕鬆、健康，讓每個人都能擁有更好的早晨！</p>
                                    <p className="card-text mb-3">我們希望大家不論多忙碌，都能透過我們的早餐，感受到家的溫度與美味，迎接充滿活力的一天。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
            <div className="container-fluid bg-brand-05">
                <div className="container">
                    <div className="d-flex flex-column align-items-center py-5">
                        <h3 className="card-title fw-bold mb-4 text-brand-03">開啟你的美味晨光</h3>
                        <p className="fs-5 card-text mb-3 fw-bold text-center px-3">現在就挑選你的理想早餐，用最簡單的方式開始美好早晨！</p>
                        <Link to="/products" className="btn btn-custom btn-outlined w-content">立即選購</Link>
                    </div>
                </div>
            </div>
        </>
    )
}