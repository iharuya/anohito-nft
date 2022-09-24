import { useRouteError } from "react-router-dom"

export const Error = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>エラー</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
