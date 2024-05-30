export async function getDataConfig(endpoint) {
  let data, res

  const endpoint2 = 'https://jsonplaceholder.typicode.com/todos/1'
  const endpoint3 = 'https://torto.free.beeceptor.com/getTrivia'
  const endpoint4 =
    'https://api.mockfly.dev/mocks/f7f91f94-0a4a-4098-9a8a-92a2625285c9/getTrivia'

  try {
    res = await fetch(endpoint, {
      mode: 'no-cors',
      method: 'GET',
      // redirect: 'follow',
      headers: {
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    console.log(res)
  } catch (err) {
    console.log('Fetch Error')
    console.log(err)
    data = null
  } finally {
    console.log(res)
    if (res.ok && res.type !== 'opaque') data = await res.json()
    data = false
  }

  console.log(data)
  return data
}
