import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import PlayerChart1 from '../Components/PlayerChart1';
import PlayerChart2 from '../Components/PlayerChart2';
import PlayerChart3 from '../Components/PlayerChart3';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
    
  
function Player(){

    return(
    <section id="player">
        <h2 className="main_title">Player Ranking</h2>
        
        <PlayerChart1 />
        <PlayerChart2 />
        <PlayerChart3 />
    </section>
    )
}
export default Player;