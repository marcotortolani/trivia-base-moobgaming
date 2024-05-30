import { useState, useEffect } from 'preact/hooks'
import { getDataConfig } from '../services/getDataConfig'

export function useDataConfig(endpoint) {
  const [dataConfig, setDataConfig] = useState(null)

  useEffect(() => {

    fetch(endpoint, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => setDataConfig(res))
      .catch((error) => console.error(error))
  }, [])

  return { dataConfig }
}
