import { http, HttpResponse } from "msw";
import { products } from "./data";

const BASE_URL = "https://dummyjson.com";

export const handlers = [
  http.get(`${BASE_URL}/products`, () => {
    return HttpResponse.json({ products });
  }),

  http.get(`${BASE_URL}/products/:id`, ({ params }) => {
    return HttpResponse.json(products[0]);
  }),
];
