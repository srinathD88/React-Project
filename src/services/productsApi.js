const BASE_URL = "https://dummyjson.com";

const getProducts = async () => {
  const data = await fetch(`${BASE_URL}/products`);
  const products = await data.json();
  return products;
};

const getProduct = async (id) => {
  const data = await fetch(`${BASE_URL}/products/${id}`);
  const products = await data.json();
  return products;
};

export { getProducts, getProduct };
