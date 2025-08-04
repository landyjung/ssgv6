import ReservStep01 from '../Components/ReservStep01'


function Ticket() {

    return (
    <section id="ticket">
        <h2 className='main_title'> TICKET RESERVATION </h2>
        <div className='ticket_wrap'>
            <h3>좌석 선택하기</h3>
            <div className='reserv_01'>
                <div className='block_choice'>
                    <img src="./images/seat_img.jpg" className="lanpark_img" alt="park_img" />
                </div>
                <div className='reserv_box'>
                    <ReservStep01 />
                </div>
            </div>
        </div>
        
    </section>
    );

    }

export default Ticket;