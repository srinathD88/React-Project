import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { BrowserRouter } from "react-router-dom";
import ProductDescription from "../../src/components/ProductDescription";
import renderWithProviders from "../mocks/mock-redux";
import { server } from "../mocks/server";

describe("ProductDescription", () => {
  const renderComponent = () => {
    renderWithProviders(
      <BrowserRouter>
        <ProductDescription />
      </BrowserRouter>
    );

    return {
      loader: screen.getByRole("loader"),
      getLoader: () => screen.queryByRole("loader"),
      getProductTitle: () => screen.getByRole("product-title"),
      getError: () => screen.queryByRole("error-message"),
    };
  };

  it("should render and show loader", () => {
    const { loader } = renderComponent();
    expect(loader).toBeInTheDocument();
  });

  it("should wait for loader to be removed once data fetched", async () => {
    const { getLoader } = renderComponent();
    await waitForElementToBeRemoved(getLoader);
  });

  it("should show fecthed product detail", async () => {
    const { getProductTitle, getLoader } = renderComponent();
    await waitForElementToBeRemoved(getLoader);
    expect(getProductTitle()).toBeInTheDocument();
  });

  it("should show error if product fetching failed", async () => {
    server.use(http.get("https://dummyjson.com/products/1"), () =>
      HttpResponse.error()
    );
    const { getLoader, getError } = renderComponent();
    await waitForElementToBeRemoved(getLoader);

    expect(getError()).toBeInTheDocument();
  });
});
