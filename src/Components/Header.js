import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import CountTime from './CountTime';
import { scheduleData } from '../Monthly_schedule';
import { HistoryData } from '../HistoryData';
import { NewsData, SnsData} from '../NewsData'
import { CloudSun, MapPin  } from 'lucide-react';
import { Goods, ProductData } from '../ProductData';
import BestPlayer from './BestPlayer';

function Header() {
    const menuData = {
        NEWS:{
        sections:[
            {name:'News',title:'NEWS', items:['공지사항', '새소식', 'SNS','갤러리']},            
        ],
        },
        TEAM:{
            sections:[
            {name:'Team',title:'TEAM', items:['연혁', '앰블럼', '후원사']},            
            ],
        },
        TICKET:{
            sections:[
            {name:'Ticket',title:'TICKET', items:['티켓예매', '예매내역조회', '쿠폰','체크인']},            
            ],
        },
        GAME:{
            sections:[
            {name:'Game',title:'GAME', items:['경기기록', '경기일정', '리뷰']},            
            ],
        },
        PLAYER:{
            sections:[
            {name:'Player',title:'PLAYER', items:['감독/코치', '투수', '내/외야수','포수','군입대']},            
            ],
        },
        SHOP:{
            sections:[
            {name:'Shop',title:'SHOP', items:['랜더스몰', '형지샵', '이마트몰']},            
            ],
        },
    }
        
    const [activeMenu, setActiveMenu] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobiletoggle, setMobiletoggle] = useState(false);
    const [isOpen, setIsOpen] = useState(false);    
    const [isMobile, setIsMobile] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleMenuHover = (menu) =>{
        setActiveMenu(menu);
        setIsMenuOpen(true);
    }
    const handleMenuLeave = () => {
        setActiveMenu(null);
        setIsMenuOpen(false);
    }
    const toggleBtn = () => {
        setIsOpen(prev => !prev);        
    };
    const toggleMenu=(id)=>{
        setSelectedId(selectedId===id ? null:id);                
    }

    useEffect(() => {
        const deActive = () => {
            if (window.innerWidth >= 768) {
            setMobiletoggle(false);
            setIsOpen(false);        
            setSelectedId(null);
            }
            
            const handleResize = () => {
                setIsMobile(window.innerWidth < 768); 
            };
            handleResize(); 
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        };
    
    
        window.addEventListener("resize", deActive);
        return () => window.removeEventListener("resize", deActive);
        }, []);

    const navigate = useNavigate();

    const getLogoSrc = () => {
  const logoKey = activeMenu || path; // hover 중이면 activeMenu, 아니면 path 기준
  if (!logoKey) return "/images/mainlogo_b.svg";
  return `/images/logo_${logoKey.toLowerCase()}.svg`;
};

    const location = useLocation();
    const path = location.pathname.split('/')[1].toUpperCase(); // 예: '/news/abc' → 'NEWS'

    const getHeaderColor = () => {
        switch (path) {
            case 'NEWS': return '#180642';
            case 'TEAM': return '#083737';
            case 'TICKET': return '#8E0808';
            case 'GAME': return '#180642';
            case 'PLAYER': return '#083737';
            case 'SHOP': return '#8E0808';
            default: return '#242424';
        }
    };
    const getHoverColor = () => {
        switch (activeMenu) {
            case 'NEWS': return '#180642';
            case 'TEAM': return '#083737';
            case 'TICKET': return '#8E0808';
            case 'GAME': return '#180642';
            case 'PLAYER': return '#083737';
            case 'SHOP': return '#8E0808';
            default: return getHeaderColor();
        }
    };
    
    const [selectedYear, setSelectedYear] = useState(HistoryData[0].year);
    const yearData = HistoryData.find((data) => data.year === selectedYear);

    return (
    <header id="header" onMouseLeave={handleMenuLeave}>
        <div className={`header_wrap header-${(activeMenu || path).toLowerCase()}`}  
        style={{ backgroundColor: activeMenu ? getHoverColor() : getHeaderColor() }}>
            <h1 onClick={() => navigate("/")} className='head_logo'>
                <img src={getLogoSrc()} alt="logo" />
            </h1>
            <ul className='head_nav'>
                {
                    Object.keys(menuData).map((menu)=>(
                        <li key={menu}>
                            <a href={`/${menu}`}  onMouseEnter={()=>handleMenuHover(menu)}>{menu}</a>
                        </li>
                    ))
                }
            </ul>
            <button onClick={()=>{setMobiletoggle(!mobiletoggle); toggleBtn()}} className='toggle_btn'>
                <img src='./images/toggle.png' className={`${isOpen? 'rotate-90':''}`} alt="toggle" />
            </button>
        </div>
        
        {
            activeMenu && menuData[activeMenu] && (
            <div className={`submenu submenu-${activeMenu.toLowerCase()}`}>
            {
                activeMenu==='NEWS' && (
                <div className="sub_inner">
                {
                    menuData[activeMenu].sections.map((section, idx)=>{
                    return(
                    <div key={idx} className='sub_list'>
                        <div className='sub_list_wrap'>
                            <h3 className="sub_list_title">
                            {section.title}
                            </h3>
                            <ul >
                            {section.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="submenu_text">
                                <a href="{()=>false}" className="">{item}</a>
                                </li>
                            ))}
                            </ul>
                        </div>
                        <div className='sub_content'>
                            <div className='news_wrap'>
                                {
                                    NewsData.slice(0,2).map((news,idx)=>(
                                        <div key={idx} className='news_item'>
                                            <img src={news.img} alt={news.title} />
                                            <div className='text'>
                                                <h5 className='title'>{news.title}</h5>
                                                <p className='subs'>{news.subscript}</p>
                                                <p className='date'>{news.date}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='sns_wrap'>
                            {
                                    SnsData.slice(0,2).map((snss,idx)=>(
                                        <div href="{()=>false}" key={idx} className='sns_items'>
                                            <div className='sns_item'>
                                                <img src={snss.img} alt={snss.title} />
                                                <div className='text'>
                                                    <h5 className='title'>{snss.title}</h5>
                                                    <p className='date'>{snss.date}</p>
                                                </div>
                                            </div>
                                            <p className='subscript'>{snss.subscript}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    )
                })}
                </div>
                )   
            }
            {
                activeMenu==='TEAM' && (
                <div className="sub_inner">
                {
                    menuData[activeMenu].sections.map((section, idx)=>{
                    return(
                        <div key={idx} className='sub_list'>
                        <div className='sub_list_wrap'>
                            <h3 className="sub_list_title">
                            {section.title}
                            </h3>
                            <ul >
                            {section.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="submenu_text">
                                <a href="{()=>false}" className="">{item}</a>
                                </li>
                            ))}
                            </ul>
                        </div>
                        <div className='sub_content'>
                            <div className='team_emblem'>
                                <ul className='img_wrap'>
                                    <li>
                                        <p>SSG랜더스 메인 로고</p>
                                        <img src='./images/MainLogo_w 1.png' alt="landers_logo" />
                                        <img src='./images/MainLogo_r 1.png' alt="landers_logo" />
                                    </li>
                                    <li>
                                        <p>SSG랜더스 서브 엠블럼</p>
                                        <img src='./images/SubEmblem.png' alt="ssg" />
                                    </li>
                                </ul>
                            </div>
                            <div className='team_history'>
                                {
                                    HistoryData.slice(0,1).map((history,idx)=>(
                                        <div key={idx} className='history_wrap'>
                                            <p className='title_year'>{history.year}</p>
                                            <div className='month_wrap'>
                                                {
                                                    yearData &&
                                                    Object.keys(yearData.months).slice(0,2).map((monthId) => {
                                                        const month = yearData.months[monthId];
                                                        return (
                                                        <div key={monthId} id={monthId} className="month_box">
                                                            <div className="month_img" style={{ backgroundImage: `url(${month.img})` }}></div>
                                                            <div className="text_box">
                                                                <h4 className="title">{month.title.toUpperCase()}</h4>
                                                                <ul>
                                                                {
                                                                    month.daily.slice(0,2).map((daily, idx) => (
                                                                        <li key={idx} className="day_text">
                                                                            <p className="day">{daily.day}일</p>
                                                                            <p className="description"> 
                                                                                {
                                                                                    daily.description.split("\n").map((line, i) => (
                                                                                    <span key={i}>{line}<br /></span>
                                                                                    ))
                                                                                }
                                                                            </p>
                                                                        </li>
                                                                    ))
                                                                }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        );
                                                    })
                                                }
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    )
                })}
                </div>
                )   
            }
            {
                activeMenu==='TICKET' && (
                <div className="sub_inner">
                {
                    menuData[activeMenu].sections.map((section, idx)=>{
                    return(
                        <div key={idx} className='sub_list'>
                            <div className='sub_list_wrap'>
                                <h3 className="sub_list_title">
                                {section.title}
                                </h3>
                                <ul >
                                {section.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="submenu_text">
                                    <a href="{()=>false}" className="">{item}</a>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            <div className='sub_content'>
                            <div className='schedule_items'>
                                {
                                    scheduleData.slice(3,6).map((schedule,idx)=>(
                                    <div key={idx} className='schedule_item'>
                                        <div className='when'>{schedule.DATE} {schedule.TIME}</div>
                                        <div className='who'>
                                            <img src={schedule.VERSUSIMG} alt={schedule.VERSUS} />
                                            <span>VS</span>
                                            <img src='./images/club_emblem_ssg.png' alt="ssg_img" />
                                        </div>
                                        <div className='where'>
                                            <div className='ground'>
                                                <span>{schedule.GROUND}</span>
                                                <MapPin className='w-4' />
                                                <CloudSun className='w-4' />
                                            </div>
                                            <span className='reserv_btn'>{schedule.RESERVATION}</span>
                                        </div>
                                    </div>
                                    ))
                                }
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
                )   
            }
            {
                activeMenu==='GAME' && (
                <div className="sub_inner">
                {
                    menuData[activeMenu].sections.map((section, idx)=>{
                    return(
                        <div key={idx} className='sub_list'>
                            <div className='sub_list_wrap'>
                                <h3 className="sub_list_title">
                                {section.title}
                                </h3>
                                <ul >
                                {section.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="submenu_text">
                                    <a href="{()=>false}" className="">{item}</a>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            <div className='sub_content'>
                                <CountTime />
                                <div className='schedule_list'>
                                    {
                                        scheduleData.slice(3, 7).map((gameschedule,idx)=>(
                                            <div key={idx} className='schedule_item'>
                                                <div className='text'>
                                                    <span className='date'>{gameschedule.DATE}</span>                                            
                                                    <span className='day'>({gameschedule.DAY})</span>
                                                    <span className='time'>{gameschedule.TIME}</span>
                                                </div>
                                                <div className='match'>
                                                    <img src={gameschedule.VERSUSIMG} alt={gameschedule.VERSUS} />
                                                    <span>VS</span>
                                                    <img src='./images/club_emblem_ssg.png' alt="ssg" />
                                                </div>
                                                <button className='btn_rsv'>티켓예매</button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
                )   
            }
            {
                activeMenu==='PLAYER' && (
                <div className="sub_inner">
                {
                    menuData[activeMenu].sections.map((section, idx)=>{
                    return(
                        <div key={idx} className='sub_list'>
                        <div className='sub_list_wrap'>
                            <h3 className="sub_list_title">
                            {section.title}
                            </h3>
                            <ul >
                            {section.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="submenu_text">
                                <a href="{()=>false}" className="">{item}</a>
                                </li>
                            ))}
                            </ul>
                        </div>
                        <div className='sub_content'>
                            <BestPlayer />
                        </div>
                    </div>
                    )
                })}
                </div>
                )   
            }
            {
                activeMenu==='SHOP' && (
                <div className="sub_inner">
                {
                    menuData[activeMenu].sections.map((section, idx)=>{
                    return(
                        <div key={idx} className='sub_list'>
                        <div className='sub_list_wrap'>
                            <h3 className="sub_list_title">
                            {section.title}
                            </h3>
                            <ul >
                            {section.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="submenu_text">
                                <a href="#!" className="">{item}</a>
                                </li>
                            ))}
                            </ul>
                        </div>
                        <div className='sub_content'>
                            <div className='best_items'>
                                {
                                    ProductData.slice(0, 3).map((item,idx)=>(
                                        <div key={idx} className='best_item'>
                                            <img src={item.img} alt={item.title} />
                                            <p className='title'>
                                                {
                                                    item.title.split("\n").map((text, i) => (
                                                    <span key={i}>{text}<br /></span>
                                                    ))
                                                }
                                            </p>
                                            <p className='price'>{item.price}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='goods'>
                                {
                                    Goods.slice(0, 4).map((item,idx)=>(
                                        <div key={idx} className='best_item'>
                                            <img src={item.img} alt={item.title} />
                                            <p className='title'>
                                                {
                                                    item.title.split("\n").map((text, i) => (
                                                    <span key={i}>{text}<br /></span>
                                                    ))
                                                }
                                            </p>
                                            <p className='price'>{item.price}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    )
                })}
                </div>
                )   
            }
            </div>
            )
        }
        {
            mobiletoggle && (
                <div className='mobile_menu'>
                <nav>
                    <ul className='mobile_list'>
                    {
                        Object.entries(menuData).map(([menuKey, menuValue], idx) => (
                        <li key={idx} >
                            {/* <a onClick={() => toggleMenu(menuKey)} href={`/${menuKey}`}  className='mobile_mainmenu'> */}
                            <a 
                            onClick={() => toggleMenu(menuKey)}
                            className='mobile_mainmenu'
                            >
                            {menuValue.sections[0].title}
                            {selectedId === menuKey  ? (<ChevronUp size={20} />) : (<ChevronDown size={20} />)}
                            </a>
                            {
                            selectedId === menuKey && (
                                <div>
                                {
                                    menuValue.sections.map((section, sectionIdx) => (
                                    <ul key={sectionIdx} >
                                        {
                                            section.items.map((item, itemIdx) => (
                                            <li key={itemIdx} className='mobile_submenu'>
                                                <a /* href="{()=>false}" */>
                                                    {item}
                                                </a>
                                            </li>
                                        ))
                                        }
                                    </ul>
                                    ))
                                }
                                </div>
                            )
                            }
                        </li>
                        ))
                    }
                    </ul>
                </nav>
            </div>
            )
        }
    </header>
    );
}

export default Header;