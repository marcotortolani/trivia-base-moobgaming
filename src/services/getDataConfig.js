export async function getDataConfig(endpoint) {
  let data, res
  console.log(endpoint)
  try {
    res = await fetch(endpoint, {
      mode: 'cors',
      redirect: 'follow',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.log('Fetch Error')
    console.log(err)
    data = null
  } finally {
    console.log(res)
    data = await res.json()
    console.log(data)
  }

  console.log(data)
  return data
}
