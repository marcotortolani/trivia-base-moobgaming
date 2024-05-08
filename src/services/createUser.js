//import { createUserEndPoint } from '../conf/configEndpoints'
//import { createUserEndPoint } from '../conf/configEndpoints'

export async function createUser({ username, msisdn, password }) {
  const createUserEndPoint =
    'https://run.mocky.io/v3/61e9ffc8-a1ac-446e-81ba-67573a893605'

  const formdata = new FormData()
  formdata.append('msisdn', msisdn)
  formdata.append('password', password)
  formdata.append('name', username)

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  }

  return fetch(createUserEndPoint, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result
    })
    .catch((error) => console.error(error))
}
