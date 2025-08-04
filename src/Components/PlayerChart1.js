import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
    
  
function PlayerChart1(){
    const players = [
        {
          rank: 1, name: "최지훈", 
          avg: 0.278, hits: 88, hr: 3, rbi: 25, bb: 26, obp: 0.334, slg: 0.360, ops: 0.694,
          wRC: 94.2, war: 1.41
        },
        {
          rank: 2, name: "한유섬", 
          avg: 0.265, hits: 73, hr: 9, rbi: 38, bb: 26, obp: 0.338, slg: 0.422, ops: 0.760,
          wRC: 103.1, war: 0.82
        },
        {
          rank: 3, name: "최정", 
          avg: 0.196, hits: 29, hr: 10, rbi: 30, bb: 24, obp: 0.333, slg: 0.432, ops: 0.765,
          wRC: 99.5, war: 0.34
        },
        {
          rank: 4, name: "고명준", 
          avg: 0.292, hits: 81, hr: 7, rbi: 36, bb: 14, obp: 0.326, slg: 0.437, ops: 0.763,
          wRC: 108.1, war: 1.52
        },
        {
          rank: 5, name: "박성한", 
          avg: 0.248, hits: 67, hr: 4, rbi: 26, bb: 51, obp: 0.369, slg: 0.356, ops: 0.725,
          wRC: 112.3, war: 2.20
        },
        {
          rank: 6, name: "오태곤", 
          avg: 0.228, hits: 29, hr: 3, rbi: 19, bb: 19, obp: 0.331, slg: 0.346, ops: 0.677,
          wRC: 85.6, war: 0.41
        },
        {
          rank: 7, name: "에레디아", 
          avg: 0.282, hits: 42, hr: 4, rbi: 16, bb: 14, obp: 0.345, slg: 0.389, ops: 0.734,
          wRC: 91.0, war: 0.81
        },
        {
          rank: 8, name: "최준우", 
          avg: 0.220, hits: 28, hr: 3, rbi: 22, bb: 26, obp: 0.352, slg: 0.291, ops: 0.643,
          wRC: 85.8, war: 0.24
        },
        {
          rank: 9, name: "김성현", 
          avg: 0.229, hits: 16, hr: 1, rbi: 7, bb: 11, obp: 0.329, slg: 0.300, ops: 0.629,
          wRC: 83.6, war: 0.37
        },
        {
          rank: 10, name: "안상현",
          avg: 0.286, hits: 30, hr: 1, rbi: 7, bb: 8, obp: 0.333, slg: 0.371, ops: 0.704,
          wRC: 98.5, war: 0.07
        },
        {
          rank: 11, name: "조형우",
          avg: 0.263, hits: 42, hr: 3, rbi: 16, bb: 8, obp: 0.308, slg: 0.350, ops: 0.658,
          wRC: 77.2, war: 0.86
        }
      ];
      const [selectedPlayer, setSelectedPlayer] = useState(players[0]);

    const data = {
        labels:["AVG","출루율","장타율","OPS","WRC+","WAR"],
        datasets: [
          {
            label: selectedPlayer.name,
            data: [
              selectedPlayer.avg * 1,
              selectedPlayer.ops * 1,
              selectedPlayer.obp * 1,
              selectedPlayer.slg * 1,
              selectedPlayer.wRC *0.01 ,
              selectedPlayer.war * 1,
            ],
            backgroundColor: 'rgba(255, 24, 1,0.6)',
            borderColor: 'rgba(255, 24, 1,0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 24, 1, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 24, 1,0.9)',
            pointRadius: 4,
            pointHoverRadius: 6,
          }
        ]
      };
    
      const options = {
        scales: {
          r: {
                angleLines: {
                display: true,
                color: 'rgba(226,232,240,0.8)',
            },
                suggestedMin: 0,
                suggestedMax: 1,
                ticks: {
                stepSize: 0.2,
                backdropColor: 'transparent'
            }
          }
        },
        plugins: {
            legend: {
            display: true,
        },
            tooltip: {
            backdropColor: 'rgba(255,255,255,0.9)',
            titleColor: 'rgba(206, 206, 206, 0.9)',
            bodyColor: 'rgba(190, 190, 190, 0.9)',
            borderColor: 'rgba(255, 24, 1,0.9)',
            borderWidth: 1,
            padding: 10,
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      };
    

    return(
    <div className='player_chart1'>
        <h2>2025 타자 순위</h2>
        <div className='player_wrap'>
            <div className='player_list'>
                <table className='player_table'>
                    <tbody>
                    <tr style={{fontSize:'14px'}}>
                        <th>순위</th>
                        <th>이름</th>
                        <th>타율</th>
                        <th>안타</th>
                        <th>홈런</th>
                        <th>타점</th>
                        <th>볼넷</th>
                        <th>출루율</th>
                        <th>장타율</th>
                        <th>OPS</th>
                        <th>wRC+</th>
                        <th>WAR</th>
                    </tr>
                    {
                        players.map((player,index)=>(
                            <tr key={player.rank}>
                                <td>{player.rank}</td>
                                <td className='player_name'>
                                    <a href="{()=>false}"
                                      onClick={(e) => { e.preventDefault(); setSelectedPlayer(player); }} 
                                      className={selectedPlayer.name === player.name ? "active" : ''} >
                                      {player.name}
                                    </a>
                                </td>
                                <td>{player.avg}</td>
                                <td>{player.hits}</td>
                                <td>{player.hr}</td>
                                <td>{player.rbi}</td>
                                <td>{player.bb}</td>
                                <td>{player.obp}</td>
                                <td>{player.slg}</td>
                                <td>{player.ops}</td>
                                <td>{player.wRC}</td>
                                <td>{player.war}</td>                        
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <div className='player_chartarea'>
                <Radar data={data} options={options} />
            </div>
        </div>
    </div>
     
    )
}
export default PlayerChart1;