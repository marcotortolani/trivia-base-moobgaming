export async function getDataConfig(endpoint) {
  const res = await fetch(endpoint, { referrerPolicy: 'unsafe_url' });
  const data = await res.json();

  return data;
}
