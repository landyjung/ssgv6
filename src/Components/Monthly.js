import { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Monthly() {
const [currentDate, setCurrentDate] = useState(new Date());
const [selectedDate, setSelectedDate] = useState(null);

const gameScedule={
    2025:{
    1:[4,6,7,11,15,17,21,24,26,29],
    2:[2,5,8,12,16,19,23,26,28],
    3:[1,5,9,12,16,19,22,25,28,31],
    4:[3,7,10,14,17,21,24,27,30],
    5:[2,6,9,13,16,20,25,29],
    6:[4,8,11,15,18,22,23,27,30],
    7:[2,6,9,13,16,20,23,27,30],
    8:[1,5,8,12,15,19,22,26,29],
    9:[3,7,10,14,17,21,24,28],
    10:[2,6,9,13,16,20,23,27,30],
    11:[4,8,11,15,18,22,25,29],
    12:[2,6,9,13,16,20,23,27,30]
    }
}
const monthNames=['1','2','3','4','5','6','7','8','9','10','11','12'];
const dayNames = ['SUN','MOM','TUE','WED','THU','FRI','SAT'];

const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const firstDay = new Date(year, month, 1);
const lastDay = new Date(year, month+1, 0);
const daysInMonth = lastDay.getDate();
const startingDayOfWeek = firstDay.getDay();

const toPrevMonth=()=>{
    setCurrentDate(new Date(year, month-1, 1));
}
const toNextMonth=()=>{
    setCurrentDate(new Date(year, month+1, 1));
}

const hasGame = (day) =>{
    const monthSchdule = gameScedule[year]?.[month+1];
    return monthSchdule?.includes(day) || false;
}

const getGameStatus = (day) => {
    if(!hasGame(day))  return null;
    const gameDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0,0,0,0);
    gameDate.setHours(0,0,0,0);
    if( gameDate < today ) return 'past';
    if( gameDate > today ) return 'upcoming';
    return 'today';
}

const calenderDays = [];
for(let i=0; i<startingDayOfWeek; i++){
    calenderDays.push(null);
}
for(let day=1; day<=daysInMonth; day++){
    calenderDays.push(day);
}
const today = new Date();
const isToday = (day) =>{
    return today.getFullYear()===year && today.getMonth()===month && today.getDate===day;
}

const dateClick = (day) => {
    if( day && hasGame(day) ){
    setSelectedDate({ year,  month:month+1, day });
    }
}
const reservation = () => {
  if (selectedDate) {
    const reservationData = {
      date: selectedDate,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('baseballReservation', JSON.stringify(reservationData));
    window.open('/ReservResult', '_blank'); 
  }
};


return (
<div className="monthly_wrap">
    <h3> Monthly Schedule </h3>
    <div className="calendar_wrap">
        <div className="calendar">
            <div className="calendar_header">
                <button onClick={toPrevMonth}><ChevronLeft size={44} className="chg_btn" /></button>
                <h4 className="month_title"><span className="year">{year} / </span> {monthNames[month]}</h4>
                <button onClick={toNextMonth}><ChevronRight size={44} className="chg_btn" /></button>
            </div>
            
            <div className="day_names">
            {
                dayNames.map((day,index)=>(
                    <div 
                        key={day} 
                        className={`day-name ${index===0 ? 'sunday' : index===6 ? 'saturday':''}`}>
                    {day}
                    </div>
                ))
            }
            </div>
            
            {/* 달력 그리드 */}
            <div className="calendar_grid">
            {calenderDays.map((day, index)=>{
                const dayOfWeek = index % 7;
                const isEmpty = day===null;
                const gameStatus = day && getGameStatus(day);
                const todayDate = day && isToday(day);
                const isSelected = selectedDate && selectedDate.year === year && selectedDate.month === month+1 && selectedDate.day === day;
                return(
                <div key={index} 
                    className={`calendar-day ${isEmpty ? 'empty':''} 
                    ${todayDate ? 'today':''} ${isSelected ? 'selected':''} 
                    ${!todayDate && !isSelected && dayOfWeek===0 ? 'sunday':''}
                    ${!todayDate && !isSelected && dayOfWeek===6 ? 'saturday':''}`}
                    onClick={()=>{ dateClick(day) }}>
                    {day}
                    {gameStatus && (
                        <div className={`game-indicator ${gameStatus}`}></div>
                    )}
                </div>
                );
                })}
            </div>
            <div className="legend">
                <div className="legend-item">
                    <div className="legend-dot past"></div>
                    <span>지난 경기</span>
                </div>
                <div className="legend-item">
                    <div className="legend-dot today-game"></div>
                    <span>오늘 경기</span>
                </div>
                <div className="legend-item">
                    <div className="legend-dot upcoming"></div>
                    <span>예정된 경기</span>
                </div>
                <div className="legend-item">
                    <div className="legend-dot today-date"></div>
                    <span>오늘</span>
                </div>
            </div>
        </div>
    </div>

    
    
    
    {/* 예매 버튼 */}
    <div className="reservation-section">
        <div className="reservation-info">
            {selectedDate ? (
            <>선택된 경기: {selectedDate.year}년 {selectedDate.month}월 {selectedDate.day}일</>
            ) : (
            <>경기 날짜를 선택하여 예약하세요</>
            )}
        </div>
        <button 
            className="reservation-button"
            onClick={reservation}
            disabled={!selectedDate}
        >
            예약하기
        </button>
    </div>
</div>
);
}

export default Monthly;
