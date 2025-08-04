import { useState, useEffect } from "react";
function CountTime(){

    const targetDate = new Date("2025-08-30T18:00:00").getTime();
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    function getTimeLeft() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds, expired: false };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(interval);
    }, [getTimeLeft]);  

    const bgImageStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/count_bg.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    return(
    
        <div className="count_board">
            <div className="when">
                <p><span>7월 25일 토 17:00</span> 인천 랜더스 필드</p>
            </div>
            <div className="verse">
                <img src="./images/club_emblem_kt.png" alt="emblem" />
                <span className="colons">VS</span>
                <img src="./images/club_emblem_ssg.png" alt="emblem" />
            </div>
            <div className="time_title">
                <span>DAY</span>
                <span>HOUR</span>
                <span>MINUTE</span>
                <span>SECOND</span>
            </div>
            <div className="time_count" id="countdown">
                    {timeLeft.expired ? (
                        <span className="expired-text">선택한 날짜가 지났습니다.</span>
                    ) : (
                        <>
                            <span className="time_num" style={bgImageStyle}>{timeLeft.days}</span>
                            <span className="colons">:</span>
                            <span className="time_num" style={bgImageStyle}>{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="colons">:</span>
                            <span className="time_num" style={bgImageStyle}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="colons">:</span>
                            <span className="time_num" style={bgImageStyle}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                        </>
                    )}
                </div>
            
        </div>
    )
}
export default CountTime;