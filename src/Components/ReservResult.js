import { BrowserRouter as  Routes, Route, useLocation } from 'react-router-dom';
import Reservation from './Reservation';

function ReservResult() {
    const location = useLocation();
    console.log(location);

return (
    <div className='w-full max-w-9xl mx-auto' >
        <Routes>
            <Route path="/ReservResult" element={<Reservation />} />
        </Routes>
    </div>
    );
}

export default ReservResult;