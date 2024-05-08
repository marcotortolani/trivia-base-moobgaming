export async function getDataConfig(endpoint) {
  let data, res
  try {
    res = await fetch(endpoint, {
      mode: 'cors',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.log('Fetch Error')
    console.log(err)
    data = null
  } finally {
    data = await res.json()
  }

  console.log(data)
  return data
}
