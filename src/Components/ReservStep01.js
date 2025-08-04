import { useState, useEffect } from 'react';

const allSeats = Array.from({length:40},(_,index)=>(
{ id:index+1, booked:false,  }
));

function ReservStep01() {
const AdultPrice = 10000;
const YouthPrice = 8000;
const [selectedSeats, setSelectedSeats] = useState([]);
const [adultCount, setAdultCount] = useState(0);
const [youthCount, setYouthCount] = useState(0);
const [totalPrice, setTotalPrice] = useState(0);

const [isReservationFinished, setIsReservationFinished] = useState(false);
const [finalizedSeats, setFinalizedSeats] = useState([]);
const [fintalizePrice, setFinalizedPrice] = useState(0);
const totalRequestedPeople = adultCount+youthCount;

useEffect(()=>{
    const calculateTotal = (adultCount*AdultPrice) + (youthCount*YouthPrice);
        setTotalPrice( calculateTotal )
    },[adultCount, youthCount]);

const CountChage=(type, value)=>{
    if( isReservationFinished ) return;

    const newCount = Math.max(0, Number(value));
    let newAdult = adultCount;
    let newYouth = youthCount;

    if( type==='adult' ){
        newAdult = newCount;
        setAdultCount(newCount);
    }else{
        newYouth = newCount;
        setYouthCount(newCount);
    }

    const newTotalRequestedPeople = newAdult + newYouth;
    if( selectedSeats.length>totalRequestedPeople ){
        setSelectedSeats( selectedSeats.slice(0, newTotalRequestedPeople))
    }
    if( totalRequestedPeople=== 0){
        setSelectedSeats([]);
    }
}

const toggleSeat = (id) => {
    if( isReservationFinished ) return;
    if( selectedSeats.includes(id) ){
        setSelectedSeats( selectedSeats.filter( seat => seat !== id ))
    }else if(selectedSeats.length < totalRequestedPeople ){
        setSelectedSeats([...selectedSeats, id]);
    }else{
        alert(`총 ${totalRequestedPeople}명 인원에 맞춰서 좌석을 선택하세요.`);
    }
}

const reservationComplte=()=>{
    if( totalRequestedPeople === 0 ){
        alert('인원수를 먼저 선택하세요');
    return;
    }
    if( selectedSeats.length !== totalRequestedPeople ){
        alert('총 인원수에 맞춰 좌석을 모두 선택하세요.');
    return;
    }
    setIsReservationFinished(true);
    setFinalizedPrice(totalPrice);
    setFinalizedSeats(selectedSeats);
}

const isButtonDisabled = isReservationFinished || totalRequestedPeople===0 || selectedSeats.length !== totalRequestedPeople;

return (
    <div className="App" style={{ fontFamily:'Arial,sans-serif', padding:'20px', maxWidth:'600px', margin:'20px auto', border:'1px solid #eee', borderRadius:'8px', boxShadow:'0 2px 4px rgba(0,0,0,0.1)'}}>
    <div style={{ marginBottom:'20px', padding:'15px', border:'1px solid #ddd', borderRadius:'6px', backgroundColor:'#f9f9f9'}}>
        <h2 style={{fontSize:'1.2em',marginBottom:'10px',color:'#555'}}>인원수 선택</h2>
        <div style={{display:'flex', justifyContent:'space-around', gap:'15px'}}>
        <div style={{ flex:1 }}>
            <label htmlFor="adultCount" style={{display:'block',marginBottom:'5px',fontWeight:'bold'}}>성인 ({AdultPrice.toLocaleString()}원/인) </label>
            <input type="number" id="adultCount" value={adultCount}
            onChange={(e)=> CountChage('adult', e.target.value)}
            disabled={isReservationFinished} style={{ boxSizing:'border-box', width:'100%', padding:'8px', border:'1px solid #ccc', borderRadius:'4px', backgroundColor:isReservationFinished ? '#e8ecef' : '#fff'}} />
        </div>
        <div style={{ flex:1 }}>
            <label htmlFor="youthCount" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>청소년 ({YouthPrice.toLocaleString()}원/인)</label>
            <input type="number" value={youthCount}
            onChange={(e)=> CountChage('youth', e.target.value)}
            disabled={isReservationFinished} style={{ boxSizing:'border-box', width:'100%', padding:'8px', border:'1px solid #ccc', borderRadius:'4px', backgroundColor:isReservationFinished ? '#e8ecef' : '#fff'}} />
        </div>
        </div>
        <div style={{ marginTop:'15px', textAlign:'right', fontWeight:'bold', color:'#007bff' }}>
        총 인원: { totalRequestedPeople }명
        </div>
    </div>
    <div>
        <h2 style={{ textAlign:'center', color:'#333', marginBottom:'15px' }}>좌석 선택</h2>
        <div style={{display:'flex', flexWrap:'wrap',justifyContent:'center', gap:'10px', width:'100%'}}>
        {allSeats.map((seat,idx)=>(
            <div key={seat.id} onClick={()=>{ toggleSeat(seat.id); }} style={{
            width:'40px', height:'40px',
            backgroundColor:selectedSeats.includes(seat.id) ? '#28a745':'#e0e0e0',
            color: selectedSeats.includes(seat.id) ? '#fff' : '#333',
            borderRadius:'5px', display:'flex', justifyContent:'center',
            alignItems:'center', cursor:'pointer', border:'1px solid #bbb',
            opacity: isReservationFinished ? 0.6:1
            }}> {seat.id} </div>
        ))}
        </div>
    </div>
    <div style={{ marginTop:'30px', padding:'15px', borderTop:'1px solid #eee', textAlign: 'right' }}>
        <p style={{ fontSize:'1.1em', marginBottom:'5px', color:'#555' }}>
        선택한 좌석 수 
        <span style={{ fontWeight:'bold', color:'#007bff'}}>{ selectedSeats.length }개</span>
        </p>
        <p style={{ fontSize:'1.5em', fontWeight:'bold', color:'#dc3545' }}>
        총 결제 금액:{ totalPrice.toLocaleString() }원 
        </p>
        <button onClick={reservationComplte} disabled={isButtonDisabled} style={{
        marginTop:'20px',padding:'10px 20px', fontSize:'1.2em', fontWeight:'bold',
        backgroundColor:isButtonDisabled ? '#ccc':'#007bff',
        color:'#fff', border:'none', borderRadius:'5px',
        cursor:isButtonDisabled ? 'not-allowed': 'pointer'
        }}> 예약 완료 </button>
    </div>
    {isReservationFinished && (
        <div style={{marginTop:'30px', padding:'20px', textAlign:'center',
        border:'2px solid #28a745', borderRadius:'8px', backgroundColor: '#e6ffe6'
        }}>
        <h2 style={{ color:'#28a745', marginBottom:'15px' }}>예약이 완료되었습니다.</h2>
        <p style={{ fontSize:'1.1em', marginBottom:'10px' }}>
            선택한 좌석 번호: 
            <strong style={{ color:'#dc3545' }}>{ finalizedSeats.join(', ') }</strong>
        </p>
        <p style={{ fontSize:'1.3em', fontWeight:'bold', color:'#dc3545' }}>
            최종 결제 금액:
            <strong style={{ color:'#dc3545' }}>{ fintalizePrice.toLocaleString() }원</strong>
        </p>
        </div>
    )}
    </div>
);

}

export default ReservStep01;