import React, { useEffect } from 'react';
import { upgradeApi } from '@/apis/upgradeApi';

export const Signup = () => {
  const { useGetColorsQuery, useSubmitFormMutation } = upgradeApi;

  const { data, isFetching: isFetchingColors } = useGetColorsQuery();
  const [submitForm, { isLoading, error, isSuccess }] = useSubmitFormMutation();

  // useEffect(() => {
  //   submitForm({
  //     name: 'test',
  //     email: 'test@test.com',
  //     password: 'pwd',
  //     color: 'red',
  //     terms: true,
  //   });
  // }, []);

  console.log('### data', data);
  console.log('### isFetchingColors', isFetchingColors);

  return (
    <div>
      <header>
        <h1>SIGNUP</h1>
      </header>
      <p>
        To get started, edit <code>src/App.jsx</code> and save to reload.
      </p>
    </div>
  );
};
