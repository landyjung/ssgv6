import { useState, useEffect, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function PlayerChart3() {
const [chartData, setChartData] = useState(null);
const [selectedFile, setSelectedFile] = useState('baseball-stats-2025.xlsx');
const [chartType, setChartType] = useState('avg');
const [loading, setLoading] = useState(false);

const files = [
    { value: 'baseball-stats-2025.xlsx', label: '2025시즌' },
    { value: 'baseball-stats-2024.xlsx', label: '2024시즌' }
];

const charts = [
    { value: 'avg', label: '타율 순위' },
    { value: 'games', label: '경기 수 vs 타율' },
    { value: 'comparison', label: '종합 비교' }
];

const loadData = useCallback(async (filename) => {
    setLoading(true);
    try {
        const response = await fetch(`/${filename}`);
        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
    
        const players = data.slice(1).map(row => ({
            name: row[1],
            team: row[2],
            avg: Number(row[3]),
            games: Number(row[4]) || 0,
            pa: Number(row[5]) || 0
        })).filter(p => p.name && p.team && p.avg);

        // 차트 생성 로직을 인라인으로 이동
        const colors = players.map((_, i) => `hsl(${(i * 95) % 10}, 50%, 50%)`);
    
        let chartConfig;
        switch (chartType) {
        case 'avg':
            chartConfig = {
            labels: players.map(p => `${p.name} (${p.team})`),
            datasets: [{
                label: '타율',
                data: players.map(p => p.avg),
                backgroundColor: colors,
                borderColor: colors.map(c => c.replace('60%', '50%')),
                borderWidth: 2
            }]
            };
            break;
        case 'games':
            chartConfig = {
            labels: players.map(p => p.name),
            datasets: [
                {
                label: '경기 수',
                data: players.map(p => p.games),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                yAxisID: 'y'
                },
                {
                label: '타율 (×100)',
                data: players.map(p => p.avg * 100),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: 'y1'
                }
            ]
            };
            break;
        case 'comparison':
            chartConfig = {
                labels: players.map(p => p.name),
                datasets: [
                    {
                    label: '타율 (×100)',
                    data: players.map(p => p.avg * 100),
                    borderColor: 'rgb(255, 99, 132)',
                    yAxisID: 'y'
                    },
                    {
                    label: '경기 수',
                    data: players.map(p => p.games),
                    borderColor: 'rgb(75, 192, 192)',
                    yAxisID: 'y1'
                    },
                    {
                    label: '타석 수 (÷10)',
                    data: players.map(p => p.pa / 10),
                    borderColor: 'rgb(255, 205, 86)',
                    yAxisID: 'y'
                    }
                ]
            };
            break;
        default:
            // 기본값 설정
            chartConfig = {
            labels: [],
            datasets: []
            };
            break;
        }        
        setChartData(chartConfig);
    } catch (error) {
        console.error('데이터 로딩 실패:', error);
    }
    setLoading(false);
}, [chartType]);

const getOptions = () => {
    const base = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
            display: true,
            text: `${files.find(f => f.value === selectedFile)?.label} - ${charts.find(c => c.value === chartType)?.label}`
            }
        }
    };

    if (chartType === 'avg') {
        return {
            ...base,
            scales: {
            y: { beginAtZero: true, title: { display: true, text: '타율' } }
            }
        };
    } else {
        return {
            ...base,
            scales: {
            y: { type: 'linear', position: 'left' },
            y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false } }
            }
        };
    }
};

useEffect(() => {
    loadData(selectedFile);
}, [selectedFile, loadData]);

return (
    <div className="player_chart3">
        <h2>야구선수 통계 뷰어</h2>
        <div className='season_record'>
    
            <div className='season_select'>
                <div>
                    <label>시즌 선택</label>
                    <select value={selectedFile} onChange={(e) => setSelectedFile(e.target.value)}>
                        {files.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                    </select>
                </div>                
                <div>
                    <label>차트 종류</label>
                    <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                        {charts.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                </div>
            </div>

            <div className='season_chart'>
                {loading ? (
                <div style={{ textAlign: 'center', paddingTop: '200px' }}>데이터 로딩 중...</div>
                ) : chartData ? (
                chartType === 'avg' ? 
                    <Bar data={chartData} options={getOptions()} /> : 
                    <Line data={chartData} options={getOptions()} />
                ) : null}
            </div>
        </div>
    </div>
);
}

export default PlayerChart3;