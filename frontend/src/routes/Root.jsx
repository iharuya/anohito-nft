import "../styles/App.scss"
import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Background } from "../components/Background"
import { Footer } from "../components/Footer"

import { WagmiConfig, createClient, configureChains, chain } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { ConnectKitProvider } from "connectkit"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.goerli, chain.hardhat].reverse(),
  [alchemyProvider({ priority: 0 }), publicProvider({ priority: 1 })]
)

const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
})

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
          <Footer />
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  )
}
