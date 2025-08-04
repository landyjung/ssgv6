    import { HistoryData } from "../HistoryData";
    import { useState } from "react";
    import { CalendarFold } from 'lucide-react';

    function History() {
    const [selectedYear, setSelectedYear] = useState(HistoryData[0].year);
    const yearData = HistoryData.find((data) => data.year === selectedYear);

    return (
        <section className="history_wrap">
        <h2>SSG 연혁</h2>
            <div className="year_wrap">
                <ul>
                {
                    HistoryData.map((data, idx) => (
                        <li key={idx}>
                            <button 
                                onClick={() => setSelectedYear(data.year)}  
                                className={selectedYear === data.year ? 'active' : ''}                               
                            >
                                {data.year}
                            </button>
                        </li>
                    ))
                }
                </ul>
            </div>
            <div className="month_select">
                <ul>
                    {
                        yearData && 
                        Object.keys(yearData.months).map((monthId) => {
                            const month = yearData.months[monthId];
                            return (
                            <li key={monthId} className="month_box">
                                <a href={`#${monthId}`}>{month.title.toUpperCase()}</a>
                            </li>
                            );
                        })
                    }
                </ul>
            </div>
            <div className="month_all_wrap">
                {
                    yearData &&
                    Object.keys(yearData.months).map((monthId) => {
                        const month = yearData.months[monthId];
                        return (
                        <div key={monthId} id={monthId} className="month_box">
                            <div className="month_img" style={{ backgroundImage: `url(${month.img})` }}></div>
                            {/* <img src={month.img} alt={month.title} /> */}
                            <div className="text_box">
                                <h4 className="title">
                                    <CalendarFold size={24} /> {month.title.toUpperCase()}
                                </h4>
                                <ul>
                                {
                                    month.daily.map((daily, idx) => (
                                        <li key={idx} className="day_text">
                                            <p className="day">{daily.day}일</p>
                                            <p className="description"> 
                                                {
                                                    daily.description.split("\n").map((line, i) => (
                                                    <span key={i}>{line}<br /></span>
                                                    ))
                                                }
                                            </p>
                                        </li>
                                    ))
                                }
                                </ul>
                            </div>
                        </div>
                        );
                    })
                }
            </div>
        </section>
    );
}

export default History;
