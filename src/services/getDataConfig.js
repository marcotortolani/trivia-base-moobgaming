export async function getDataConfig(endpoint) {
  console.log(endpoint);
  const res = await fetch(endpoint, {
    mode: 'no-cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(res);
  const data = await res.json();

  return data;
}
