import { render, screen } from "@testing-library/react";
import Login from "../../src/components/Login";
import renderWithProviders from "../mocks/mock-redux";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Login", () => {
  const renderComponent = async (preloadedState) => {
    const { store } = renderWithProviders(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
      {
        preloadedState: preloadedState,
      }
    );

    await screen.queryByRole("form");

    return {
      user: userEvent.setup(),
    };
  };

  it("should render with form and enter values", async () => {
    const { user } = await renderComponent();

    const nameInput = screen.getByRole("textbox", { placeholder: /name/i });
    await user.clear(nameInput);
    await user.type(nameInput, "testname");

    const passwordInput = screen.getByRole("textbox", {
      placeholder: /password/i,
    });

    await user.clear(passwordInput);
    await user.type(passwordInput, "1234");

    console.log(nameInput.value);
    console.log(passwordInput.value);

    expect(nameInput).toHaveValue("testname");
    expect(passwordInput).toHaveValue("1234");
    screen.debug();
  });
});
