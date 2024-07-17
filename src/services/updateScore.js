import { updateScoreEndpoint } from '../conf/configEndpoints'

const urlParams = new URLSearchParams(window.location.search)

export async function updateScore({ scoreTotal }) {
  const gameHash = urlParams.get('gamehash')
  const userHash = urlParams.get('userhash')

  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
  }

  fetch(
    `${updateScoreEndpoint}?user=${userHash}&game=${gameHash}&score=${scoreTotal}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
}
