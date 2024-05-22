export async function getDataConfig(endpoint) {
  let data, res

  const endpoint2 = 'https://jsonplaceholder.typicode.com/todos/1'

  try {
    res = await fetch(endpoint, {
      mode: 'cors',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    data = await res.json()
    console.log(data)
  } catch (err) {
    console.log('Fetch Error')
    console.log(err)
    data = null
  } finally {
    console.log(res)
    data = await res.json()
  }

  console.log(data)
  return data
}
