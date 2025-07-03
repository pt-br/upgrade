import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const upgradeApi = createApi({
  reducerPath: 'upgradeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getColors: builder.query({
      query: () => ({
        url: `/colors`,
      }),
    }),
  }),
});
