import { Link, NavLink } from "react-router-dom"
import { ConnectKitButton } from "connectkit"
const etherscanUrl = import.meta.env.VITE_ETHERSCAN_URL
const openseaUrl = import.meta.env.VITE_OPENSEA_URL

const verticalSpacerStyle = {
  width: "2px",
  background: "#ccc",
  opacity: "0.5",
  margin: "0 16px 0 10px",
}

export const Header = () => {
  return (
    <div>
      <header className="w-100 fixed-top border-bottom border-3 shadow">
        <nav className="navbar navbar-dark navbar-expand bg-primary text-light py-0">
          <div className="container-fluid">
            <div>
              <Link to="/" className="navbar-brand d-flex align-items-center">
                <img src="/images/icon.png" alt="Logo" width="48" height="48" className="d-inline-block" />
                <span style={{ fontFamily: "Pacifico" }} className="text-reset d-none d-md-inline">
                  YOU-KNOW-WHO
                </span>
              </Link>
            </div>
            <div className="ml-auto">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    to="gacha"
                    style={{ fontFamily: "Kosugi Maru" }}
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                  >
                    ガチャを回す
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="items"
                    style={{ fontFamily: "Kosugi Maru" }}
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                  >
                    マイアイテム
                  </NavLink>
                </li>
                <div style={verticalSpacerStyle} className="d-none d-md-block"></div>
                <li className="nav-item d-none d-md-block">
                  <ConnectKitButton label="ウォレットを接続" showBalance={true} />
                </li>
                <li className="nav-item d-flex align-items-center ps-3">
                  <a href={etherscanUrl} target="_blank">
                    <img src="/images/etherscan-logo.webp" width={32} height={32} />
                  </a>
                </li>
                <li className="nav-item d-flex align-items-center ps-3">
                  <a href={openseaUrl} target="_blank">
                    <img src="/images/opensea-logo.png" width={32} height={32} />
                  </a>
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
