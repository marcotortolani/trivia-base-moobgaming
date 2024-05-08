import { updateScoreEndpoint } from '../conf/configEndpoints'

export async function updateScore({ userID, gameID, scoreTotal }) {
  const userID = 'c0760cab7aec4a8359010b0da4b9237bacccdf19'
  const gameID = 'da4b9237bacccdf19c0760cab7aec4a8359010b0'
  const scoreTotal = 50

  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
  }

  fetch(
    `${updateScoreEndpoint}?user=${userID}&game=${gameID}&score=${scoreTotal}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
}
