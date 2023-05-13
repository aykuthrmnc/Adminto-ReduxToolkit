import { createRoot } from 'react-dom/client';

import './i18n';

import App from './App';
import { Provider } from 'react-redux';
import store from './redux';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
