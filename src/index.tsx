import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/app/app';
import { store } from './services/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/react-burger">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
