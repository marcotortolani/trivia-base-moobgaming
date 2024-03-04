export async function getDataConfig(endpoint) {
  const res = await fetch(endpoint);
  const data = await res.json();

  return data;
}
