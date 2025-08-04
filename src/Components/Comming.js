import { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock8, MapPin, X } from 'lucide-react';
import { scheduleData } from '../Monthly_schedule';

function Comming({ num }) {

    
    const [selectedGround, setSelectedGround] = useState(null);
    const [weather, setWeather] = useState(null);

    const API_KEY = "93929c139f0ff3a9c9efb602d77af64d"; // 반드시 발급받은 키로 대체

    useEffect(() => {
        if (selectedGround) {
            const cityName = selectedGround.city;
            axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: cityName,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'kr'
                }
            })
            .then(response => {
                setWeather({
                    temp: response.data.main.temp,
                    feels_like: response.data.main.feels_like,
                    description: response.data.weather[0].description,
                    icon: response.data.weather[0].icon
                });
            })
            .catch(error => {
                console.error("날씨 정보를 불러오지 못했습니다:", error);
                setWeather(null); 
            });
        }
    }, [selectedGround]);

    return (
        <div className="schedule_wrap">
            <h3>Comming Game Schedule</h3>
            <div className="schedule_table">
                {
                    scheduleData.slice(0, num).map((gameItem, idx) => (
                        <div key={idx} className="table_item">
                            <div className="when">
                                <Clock8 className="clock" />
                                <span className="date">{gameItem.DATE}</span>
                                <img src={gameItem.ISHOME} className="hw_btn" alt={gameItem.ISHOME} />
                            </div>
                            <div className="who">
                                <img src={gameItem.VERSUSIMG} alt={gameItem.VERSUS} />
                                <span>VS</span>
                                <img src='./images/club_emblem_ssg.png' alt="ssg" />
                            </div>
                            <div className="where">
                                <MapPin
                                    className="map cursor-pointer"
                                    onClick={(e) => {setSelectedGround(gameItem);}}
                                    />
                                <span>{gameItem.GROUND}</span>
                                <button className='rsv_btn'>{gameItem.RESERVATION}</button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                selectedGround && (
                    <div className='popup_modal'>
                        <div className='popup_box'>
                            <div className='weather_box'>
                                <button onClick={() => { setSelectedGround(null); setWeather(null); }} className='close_btn'>
                                    <X className='x_btn' />
                                </button>
                                <h2 className='where'>{selectedGround.GROUND}</h2>
                                <p className='when'>{selectedGround.DATE}</p>
                                {
                                    weather ? (
                                        <div className='weather'>
                                            <img
                                                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                                                alt={weather.description}
                                                className='wd_icon'
                                            />
                                            <p className='wd_temp'> {weather.temp} ℃ </p>
                                            <p className='feels'> 체감 : <strong> {weather.feels_like} ℃ </strong></p>
                                            <p className='desc'>{weather.description}</p>
                                        </div>
                                    ) : (
                                        <p>날씨 정보를 불러오는 중...</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Comming;
