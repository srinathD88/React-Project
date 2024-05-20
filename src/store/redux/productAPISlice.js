import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductByIdQuery } = productAPI;
