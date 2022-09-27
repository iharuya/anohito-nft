export const BsAlert = ({ type = "primary", children }) => {
  const className = `alert alert-${type} mb-0 text-start`
  return <div className={className}>{children}</div>
}
