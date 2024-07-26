import { updateScoreEndpoint } from '../conf/configEndpoints'

const urlParams = new URLSearchParams(window.location.search)

export async function updateScore({ partialScore }) {
  const gameHash = urlParams.get('gamehash')
  const userHash = urlParams.get('userhash')

  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
  }

  fetch(
    `${updateScoreEndpoint}?user=${userHash}&game=${gameHash}&score=${partialScore}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
}
