import { render } from 'preact'
import { HashRouter } from 'react-router-dom'
import { useDataConfig } from './helpers/useDataConfig'
import useLocalStorage from './helpers/useLocalStorage'
import { configTrivia } from './conf/configEndpoints'
import { App } from './app'
import { ConfigProvider } from './ConfigProvider'
import { Loading } from './components/Loading'
import './sass/app.css'

//import dataConfig from './conf/config.json'

const gameHash = '356a192b7913b04c54574d18c28d46e6395428ab'
const userHash = '7055eced15538bfb7c0754574d18f8a5b28fc5d0'

const urlParams = new URLSearchParams(window.location.search)

const userConfigInitial = {
  id: 0,
  username: '',
  msisdn: '',
  password: '',
}

function Application() {
  const [userConfig, setUserConfig] = useLocalStorage(
    'userConfig',
    userConfigInitial
  )
  const gameHash = urlParams.get('gamehash')
  const userHash = urlParams.get('userhash')

  console.log('gamehash: ', gameHash)
  console.log('userhash: ', userHash)
  const { dataConfig } = useDataConfig(
    configTrivia + `${gameHash}` + `/${userHash}`
  )

  console.log('Data Config: ', dataConfig)

  // dataConfig.userData.userId : 0 -> User Non Registered
  // dataConfig.userData.userId : 1 -> User Registered without hash ID
  // dataConfig.userData.userId : true && userConfig.id !== 1 -> User Registered with hash ID
  // if (!userConfig.id) return <UserRegister setUserConfig={setUserConfig} />

  if (dataConfig === null)
    return <Loading message="No hay datos. El Juego o Usuario no existe" />

  if (dataConfig)
    return (
      <HashRouter>
        <ConfigProvider dataConfig={dataConfig}>
          <App />
        </ConfigProvider>
      </HashRouter>
    )

  return <Loading />
}

render(<Application />, document.getElementById('app'))
