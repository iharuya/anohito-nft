export const BsAlert = ({ type = "primary", children }) => {
  const className = `alert alert-${type} mb-0`
  return <div className={className}>{children}</div>
}
