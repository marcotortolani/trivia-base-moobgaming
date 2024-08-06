import { updateScoreEndpoint } from '../conf/configEndpoints'
import { encryptData } from './encryptData'

const urlParams = new URLSearchParams(window.location.search)

export async function updateScore({ partialScore }) {
  const gameHash = urlParams.get('gamehash')
  const userHash = urlParams.get('userhash')

  // const requestOptions = {
  //   method: 'POST',
  //   redirect: 'follow',
  // }
  // fetch(
  //   `${updateScoreEndpoint}?user=${userHash}&game=${gameHash}&score=${partialScore}`,
  //   requestOptions
  // )
  //   .then((response) => response.json())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.error(error))

  const dataEncrypted = encryptData({ gameHash, userHash, partialScore })

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.9,es-419;q=0.8,es;q=0.7,pt;q=0.6',
      Connection: 'keep-alive',
      
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
    },
    // body: new URLSearchParams({
    //   key: dataEncrypted,
    // }).toString(),
  }

  fetch(updateScoreEndpoint + dataEncrypted, requestOptions)
    .then((response) => console.log('Status: ', response.statusText))
    .catch((error) => console.error(error))
}
