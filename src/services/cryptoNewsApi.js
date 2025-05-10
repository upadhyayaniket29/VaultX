import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://newsdata.io/api/1';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ coin = 'bitcoin', fromDate }) =>
        `/news?apikey=pub_860385d02083ff1806cfaf0159061198792a8&q=${coin}&language=en&category=business`,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
