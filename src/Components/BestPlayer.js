import { subPlayer } from "../BestPlayerData";

function BestPlayer(){
    return(
        <div className="sub_content">
        {
            subPlayer.map((player, idx)=>(
                <div key={idx} className='subContent_play'>
                    <p className='type'>{player.type}</p>
                    <div className='info1'>
                        <span className='no'>{player.no}</span>
                        <span className='name'>{player.name}</span>
                    </div>
                    <div className='info2'>
                        <span className='text1'>{player.record1}</span>
                        <span className='title1'>{player.re_text1}</span>
                        <span className='text1'>{player.record2}</span>
                        <span className='title1'>{player.re_text2}</span>                                            
                    </div>
                    <div className='info2'>
                        <span className='text1'>{player.record3}</span>
                        <span className='title1'>{player.re_text3}</span>
                        <span className='text1'>{player.record4}</span>
                        <span className='title1'>{player.re_text4}</span>                                            
                    </div>
                    <div className='info2'>
                        <span className='title2'>{player.re_text5}</span>
                        <span className='text1'>{player.record5}</span>
                    </div>
                    <div className='info2'>
                        <span className='title2'>{player.re_text6}</span>
                        <span className='text1'>{player.record6}</span>
                    </div>
                    <div className='info2'>
                        <span className='title2'>{player.re_text7}</span>
                        <span className='text1'>{player.record7}</span>
                    </div>
                    <img src={player.img} className='img' alt={player.title} />
                </div>
            ))
        }
    </div>
    )
}
export default BestPlayer;