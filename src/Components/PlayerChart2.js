    import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
    import { useState } from 'react';
    import {  Line } from 'react-chartjs-2';

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

    const playerRecord  = [
    {
        name: "박성한",
        no:2,
        engName:'Park sung han',
        position:"유격수",
        img : "./images/ssg_002.png",
        birth:'1998/3/30',
        school:'순천북초 -여수중 -효천고',
        entry:'2017 SK 2차 지명',
        type:'우투좌타',
        data: [
        { date: 0, value: 0.5 },
        { date: 1, value: 0.0 },
        { date: 2, value: 0.5 },
        { date: 3, value: 0.0 },
        { date: 4, value: 0.0 },
        { date: 5, value: 0.333},
        { date: 6,value: 0.5 },
        { date: 7, value: 0.333 },
        { date: 8, value: 0.5 },
        { date: 9, value: 0.667 }
        ]
    },
    {
        name: "최정",
        no:14,
        engName:'Choi jung',
        position:"3루수",
        img : "./images/ssg_014.png",
        birth:'1987/02/28',
        school:'대일초 -평촌중 -유신고',
        entry:'2005년 SK와이번스',
        type:'우투우타',
        data: [
        { date: 0, value: 0.2 },
        { date: 1, value: 0.25  },
        { date: 2, value: 0.25 },
        { date: 3, value: 0.0 },
        { date: 4, value: 0.333 },
        { date: 5, value: 0.0 },
        { date: 6, value: 0.0 },
        { date: 7, value: 0.25 },
        { date: 8, value: 0.25 },
        { date: 9, value: 1.0 }
        ]
    },
    {
        name: "조형우",
        no:20,
        engName:'Cho hyung woo',
        position:"포수",
        img : "./images/ssg_020.png",
        birth:'2002/04/04',
        school:'송정동초-무등중 -광주일고',
        entry:'2020년 SK와이번스',
        type:'우투우타',
        data: [
        { date: 0, value: 0.5 },
        { date: 1, value: 0.25  },
        { date: 2, value: 0.0 },
        { date: 3, value: 0.5},
        { date: 4, value: 0.5 },
        { date: 5, value: 0.4 },
        { date: 6, value: 0.25 },
        { date: 7,  value: 0.0  },
        { date: 8, value: 0.0 },
        { date: 9, value: 0.25 }
        ]
    },
    {
        name: "최지훈",
        no:54,
        engName:'Choi Ji Hoon',
        position:"중견수",
        img : "./images/ssg_054.png",
        birth:'1997/07/23',
        school:'수창초 -무등중 -광주일고 -동국대',
        entry:'2020년 SK와이번스',
        type:'우투좌타',
        data: [
        {  date: 0, value: 0.25 },
        { date: 1, value: 0.0 },
        { date: 2, value: 0.25 },
        { date: 3,  value: 0.333 },
        { date: 4, value: 0.0 },
        { date: 5, value: 0.333 },
        {  date: 6, value: 0.0 },
        { date: 7, value: 0.0 },
        { date: 8, value: 0.25 },
        { date: 9, value: 0.4 }
        ]
    },
    {
        name: "안상현",
        no:10,
        engName:'An Sang Hyun',
        position:"내야수",
        img : "./images/ssg_010.png",
        birth:'1997/01/27',
        school:'사파초 -선린중 -용마고',
        entry:'2021년 SK와이번스',
        type:'우투우타',
        data: [
        { date: 0,  value: 0.6 },
        { date: 1,  value: 0.0 },
        { date: 2, value: 0.0 },
        { date: 3, value: 0.25 },
        { date: 4, value: 0.25  },
        { date: 5, value: 0.2 },
        { date: 6, value: 0.25 },
        { date: 7, value: 0.5 },
        { date: 8, value: 0.0 },
        { date: 9, value: 0.4  }
        ]
    },
    {
        name: "고명준",
        no:18,
        engName:'Ko Myoung Joon',
        position:"1루수",
        img : "./images/ssg_018.png",
        birth:'2002/07/08',
        school:'서원초 -세광중 -세광고',
        entry:'2021년 SK와이번스',
        type:'우투우타',
        data: [
        {  date: 0, value: 0.25 },
        {  date: 1, value: 0.5  },
        { date: 2, value: 0.5 },
        { date: 3, value: 0.0 },
        { date: 4, value: 1.0  },
        { date: 5, value: 0.0 },
        { date: 6, value: 0.25 },
        {  date: 7, value: 0.75 },
        { date: 8,  value: 0.25 },
        { date: 9, value: 0.25 }
        ]
    },  
    ]

    const options = {
    responsive: true,
    plugins: {
        legend: {
        display: true,
        },
        title: {
        display: true,
        text: '최근 10경기 타율',
        },
    },
    scales: {
        y: {
        suggestedMin: 0,
        suggestedMax: 1,
        }
    }
    };

    function PlayerChart2() {
        const [selectedPlayer, setSelectedPlayer] = useState(playerRecord[0].name);
        const currentData = playerRecord.find(p => p.name === selectedPlayer);
        const chartData = {
        labels: currentData.data.map(d => `Day ${d.date + 1}`),
        datasets: [
            {
            label: selectedPlayer,
            data: currentData.data.map(d => d.value),
            borderColor: '#f30',
            backgroundColor: 'rgba(255, 24, 1, 0.4)',
            pointStyle: 'circle',
            pointRadius: 7,
            pointHoverRadius: 8,
            }
        ]
        };

        return (
        <div className="player_chart2">
            <h2>최근 10경기 타율</h2>
            <div className='name_wrap'>
                <ul className="player_name">
                    {playerRecord.map((player) => (
                        <li key={player.name}>
                            <a
                                href="#"  onClick={(e) => {e.preventDefault(); setSelectedPlayer(player.name);}}
                                className={selectedPlayer === player.name ? "active" : ''}
                            >
                            {player.name} 
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="player_record">
                <div className='player_cards'>
                    <div className="player_card">
                        {
                            playerRecord.filter((player) => player.name === selectedPlayer).map((player) => (
                            <div key={player.name} className="player_details">
                                <div className="card_top">
                                <div className="player_info">
                                    <p className="no">{player.no}</p>
                                    <p className="name">{player.name}</p>
                                    <p className="engName">{player.engName}</p>
                                </div>
                                <img src={player.img} alt={player.name} className="player_photo" />
                                </div>
                                <div className="card_bottom">
                                <p>{player.position}</p>
                                <p>{player.type}</p>
                                <p>{player.birth}</p>
                                <p>{player.school}</p>
                                <p>{player.entry}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                <div className="line_data">
                    <Line data={chartData} options={options} />
                </div>
            </div>
        </div>
        );
    }

    export default PlayerChart2;

    /* function PlayerChart2() {

    const [selectedPlayer, setSelectedPlayer] = useState(playerRecord[0].name);
    const currentData = playerRecord.find(p => p.name === selectedPlayer);
    const chartData = {
        labels: currentData.data.map(d => `Day ${d.date + 1}`),
        datasets: [
        {
            label: selectedPlayer,
            data: currentData.data.map(d => d.value),
            borderColor: '#f30',
            backgroundColor: 'rgba(255, 24, 1, 0.4)',
            pointStyle: 'circle',
            pointRadius: 7,
            pointHoverRadius: 8,
        }
        ]
    };
    return (
        <div className="player_chart2">
            <h2>최근 10경기 타율</h2>
            <div className='player_record'>
                <ul className='player_cards'>
                {
                    playerRecord.map((player) => (
                    <li key={player.name}>
                        <a href="{()=>false}" onClick={(e) => { e.preventDefault();  setSelectedPlayer(player.name);  }} 
                            className={selectedPlayer === player.name ? "active" : ''} >
                        {player.name}</a> <span className='position'>{player.position}</span>
                    </li>
                    ))
                }
                    {
                    playerRecord.map((player) => (
                        <li key={player.name} className='player_card'>
                            <a href="{()=>false}" onClick={(e) => { e.preventDefault();  setSelectedPlayer(player.name);  }} 
                                className={selectedPlayer === player.name ? "active" : ''} >
                                <div >
                                    <div className='card_top'>
                                        <div className='player_info'>
                                            <p className='no'>{player.no}</p>
                                            <p className='name'>{player.name}</p>
                                            <p className='engName'>{player.engName}</p>
                                        </div>
                                        <img src={player.img} alt={player.name} className='player_photo' />
                                    </div>
                                    <div className='card_bottom'>
                                        <p>{player.position}</p>
                                        <p>{player.type}</p>
                                        <p>{player.birth}</p>
                                        <p>{player.school}</p>
                                        <p>{player.entry}</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))
                    }
                    
                </ul>
                <div  className='line_data'>
                    <Line data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
    }

    export default PlayerChart2; */