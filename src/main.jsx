import { render } from 'preact';
import { HashRouter } from 'react-router-dom';
import { useDataConfig } from './helpers/useDataConfig';
import { configEndpoint } from './conf/configEndpoint';
import { App } from './app';
import { ConfigProvider } from './ConfigProvider';
import { LoadingTrivia } from './components/LoadingTrivia';
import './index.css';

const hash01 = 'c4ca4238a0b923820dcc509a6f75849b';
const hash02 = 'c81e728d9d4c2f636f067f89cc14862c';

const urlParams = new URLSearchParams(window.location.search);
const hash = urlParams.get('hash');

function Application() {
  console.log('hash: ', hash);
  //const dataConfig = useDataConfig(configEndpoint);
  const dataConfig = useDataConfig(configEndpoint + `${hash}`);

  return (
    <HashRouter>
      {dataConfig !== null ? (
        <ConfigProvider dataConfig={dataConfig}>
          <App />
        </ConfigProvider>
      ) : (
        <LoadingTrivia />
      )}
    </HashRouter>
  );
}

render(<Application />, document.getElementById('app'));
