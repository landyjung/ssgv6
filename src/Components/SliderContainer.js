import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay  } from 'swiper/modules';
import gsap from "gsap";
import { useRef} from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import slideImg1 from '../assets/images/main_bg1.jpg';
import slideImg2 from '../assets/images/main_bg2.jpg';
import slideImg3 from '../assets/images/main_bg3.jpg';
import slideImg4 from '../assets/images/main_bg4.jpg';
import slideImg5 from '../assets/images/main_bg5.jpg';

const slideImages = [
{
    id:0,
    src:slideImg1,
    date:'2005-07-01',
    title:'SSG랜더스, 시즌 열 다섯 번째\n 매진 기록 달성',
    description:'SSG랜더스(대표이사 김재섭, 이하 SSG)가 29일(일) 인천SSG랜더스필드에서 열린 한화이글스와 홈경기에서 시즌 열 다섯 번째 매진을 달성했다.이날 SSG는 14시 10분 기준 인천SSG랜더스필드의 좌석을 모두 판매했다. 이로써 SSG는 홈 5경기 연속 매진을 기록, 구단 홈경기 최다 연속 매진 기록 경신을 이어가게 됐다.',
    btn1:'렌터카 견적 내기',
    btn2:'바로가기',
},
{
    id:1,
    src:slideImg2,
    date:'2025-06-28',
    title:'SSG랜더스, 27일(금) 한화전에 \n‘누즈 브랜드 데이’ 진행',
    description:'SSG랜더스(대표이사 김재섭, 이하 SSG)가 29일(일) 인천SSG랜더스필드에서 열린 한화이글스와 홈경기에서 시즌 열 다섯 번째 매진을 달성했다.이날 SSG는 14시 10분 기준 인천SSG랜더스필드의 좌석을 모두 판매했다. 이로써 SSG는 홈 5경기 연속 매진을 기록, 구단 홈경기 최다 연속 매진 기록 경신을 이어가게 됐다.',
    btn1:'자세히보기',
    btn2:'견적내기',
},
{
    id:2,
    src:slideImg3,
    date:'2025-06-27',
    title:'SSG랜더스, 28일(토) 김강민 \n KBO 전력강화위원 은퇴식 개최',
    description:'SSG랜더스(대표이사 김재섭, 이하 SSG)가 29일(일) 인천SSG랜더스필드에서 열린 한화이글스와 홈경기에서 시즌 열 다섯 번째 매진을 달성했다.이날 SSG는 14시 10분 기준 인천SSG랜더스필드의 좌석을 모두 판매했다. 이로써 SSG는 홈 5경기 연속 매진을 기록, 구단 홈경기 최다 연속 매진 기록 경신을 이어가게 됐다.',
    btn1:'자세히보기',
    btn2:'견적내기',
},
{
    id:3,
    src:slideImg4,
    date:'2025-07-15',
    title:'SSG랜더스, 구단 단일 시즌 \n 최다 매진 기록 달성',
    description:'SSG랜더스(대표이사 김재섭, 이하 SSG)가 29일(일) 인천SSG랜더스필드에서 열린 한화이글스와 홈경기에서 시즌 열 다섯 번째 매진을 달성했다.이날 SSG는 14시 10분 기준 인천SSG랜더스필드의 좌석을 모두 판매했다. 이로써 SSG는 홈 5경기 연속 매진을 기록, 구단 홈경기 최다 연속 매진 기록 경신을 이어가게 됐다.',
    btn1:'자세히보기',
    btn2:'견적내기',
},
{
    id:4,
    src:slideImg5,
    date:'2025-06-22',
    title:'SSG랜더스 투수 김광현과 \n 다년 계약 체결',
    description:'SSG랜더스(대표이사 김재섭, 이하 SSG)가 29일(일) 인천SSG랜더스필드에서 열린 한화이글스와 홈경기에서 시즌 열 다섯 번째 매진을 달성했다.이날 SSG는 14시 10분 기준 인천SSG랜더스필드의 좌석을 모두 판매했다. 이로써 SSG는 홈 5경기 연속 매진을 기록, 구단 홈경기 최다 연속 매진 기록 경신을 이어가게 됐다.',
    btn1:'자세히보기',
    btn2:'견적내기',
}
]

function SliderContainer(){

    const swiperRef = useRef(null);

    const slideChange = (activeIndex) => {
    if( !swiperRef.current || !swiperRef.current.slides ) return;
    if( activeIndex<0 ) return;
    const activeSlide = swiperRef.current?.slides[activeIndex];
    if(!activeSlide) return;
    
    const textElement1 = activeSlide.querySelector('.ani_text1');
    const textElement2 = activeSlide.querySelector('.ani_text2');
    const textElement3 = activeSlide.querySelector('.ani_text3');

    if (textElement1) {
        gsap.fromTo(
            textElement1,
            { x: '30%', opacity: 0 },
            { x: '0%', opacity: 1, delay: 0, duration: 1, ease: 'power2.out' }
        );
    }
    if (textElement2) {
        gsap.fromTo(
            textElement2,
            { x: '30%', opacity: 0 },
            { x: '0%', opacity: 1, delay: 0.4, duration: 1.2, ease: 'power2.out' }
        );
    }
    if (textElement3) {
        gsap.fromTo(
            textElement3,
            { x: '30%', opacity: 0 },
            { x: '0%', opacity: 1, delay: 0.7, duration: 1.4, ease: 'power2.out' }
        );
    }

};


    return(
    <section id="slide_container">
        <Swiper init="false" 
        pagination={{ clickable: true }}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev',}}
        className="mySwiper h-auto"
        modules = {[Navigation, Pagination, Autoplay ]}
        loop = {true}
        slidesPerView = {1}
        autoPlay = {{ delay:7000, disableOnInteraction:false }}
        onSlideChange={(swiper)=> slideChange(swiper.activeIndex)} 
        onSwiper={(swiper)=>{
            swiperRef.current = swiper;
            setTimeout(()=>{
            if( swiper.slides && swiper.slides.length>0 ){
                slideChange(0);
            }
            }, 100)}}
        >
        {
            slideImages.map(({ src, title, subtitle, btn1, btn2,date, description }, idx) => (
            <SwiperSlide key={idx} className='h-100vh'>
                <div className="slide_wrap">
                    <img key={idx} src={src} className="slide_img" alt={title} />
                    <div className="text_wrap">
                        <p className="ani_text1 date">{date}</p>
                        <h2  className="ani_text2 title">
                            {/* {title} */}
                            {typeof title === 'string' ? (
                                title.split("\n").map((line, i) => (
                                    <span key={i}>{line}<br /></span>
                                ))
                            ) : (
                                <span>{title}</span>
                            )}
                        </h2> 
                        <p className='ani_text3 description'>{description}</p>                         
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-35 pointer-events-none"></div>
                </div>              
            </SwiperSlide>
            ))
        }
            <button className="swiper-button-prev absolute top-1/2 left-4 z-20 -translate-y-1/2 text-white opacity-70 hover:opacity-100 transition-opacity" aria-label="previous slide"></button>
            <button className="swiper-button-next absolute top-1/2 right-4 z-20 -translate-y-1/2 text-white opacity-70 hover:opacity-100 transition-opacity" aria-label="next slide"></button>
        </Swiper>
        
        
    </section>
    )
}
export default SliderContainer;