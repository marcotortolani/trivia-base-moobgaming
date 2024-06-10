export function Error({ message }) {
  const prefix = 'Error: '
  const errorMessage = message.startsWith(prefix)
    ? message.substring(prefix.length)
    : message

  return (
    <div className="error-trivia">
      <h1 className="error-title">Error</h1>
      <p className="error-message">{errorMessage}</p>
    </div>
  )
}
