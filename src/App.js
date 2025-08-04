import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ArrowBigUpDash  } from 'lucide-react';
import './styles/main_style.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Pages/Main';
import Team from './Pages/Team';
import News from './Pages/News';
import Game from './Pages/Game';
import Player from './Pages/Player';
import Ticket from './Pages/Ticket';
import Shop from './Pages/Shop';
import Reservation from './Components/Reservation';

function App() {
    return (
    <div className='w-full max-w-9xl mx-auto' >
        <Header />
        <div className='w-full'>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/News" element={<News />} />
                <Route path="/Team" element={<Team />} />
                <Route path="/Game" element={<Game />} />
                <Route path="/Player" element={<Player />} />
                <Route path="/Ticket" element={<Ticket />} />
                <Route path="/Shop" element={<Shop />} />
                <Route path="/ReservResult" element={<Reservation />} />
            </Routes>
        </div>
        <div className='topBtn'>
            <a href='#'><ArrowBigUpDash  size={30} /></a>
        </div>
        <Footer />
    </div>
    );
}

export default App;