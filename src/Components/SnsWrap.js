import { SnsData } from "../NewsData";

function SnsWrap({num}){
    return(
    <div className='sns_wrap'>
        <h2>SSG LANDERS SNS</h2>
        <div className="sns_items">
        {
            SnsData.slice(0,num).map((sns,idx)=>(
                <div className="sns_item" key={idx}>
                    <div className="img" style={{ backgroundImage: `url(${sns.img})` }} />
                    <h4 className="title">{sns.title}</h4>
                    <p className="subs">{sns.subscript}</p>
                    <p className="date">{sns.date}</p>
                </div>
            ))
        }
        </div>
    </div>
    )
}

export default SnsWrap;