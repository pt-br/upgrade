import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { upgradeApi } from '@/apis/upgradeApi';
import { App } from './App';

const mockStore = configureStore({
  reducer: {
    [upgradeApi.reducerPath]: upgradeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(upgradeApi.middleware),
});

it('renders without crashing', () => {
  render(
    <Provider store={mockStore}>
      <App />
    </Provider>
  );
  expect(document.body).toBeInTheDocument();
});
