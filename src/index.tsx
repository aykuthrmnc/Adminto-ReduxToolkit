import ReactDOM from 'react-dom';

import './i18n';

import App from './App';
import { Provider } from 'react-redux';
import store from './redux';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
