import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Root } from "./routes/Root"
import { Index } from "./routes/Index"
import { Gacha } from "./routes/Gacha"
import { Items } from "./routes/Items"
import { Error } from "./routes/Error"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "gacha",
        element: <Gacha />,
      },
      {
        path: "items",
        element: <Items />,
      },
    ],
  },
])

export const App = () => {
  return <RouterProvider router={router} />
}
