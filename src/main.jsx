import { render } from "preact";
import { HashRouter } from "react-router-dom";
import { App } from "./app";
import "./index.css";
import { ConfigProvider } from "./ConfigProvider";

const application = (
  <HashRouter>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </HashRouter>
);

render(application, document.getElementById("app"));
