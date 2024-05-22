import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Cart from "../../src/components/Cart";
import renderWithProviders from "../mocks/mock-redux";
import { BrowserRouter } from "react-router-dom";
import { addToCart } from "../../src/store/redux/cartReducer";
import { products } from "../mocks/data";

describe("Cart", () => {
  const renderComponent = () => {
    const { store } = renderWithProviders(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    return {
      store,
    };
  };

  it("should render and show if no prodcucts info if cart is empty", () => {
    renderComponent();
    expect(screen.getByText(/no products/i)).toBeInTheDocument();
  });

  it("should show cart products", async () => {
    const { store } = renderComponent();
    store.dispatch(addToCart(products[0]));

    await waitForElementToBeRemoved(() => screen.queryByText(/no products/i));

    expect(screen.getAllByRole("product").length).toBeGreaterThan(0);
    expect(screen.getByText(/total/i)).toBeInTheDocument();
  });
});
