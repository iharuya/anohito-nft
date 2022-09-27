import "../styles/App.scss"
import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Background } from "../components/Background"
import { Footer } from "../components/Footer"

import { WagmiConfig, createClient, configureChains, chain } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { ConnectKitProvider, ConnectKitButton } from "connectkit"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

let appChains = [chain.goerli, chain.hardhat]
if (import.meta.env.DEV) {
  appChains = appChains.reverse()
}
const { chains, provider, webSocketProvider } = configureChains(appChains, [
  alchemyProvider({ priority: 0 }),
  publicProvider({ priority: 1 }),
])

const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
})

const mobileConnectWrapper = {
  position: "fixed",
  bottom: "24px",
  left: "50%",
  transform: "translate(-50%, 0)" 
}

export const Root = () => {
  return (
    <>
      <WagmiConfig client={client}>
        <ConnectKitProvider>
          <Header />
          <Background />
          <ToastContainer position="top-right" autoClose={false} draggable />
          <main style={{ minHeight: "100vh" }}>
            <div className="container text-light">
              <Outlet />
            </div>
          </main>
          <div className="d-md-none" style={mobileConnectWrapper}>
            <ConnectKitButton label="ウォレットを接続" customTheme={{
              "--ck-connectbutton-box-shadow": "0 4px 12px 1px #72ba73"
            }} />
          </div>
          <Footer />
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  )
}
