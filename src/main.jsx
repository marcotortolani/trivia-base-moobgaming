import { render } from 'preact'
import { HashRouter } from 'react-router-dom'
import { useDataConfig } from './helpers/useDataConfig'
import { configTrivia } from './conf/configEndpoints'
import { App } from './app'
import { ConfigProvider } from './ConfigProvider'
import { Loading } from './components/Loading'
import { Error } from './components/Error'
import './sass/app.css'

// import dataConfig from './conf/config.json'
// const isLoading = false,
//   error = false,
//   gameHash = 1,
//   userHash = 1

const urlParams = new URLSearchParams(window.location.search)

function Application() {
  const gameHash = urlParams.get('gamehash')
  const userHash = urlParams.get('userhash')

  // GET CONFIG FROM ENDPOINT
  const { isLoading, error, dataConfig } = useDataConfig(
    configTrivia + `${gameHash}` + `/${userHash}`
  )

  if (isLoading) return <Loading />

  if (userHash === null || userHash === 'null')
    return <Error message="User no valid" />

  if (dataConfig === null || error)
    return (
      <Error
        message={error ? error : 'Error: No data. Game or user no valid'}
      />
    )

  if (!isLoading && dataConfig) {
    // insert lang on HTML document
    document.documentElement.lang = dataConfig.lang
    // -----------------------------------
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
