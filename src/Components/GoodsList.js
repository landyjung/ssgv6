import { Goods } from "../ProductData";

function GoodsList(){
    return(
        <section className="shop_wrap">
            <h2>GOODS</h2>
            <div className="best_items">
                {
                    Goods.map((item, index) => (
                    <div key={index} className="best_item">
                        <img src={item.img} alt={item.title} className="item_img" />

                        <div className="labels">
                            {item.event && <span className="badge event">EVENT</span>}
                            {item.new && <span className="badge new">NEW</span>}
                            {item.disccountRate && <span className="badge discount">20%</span>}
                            {item.soldout && <span className="badge soldout">품절</span>}
                        </div>

                        <h3 className="item_title">
                            {
                                item.title.split("\n").map((text, i) => (
                                <span key={i}>{text}<br /></span>
                                ))
                            }
                        </h3>
                        <p className="price_wrap">
                            {
                                item.discountPrice !== item.price ? (
                                <>
                                    <span className="original">{item.price} <b>원</b></span>
                                    <span className="discount">{item.discountPrice} <b>원</b></span>
                                </>
                                ) : (
                                <span className="discount">{item.price} <b>원</b></span>
                            )}
                        </p>
                    </div>
                    ))
                }
            </div>
        </section>
    )
}

export default GoodsList;