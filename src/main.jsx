import { render } from 'preact'
import { HashRouter } from 'react-router-dom'
import { useDataConfig } from './helpers/useDataConfig'
import { configTrivia } from './conf/configEndpoints'
import { App } from './app'
import { ConfigProvider } from './ConfigProvider'
import { Loading } from './components/Loading'
import { Error } from './components/Error'
import './sass/app.css'

import dataConfig from './conf/config.json'
const isLoading = false,
  error = false,
  gameHash = 1,
  userHash = 1

// const gameHash = '356a192b7913b04c54574d18c28d46e6395428ab'
// const userHash = '7055eced15538bfb7c0754574d18f8a5b28fc5d0'

const urlParams = new URLSearchParams(window.location.search)

// const userConfigInitial = {
//   id: 0,
//   username: '',
//   msisdn: '',
//   password: '',
// }

function Application() {
  // const [userConfig, setUserConfig] = useLocalStorage(
  //   'userConfig',
  //   userConfigInitial
  // )

  // const gameHash = urlParams.get('gamehash')
  // const userHash = urlParams.get('userhash')

  // GET CONFIG FROM ENDPOINT
  // const { isLoading, error, dataConfig } = useDataConfig(
  //   configTrivia + `${gameHash}` + `/${userHash}`
  // )

  // dataConfig.userData.userId : 0 -> User Non Registered
  // dataConfig.userData.userId : 1 -> User Registered without hash ID
  // dataConfig.userData.userId : true && userConfig.id !== 1 -> User Registered with hash ID
  // if (!userConfig.id) return <UserRegister setUserConfig={setUserConfig} />

  if (isLoading) return <Loading />

  if (userHash === null || userHash === 'null')
    return <Error message="Usuario no válido" />

  if (dataConfig === null || error)
    return (
      <Error
        message={
          error ? error : 'Error: No hay datos. El Juego o Usuario no existe'
        }
      />
    )

  if (!isLoading && dataConfig) {
    return (
      <HashRouter>
        <ConfigProvider
          dataConfig={dataConfig}
          hash={`${gameHash}-${userHash}`}
        >
          <App />
        </ConfigProvider>
      </HashRouter>
    )
  }
}

render(<Application />, document.getElementById('app'))
