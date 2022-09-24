import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Root } from "./routes/Root"
import { Index } from "./routes/Index"
import { Gacha } from "./routes/Gacha"
import { MyItems } from "./routes/MyItems"
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
        path: "myitems",
        element: <MyItems />,
      },
    ],
  },
])

export const App = () => {
  return <RouterProvider router={router} />
}
