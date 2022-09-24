import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Background } from "../components/Background"
import { Footer } from "../components/Footer"
import "../styles/App.scss"

import { WagmiConfig, createClient, configureChains, chain } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { ConnectKitProvider } from "connectkit"

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.goerli, chain.hardhat].reverse(),
  [alchemyProvider({ priority: 0 }), publicProvider({ priority: 1 })]
)

const client = createClient({
  autoConnect: false, // if true, nextjs dev server pops up error for hydration mismatch
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
