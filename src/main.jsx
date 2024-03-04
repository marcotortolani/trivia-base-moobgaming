import { render } from 'preact';
import { HashRouter } from 'react-router-dom';
import { useDataConfig } from './helpers/useDataConfig';
import { configEndpoint } from "./conf/configEndpoint";
import { App } from './app';
import { ConfigProvider } from './ConfigProvider';
import { LoadingTrivia } from './components/LoadingTrivia';
import './index.css';

function Application() {
  const dataConfig = useDataConfig(configEndpoint);

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
