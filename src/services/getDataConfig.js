export async function getDataConfig(endpoint) {
  const res = await fetch(endpoint);
  const data = await res.json();
  console.log(data);
  return data;
}
