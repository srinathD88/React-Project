import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import ProductsNavBar from "../../src/components/ProductsNavBar";
import { login } from "../../src/store/redux/userReducer";

import renderWithProviders from "../mocks/mock-redux";

describe("ProductsNavBar", () => {
  const renderComponent = (preloadedState) => {
    const { store } = renderWithProviders(
      <BrowserRouter>
        <ProductsNavBar />
      </BrowserRouter>,
      {
        preloadedState: preloadedState,
      }
    );

    return {
      store,
      getLoginBtn: () => screen.getByRole("link", { name: /login/i }),
      queryLoginBtn: () => screen.queryByRole("link", { name: /login/i }),
      getLogoutBtn: () => screen.queryByRole("button", { name: /logout/i }),
    };
  };

  it("should render and show login button", () => {
    const { getLoginBtn, getLogoutBtn } = renderComponent();
    expect(getLoginBtn()).toBeInTheDocument();

    expect(getLogoutBtn()).not.toBeInTheDocument();
  });

  it("should show logout button when user logged in", async () => {
    const user = {
      name: "abcd",
    };
    // const { store, queryLoginBtn, getLogoutBtn } = renderComponent({ user });

    const { store, queryLoginBtn, getLogoutBtn } = renderComponent();
    await store.dispatch(login(user));

    expect(queryLoginBtn()).not.toBeInTheDocument();

    expect(getLogoutBtn()).toBeInTheDocument();

    expect(screen.getByText(new RegExp(user.name))).toBeInTheDocument();
  });

  it("should logout and show login button", async () => {
    const { getLogoutBtn, getLoginBtn } = renderComponent();

    const user = userEvent.setup();
    await user.click(getLogoutBtn());

    expect(getLoginBtn()).toBeInTheDocument();
  });
});
