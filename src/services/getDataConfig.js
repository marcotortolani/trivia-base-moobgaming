export async function getDataConfig(endpoint) {
  const res = await fetch(endpoint, {
    mode: 'cors',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();

  return data;
}
