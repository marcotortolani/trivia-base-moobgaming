export async function getDataConfig(endpoint) {
  let data, res

  const endpoint2 = 'https://jsonplaceholder.typicode.com/todos/1'
  const endpoint3 = 'https://torto.free.beeceptor.com/getTrivia'
  const endpoint4 =
    'https://api.mockfly.dev/mocks/f7f91f94-0a4a-4098-9a8a-92a2625285c9/getTrivia'

  // const requestOptions = {
  //   method: 'GET',
  //   redirect: 'follow',
  // }

  // fetch(
  //   'https://test.api.gaming.moob.club/api/v1/getTrivia/356a192b7913b04c54574d18c28d46e6395428ab/7055eced15538bfb7c0754574d18f8a5b28fc5d0',
  //   requestOptions
  // )
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.error(error))

  res = fetch(endpoint, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))

  data = await res
  console.log(data)
  // try {
  //   res = await fetch(endpoint, {
  //     // mode: 'no-cors',
  //     method: 'GET',
  //     redirect: 'follow',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // 'Access-Control-Allow-Origin': '*',
  //     },
  //   })
  //   console.log(res)
  // } catch (err) {
  //   console.log('Fetch Error')
  //   console.log(err)
  //   data = null
  // } finally {
  //   console.log(res)
  //   if (res.ok && res.type !== 'opaque') {
  //     return (data = await res.json())
  //   }
  //   data = false
  // }

  console.log(data)
  return data
}
