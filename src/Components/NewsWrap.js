import { NewsData } from "../NewsData";

function NewsWrap({num}){
    return(
    <div className='news_wrap'>
        <h2>SSG LANDERS NEWS</h2>
        <div className="news_items">
        {
            NewsData.slice(0, num).map((news,idx)=>(
                <div className="news_item" key={idx}>
                    <div className="img" style={{ backgroundImage: `url(${news.img})` }} />
                    <h4 className="title">{news.title}</h4>
                    <p className="subs">{news.subscript}</p>
                    <p className="date">{news.date}</p>
                </div>
            ))
        }
        </div>
    </div>
    )
}

export default NewsWrap;