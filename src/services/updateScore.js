import { updateScoreEndpoint } from '../conf/configEndpoints'

export async function updateScore({ userHash, gameHash, scoreTotal }) {
  const userHash = 'c0760cab7aec4a8359010b0da4b9237bacccdf19'
  const gameHash = 'da4b9237bacccdf19c0760cab7aec4a8359010b0'
  const scoreTotal = 50

  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
  }

  fetch(
    `${updateScoreEndpoint}?userhash=${userHash}&gamehash=${gameHash}&score=${scoreTotal}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
}
