import { useEffect, useState } from "react";

const allSeats = Array.from({length:20},(_,index)=>(
    {id:index+1, booked:false,}
))

function Resev(){
    console.log(allSeats);

    const adultPrice = 1000;
    const youthPrice = 500;
    const [selectedSeats, setSelectedSeats] = useState([])
    const [adultCount, setAdultCount] = useState(0)
    const [youthCount, setYouthCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const [isReservationFinished, setIsReservationFinished] = useState(false);
    const [finalizedSeats, setFinalizedSeats] = useState();
    const [finalizedPrice, setFinalizedPrice] = useState();

    useEffect(()=>{
        const calculateTotal = (adultCount*adultPrice) + (youthCount*youthPrice);
        setTotalPrice(calculateTotal);
    },[adultCount, youthCount])

    const CountChange = (type, value)=>{
        if( isReservationFinished ) return;
    
    
        const newCount = Math.max(0, Number(value));
        let newAdult = adultCount;
        let newYouth = youthCount;

        if(type==='adult'){
            newAdult=newCount;
            setAdultCount(newCount)
        }else{
            newYouth = newCount;
            setYouthCount(newCount);
    }
    
  
    const totalRequestedPeople = adultCount+youthCount;
    const newTotalRequestedPeople = newAdult + newYouth;

    if( selectedSeats.length>totalRequestedPeople ){
        setSelectedSeats( selectedSeats.slice(0, newTotalRequestedPeople))
      }
      if( totalRequestedPeople=== 0){
        setSelectedSeats([]);
      }
    }

    const toggleSeat =(id)=>{
        if(isReservationFinished ) return;

        
        if(selectedSeats.includes(id)){
            setSelectedSeats(selectedSeats.filter(seat=> seat !==id))
        }else if(selectedSeats.length < totalRequestedPeople){
            setSelectedSeats([...selectedSeats, id]);
        }else{
            alert(`총 ${totalRequestedPeople}명 인원에 맞춰서 좌석을 선택하세요.`)
        }
    }

    const reservationComplete=()=>{
        if(totalRequestedPeople === 0){
            alert('인원수를 먼저 선택하세요')
            return;
        }
        if(selectedSeats.length !== totalRequestedPeople){
            alert('총 인원수에 맞춰 좌석을 모두 선택하세요');
            return;
        }
        setIsReservationFinished(true);
        setFinalizedSeats(selectedSeats);
        setFinalizedPrice(totalPrice)
    }

    const isButtonDisabled = isReservationFinished || totalRequestedPeople===0 || selectedSeats.length !== totalRequestedPeople;


    return(
        <div>
            <h1>좌석예매하기</h1>
            <div>
                <h2>인원수 선택</h2>
                <div>
                    <label>성인 ({adultPrice.toLocaleString()}원/인)</label>
                    <input type="number" id="adultCount" value={adultCount} onChange={(e)=>CountChange('adult', e.target.value)} disabled={isReservationFinished} />
                </div>
                <div>
                    <label>청소년 ({youthPrice.toLocaleString()}원/인)</label>
                    <input type="number" id="youthCount" value={youthCount} onChange={(e)=>CountChange('youth', e.target.value)} disabled={isReservationFinished} />
                </div>
                <div><label>총 인원</label>{totalRequestedPeople}</div>
            </div>
            <div>
                <h2>좌석 선택</h2>
                <div style={{display:'flex', width:'200px', flexWrap:'wrap', gap:'10px'}}>
                    {
                        allSeats.map((seat,idx)=>(
                            <div key={seat.id} onClick={()=>{toggleSeat(seat.id)}} 
                                style={{width:'40px', height:'40px', 
                                backgroundColor:selectedSeats.includes(seat.id) ? '#2a7541' : '#e0e0e0', 
                                color:selectedSeats.includes(seat.id) ? '#fff' :'#333',
                                borderRadius:'5px', display:'flex',justifyContent:'center', alignItems:'center',cursor:'pointer',
                                border:'1px solid #bbb',
                            }}
                            >
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <p>선택한 좌석수 : <span> {selectedSeats.length}개</span></p>
                <p>총 결제 예정금액 : <span> {totalPrice.toLocaleString()}</span></p>
                <button onClick={reservationComplete} disabled={isButtonDisabled} 
                    style={{marginTop:'20px', padding:'10px 20px', fontSize:'1.2rem', fontWeight:'bold',
                    backgroundColor:isButtonDisabled ? '#ccc' : '#007bff',
                    color:'#fff', border:'none', borderRadius:'5px',
                    cursor:isButtonDisabled ? 'not-allowed' : 'pointer',
                }}>예약 완료</button>
            </div>
            {
                isReservationFinished && (
                    <div style={{textAlign:'center', marginTop:'30px'}}>
                        <h2>예약이 완료되었습니다.</h2>
                        <p>선택한 좌석번호 : <strong>{finalizedSeats.join(', ')}</strong></p>
                        <p>최종 결제 금액 : <strong>{finalizedPrice.toLocaleString()}원</strong></p>
                    </div>
                )
            }
        </div>
    )
}

export default Resev;