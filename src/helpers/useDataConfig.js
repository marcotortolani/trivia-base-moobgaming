import { useState, useEffect } from 'preact/hooks';
import { getDataConfig } from '../services/getDataConfig';

export function useDataConfig(endpoint) {
  const [dataConfig, setDataConfig] = useState(null);

  useEffect(() => {
    getDataConfig(endpoint).then((res) => setDataConfig(res));
  }, []);

  return dataConfig;
}
