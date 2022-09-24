import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Background } from "../components/Background"
import { Footer } from "../components/Footer"
import "../styles/App.scss"

export const Root = () => {
  return (
    <>
      <Header />
      <Background />
      <main style={{ minHeight: "100vh" }}>
        <div className="container text-light">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}
