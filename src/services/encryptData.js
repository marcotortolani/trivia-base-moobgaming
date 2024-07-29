import rc4Min from 'rc4.js'

const test = new rc4Min('MoobgamingAJM')

export function encryptData({ gameHash, userHash, partialScore }) {
  const dataEncrypted = test.encrypt(gameHash + userHash + partialScore)
  const transactionID = test.encrypt(
    Math.floor(10000 + Math.random() * 90000).toString()
  )
  const validationNumber = sumCharacters(dataEncrypted + transactionID)

  return `${dataEncrypted}-${transactionID}-${validationNumber}`
}

function sumCharacters(str) {
  return str.split('').reduce((suma, char) => suma + parseInt(char, 16) || 0, 0)
}
