import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useState } from 'react';
import './App.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function App() {
  const players = [
  {
    rank: 1, name: "최지훈", team: "SSG", point: 471.10, baseScore: 396.40, contribution: 74.70,
    avg: 0.278, hits: 88, hr: 3, rbi: 25, bb: 26, obp: 0.334, slg: 0.360, ops: 0.694,
    wRC: 94.2, war: 1.41
  },
  {
    rank: 2, name: "한유섬", team: "SSG", point: 464.30, baseScore: 406.50, contribution: 57.80,
    avg: 0.265, hits: 73, hr: 9, rbi: 38, bb: 26, obp: 0.338, slg: 0.422, ops: 0.760,
    wRC: 103.1, war: 0.82
  },
  {
    rank: 3, name: "최정", team: "SSG", point: 362.74, baseScore: 283.50, contribution: 79.24,
    avg: 0.196, hits: 29, hr: 10, rbi: 30, bb: 24, obp: 0.333, slg: 0.432, ops: 0.765,
    wRC: 99.5, war: 0.34
  },
  {
    rank: 4, name: "고명준", team: "SSG", point: 326.66, baseScore: 368.90, contribution: -42.24,
    avg: 0.292, hits: 81, hr: 7, rbi: 36, bb: 14, obp: 0.326, slg: 0.437, ops: 0.763,
    wRC: 108.1, war: 1.52
  },
  {
    rank: 5, name: "박성한", team: "SSG", point: 298.03, baseScore: 317.40, contribution: -19.37,
    avg: 0.248, hits: 67, hr: 4, rbi: 26, bb: 51, obp: 0.369, slg: 0.356, ops: 0.725,
    wRC: 112.3, war: 3.20
  },
  {
    rank: 6, name: "오태곤", team: "SSG", point: 274.40, baseScore: 206.90, contribution: 67.50,
    avg: 0.228, hits: 29, hr: 3, rbi: 19, bb: 19, obp: 0.331, slg: 0.346, ops: 0.677,
    wRC: 85.6, war: 0.41
  },
  {
    rank: 7, name: "에레디아", team: "SSG", point: 255.06, baseScore: 209.20, contribution: 45.86,
    avg: 0.282, hits: 42, hr: 4, rbi: 16, bb: 14, obp: 0.345, slg: 0.389, ops: 0.734,
    wRC: 91.0, war: 0.81
  },
  {
    rank: 8, name: "최준우", team: "SSG", point: 230.16, baseScore: 211.40, contribution: 18.76,
    avg: 0.220, hits: 28, hr: 3, rbi: 22, bb: 26, obp: 0.352, slg: 0.291, ops: 0.643,
    wRC: 85.8, war: 0.24
  },
  {
    rank: 9, name: "김성현", team: "SSG", point: 103.57, baseScore: 74.80, contribution: 28.77,
    avg: 0.229, hits: 16, hr: 1, rbi: 7, bb: 11, obp: 0.329, slg: 0.300, ops: 0.629,
    wRC: 83.6, war: 0.37
  },
  {
    rank: 10, name: "안상현", team: "SSG", point: 85.41, baseScore: 87.00, contribution: -1.59,
    avg: 0.286, hits: 30, hr: 1, rbi: 7, bb: 8, obp: 0.333, slg: 0.371, ops: 0.704,
    wRC: 98.5, war: -0.07
  },
  {
    rank: 11, name: "조형우", team: "SSG", point: 63.69, baseScore: 146.50, contribution: -82.81,
    avg: 0.263, hits: 42, hr: 3, rbi: 16, bb: 8, obp: 0.308, slg: 0.350, ops: 0.658,
    wRC: 77.2, war: 0.86
  }
];



  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);


  const data = {
    labels:[/* "전체포인트","기본포인트","승리기여도", */"AVG","안타","홈런","타점","볼넷","출루율","장타율","OPS","WRC+","WAR"],
    datasets: [
      {
        label: selectedPlayer.name,
        data: [
          //selectedPlayer.point * 0.1,
          //selectedPlayer.baseScore * 0.1,
          //selectedPlayer.contribution * 1,
          selectedPlayer.avg * 100,
          selectedPlayer.hits * 1,
          selectedPlayer.hr * 1,
          selectedPlayer.rbi * 1,
          selectedPlayer.bb * 1,
          selectedPlayer.obp * 100,
          selectedPlayer.slg * 100,
          selectedPlayer.ops * 100,
          selectedPlayer.wRC * 1,
          selectedPlayer.war * 10,
        ],
        backgroundColor: 'rgba(124,145,182,0.7)',
        borderColor: 'rgba(124,145,182,0.9)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(124,145,182, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(124,145,182,0.9)',
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
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
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
        borderColor: 'rgba(124,145,182,0.9)',
        borderWidth: 1,
        padding: 10,
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#335165' }}>능력치 분석표</h2>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {players.map(player => (
                <button
                    key={player.no}
                    onClick={() => setSelectedPlayer(player)}
                    style={{ padding: '8px 16px',borderRadius: '6px', color: '#335165',cursor: 'pointer',
                    backgroundColor: selectedPlayer.no === player.no ? '#e6ecf5' : '#f9f9f9',
                    }}
                >
                {player.name}
                </button>
          ))}
        </div>

        <div style={{ height: '400px', width: '100%' }}>
          <Radar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default App;
