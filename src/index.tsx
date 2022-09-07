import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './components/GlobalStyle/GlobalStyle';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <GlobalStyle>
                <App />
            </GlobalStyle>
        </PersistGate>
    </Provider>
);
