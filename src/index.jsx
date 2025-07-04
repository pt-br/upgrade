import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import { store } from '@/store/store';

import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#4b9d2d',
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
