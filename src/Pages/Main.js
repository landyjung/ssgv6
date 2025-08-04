
import SliderContainer from "../Components/SliderContainer";
import CountTime from "../Components/CountTime";
import Comming from "../Components/Comming";
import NewsWrap from "../Components/NewsWrap";
import SnsWrap from "../Components/SnsWrap";
import ProductList from "../Components/ProductList";
import BestPlayer from "../Components/BestPlayer";

function Main(){

    return(
    <section id="main_content">
        <div className="slide_area">
            <SliderContainer />            
        </div>
        <CountTime />
        <div className="comming_game">
            <Comming num="3" />
        </div>
        <div className="best_player">
            <BestPlayer />
        </div>
        <div className="news_area">
            <NewsWrap num="4" />
            <SnsWrap num="4" />
        </div>
        <div className="shop_area">
            <ProductList />
        </div>
    </section>
    )
}
export default Main;