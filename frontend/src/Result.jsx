import { useNavigate } from "react-router-dom"
import { Rare } from "./result/rare"

// 遷移先ページ
export const Result = () => {
  // 遷移用ボタンアクション
  const navigation = useNavigate()
  const onMovePage = () => {
    navigation("/Item")
  }

  const textCenter = {
    textAlign: "center",
  }

  const KosugiMaru = {
    fontFamily: "Kosugi Maru",
  }

  const Button = {
    backgroundColor: "white",
    color: "#53e3a6",
  }

  const textTop = {
    paddingTop: "20px",
    color: "white",
    fontFamily: "Kosugi Maru",
    fontSize: "5em",
  }

  return (
    <main style={{ minHeight: "100vh" }}>
      <div className="container text-light text-center pt-3">
        <h1 style={textTop}>結果発表</h1>
        <br></br>
        <h2
          style={{
            fontFamily: "Kosugi Maru",
            textAlign: "center",
            marginTop: "-30px",
            color: "white",
          }}
        >
          You got it!
        </h2>
        <div style={{ textAlign: "center", paddingTop: "30px" }}>
          <Rare />
        </div>
        <figure style={textCenter}>
          <img width="550"></img>
        </figure>
        <br></br>
        <h3 style={KosugiMaru}>母ちゃんの言うことは聞くガキ大将</h3>
        <p style={KosugiMaru}>映画で大活躍</p>
        <button style={Button}>確認</button>
      </div>
    </main>
  )
}
