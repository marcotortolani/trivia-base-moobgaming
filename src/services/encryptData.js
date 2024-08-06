import rc4Min from 'rc4.js'

const rc4 = new rc4Min('MoobgamingAJM')

export function encryptData({ gameHash, userHash, partialScore }) {
  const dataEncrypted = rc4.encrypt(`${gameHash}-${userHash}-${partialScore}`)
  const transactionID = rc4.encrypt(
    Math.floor(10000 + Math.random() * 90000).toString()
  )
  const validationNumber = sumCharacters(dataEncrypted + transactionID)

  return `${dataEncrypted}-${transactionID}-${validationNumber}`
}

function sumCharacters(str) {
  return str.split('').reduce((suma, char) => suma + parseInt(char, 16) || 0, 0)
}
