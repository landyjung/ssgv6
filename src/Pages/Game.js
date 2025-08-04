import Monthly from "../Components/Monthly";
import Comming from "../Components/Comming";

const nowRank = [
    {
        ranking:5,
        game:'132',
        win:'101',
        lose:'20',
        same:'4',
        rate:'0.568',
        slg :'0.364',
        obp:'0.378',
        lasted:'2승 0패'
    }
]

function Game(){
    return (
        <section id="game">
            <h2 className="main_title">Game Schedule</h2>
            <div className="now_ranking">
                {nowRank && nowRank.length > 0 && (
                    <div className="rank_box">
                        <div className="ranking">
                            {nowRank[0].ranking}
                        </div>
                        <div>
                            <span>게임수</span>
                            <span>{nowRank[0].game}</span>
                        </div>
                        <div>
                            <span>승</span><span>{nowRank[0].win}</span>
                        </div>
                        <div>
                            <span>패</span>
                            <span>{nowRank[0].lose}</span>
                        </div>
                        <div>
                            <span>무</span>
                            <span>{nowRank[0].same}</span>
                        </div>
                        <div>
                            <span>승률</span>
                            <span>{nowRank[0].rate}</span>
                        </div>
                        <div>
                            <span>장타율</span>
                            <span>{nowRank[0].slg}</span>
                        </div>
                        <div>
                            <span>출루율</span>
                            <span>{nowRank[0].obp}</span>
                        </div>
                        <div>
                            <span>연속</span>
                            <span> {nowRank[0].lasted}</span>
                        </div>
                    </div>
                )}
                
            </div>
            <Comming num="10" />
            <div className="resev_wrap">
                <Monthly />
            </div>
        </section>
    );
}

export default Game;
