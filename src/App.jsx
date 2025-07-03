import React from 'react';
import { upgradeApi } from '@/apis/upgradeApi';

const App = () => {
  const { useGetColorsQuery } = upgradeApi;

  const { data, isFetching: isFetchingColors } = useGetColorsQuery();

  console.log('### data', data);
  console.log('### isFetchingColors', isFetchingColors);

  return (
    <div>
      <header>
        <h1>Welcome to Upgrade challenge</h1>
      </header>
      <p>
        To get started, edit <code>src/App.jsx</code> and save to reload.
      </p>
    </div>
  );
};

export default App;
