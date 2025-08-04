import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from "lucide-react";

const footerMenu = ['NEWS', 'TEAM', 'TICKET', 'GAME', 'PLAYER','SHOP']
const privateMenu = ['개인정보 처리방침', '프라이버시 센터','이용약관', '윤리경영 사이버 감사실', '전자공고','사이트맵']


function Footer() {
    const [relatedOpen, setRelatedOpen] =useState(false);
    const navigate = useNavigate();

  return (
    <section id='footer'>
        <div className="inner">
            <div className="footer_top">
                <h2 className="footer_logo" onClick={() => navigate("/")} ><img src={`${process.env.PUBLIC_URL}/images/main_ogo_w_s.svg`} alt="logo" /></h2>
                <div className="menu_wrap">
                    <div className="footer_menu">
                        <ul>
                            {
                                footerMenu.map((fmenu, idx)=>(
                                <li key={idx}>
                                    <a href={`/${fmenu}`} >{fmenu}</a>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                    <div className="sns_wrap">
                        <ul className="md:flex gap-4 hidden">
                            <li><img src={`${process.env.PUBLIC_URL}/images/ic_facebook.svg`} alt="facebook" /></li>
                            <li><img src={`${process.env.PUBLIC_URL}/images/ic_youtube.svg`} alt="youtube" /></li>
                            <li><img src={`${process.env.PUBLIC_URL}/images/ic_instagram.svg`} alt="instagram" /></li>
                        </ul>
                    </div>
                    <div className="family_wrap">
                        <button onClick={()=> setRelatedOpen(!relatedOpen)} 
                            className="family_btn">
                            FamilySite {relatedOpen ? (<ChevronDown size={16} />) : (<ChevronUp size={16} />)}
                        </button>

                        { 
                            relatedOpen && (
                                <div>
                                    <div className="family_open">
                                        <ul className="text-left leading-10"> 
                                            <li>신세계 그룹</li>
                                            <li>이마트</li>
                                            <li>형지샵</li>
                                            <li>이마트샵</li>
                                            <li>인재 채용</li>
                                        </ul>
                                    </div>
                                </div>                         
                        )}
                        
                    </div>
                </div>
                <div className="contact_wrap">
                    <div className="tel">
                        <div className="tel1"><p>티켓문의</p> <strong>1588-7890</strong></div>
                        <div className="tel2"><p>기타문의</p> <strong>1588-6970</strong></div>
                    </div>
                    <div className="custom">
                        <span className="redline"></span>
                        <div className="custom_wrap">
                            <span className="side_l"></span>
                            <div className="custom_info">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>시즌 운영시간</td>
                                        <td>홈경기일 : 10:00 ~ 19:00</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>원정경기일 : 10:00 ~ 17:00(월, 경기 없는 주말 휴무)</td>
                                    </tr>
                                    <tr>
                                        <td>비시즌 운영시간</td>
                                        <td>10:00~17:00 <span></span>(주말 및 공휴일 휴무)</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <span className="side_r"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_bottom">
                <p className="company_name">&copy; <span>SSG LANDERS </span> Corp. All rights reserved</p>
                <div className="privacy_wrap">
                    <ul className="">
                        {
                            privateMenu.map((pmenu)=>(
                                <li key={pmenu}>{pmenu}</li>
                            ))
                        }
                    </ul>
                </div>
                <p className="address">주소 인천광역시 미추홀구  매소홀로 618(문학동)</p>
            </div>
        </div>
    </section>
  )
}  
export default Footer;