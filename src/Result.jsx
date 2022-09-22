import Icon from "./images/ガキ大将.jpeg";
import { Rare } from "./result/rare";
import { Footer } from "./common/footer";
import classes from "./backgroundMovement_result.module.scss";

// 遷移先ページ
export const Result = () => {
    const textCenter = {
        textAlign: "center",
    };
  
    const textTop = {
      paddingTop: "100px",
      color: "white",
      fontFamily: "Kosugi Maru",
      fontSize: "5em"
    };
  
    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <form>
                    <h1 style={textTop}>結果発表</h1><br></br>
                    <h2 style={{ fontFamily: "Kosugi Maru", fontSize: "50px", textAlign: "center", marginTop: "-30px", color: "white" }}>You got it!</h2>
                    <div style={{ textAlign: "center", paddingTop: "30px" }}>
                        <Rare />
                    </div>
                    <figure style={textCenter}>
                        <img src={Icon} width="550"></img>
                    </figure>
                    <br></br>
                    <h3 style={{ color: "white" }}>母ちゃんの言うことは聞くガキ大将</h3>
                </form>
                <Footer />
            </div>
            <ul className={classes.bgBubbles}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
};