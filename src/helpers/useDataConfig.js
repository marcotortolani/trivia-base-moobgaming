import { useState, useEffect } from 'preact/hooks'

export function useDataConfig(endpoint) {
  const [dataConfig, setDataConfig] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getDataConfig(endpoint)
  }, [])

  const getDataConfig = async (endpoint) => {
    try {
      const res = await fetch(endpoint, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log(res)

      if (!res.ok) {
        const errorData = await res.json()
        return setError(errorData.error)
      }

      const data = await res.json()
      setDataConfig(data)
      setError(null)
    } catch (err) {
      console.log(err)
      console.error(err)
      setError(err)
      setDataConfig(null)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, dataConfig }
}
