export function Loading({ message }) {
  return (
    <div className="loading-trivia">
      <div className="loader"></div>
      <p style={{ marginTop: 50 }}>{message}</p>
    </div>
  )
}
