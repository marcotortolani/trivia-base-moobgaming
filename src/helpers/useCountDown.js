// import { useState, useEffect } from 'preact/hooks'

// export default function useCountdown(countInitial = 0) {
//   const [secondsLeft, setSecondsLeft] = useState(countInitial)

//   useEffect(() => {
//     if (secondsLeft <= 0) return

//     const timeout = setTimeout(() => {
//       setSecondsLeft((prev) => prev - 1)
//     }, 1000)
//     return () => clearTimeout(timeout)
//   }, [secondsLeft])

//   function startCountdown(seconds) {
//     setSecondsLeft(seconds)
//   }

//   return { secondsLeft, startCountdown }
// }

import { useState, useEffect } from 'preact/hooks'

export default function useCountdown(countInitial = 0) {
  const [secondsLeft, setSecondsLeft] = useState(countInitial)
  const [isActive, setIsActive] = useState(countInitial > 0)

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) return

    const timeout = setTimeout(() => {
      if (secondsLeft > 0) {
        setSecondsLeft((prev) => prev - 1)
      } else {
        setIsActive(false)
      }
    }, 1000)
    return () => clearTimeout(timeout)
  }, [secondsLeft, isActive])

  function startCountdown(seconds) {
    if (seconds > 0) {
      setSecondsLeft(seconds)
      setIsActive(true)
      return
    }
    setIsActive(false)
  }

  return { secondsLeft, startCountdown }
}
