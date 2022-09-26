import { Link, NavLink } from "react-router-dom"
import { ConnectKitButton } from "connectkit"

const verticalSpacerStyle = {
  width: "2px",
  background: "#ccc",
  opacity: "0.5",
  margin: "0 16px 0 10px"
}

export const Header = () => {
  return (
    <div>
      <header className="w-100 fixed-top  border-bottom border-3 shadow">
        <nav className="navbar navbar-dark navbar-expand bg-primary text-light py-0">
          <div className="container-fluid">
            <div>
              <Link to="/" className="navbar-brand d-flex align-items-center">
                <img
                  src="/images/icon.ico"
                  alt="Logo"
                  width="64"
                  height="64"
                  className="d-inline-block align-text-top"
                />
                <span style={{ fontFamily: "Pacifico" }} className="text-reset">
                  YOU-KNOW-WHO
                </span>
              </Link>
            </div>
            <div className="ml-auto">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="gacha" style={{ fontFamily: "Kosugi Maru" }} className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                    ガチャを回す
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="items" style={{ fontFamily: "Kosugi Maru" }} className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                    マイアイテム
                  </NavLink>
                </li>
                <div style={verticalSpacerStyle}></div>
                <li className="nav-item">
                  <ConnectKitButton label="ウォレットを接続" showBalance={true} />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div style={{ height: "80px" }}></div>
    </div>
  )
}
