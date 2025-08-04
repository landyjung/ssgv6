import NewsWrap from "../Components/NewsWrap";
import SnsWrap from "../Components/SnsWrap";

function News(){
    return(
    <section id="news">
        <h2 className="main_title">LANDERS NEWS</h2>
        <NewsWrap num="6" />
        <SnsWrap num="6" />
        
    </section>
    )
}
export default News;