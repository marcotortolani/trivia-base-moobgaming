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

const hash01 = 'c4ca4238a0b923820dcc509a6f75849b'
const hash02 = 'c81e728d9d4c2f636f067f89cc14862c'

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

  console.log('hash: ', gameHash)
  const { dataConfig } = useDataConfig(
    configTrivia + `${gameHash}` + `/${userHash}`
  )

  console.log('Data Config: ', dataConfig)

  // userConfig.id : 0 -> User Non Registered
  // userConfig.id : 1 -> User Registered without hash ID
  // userConfig.id : true && userConfig.id !== 1 -> User Registered with hash ID
  // if (!userConfig.id) return <UserRegister setUserConfig={setUserConfig} />

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
