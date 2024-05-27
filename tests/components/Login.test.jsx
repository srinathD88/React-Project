import { render, screen, waitFor } from "@testing-library/react";
import Login from "../../src/components/Login";
import renderWithProviders from "../mocks/mock-redux";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { delay } from "msw";

describe("Login", () => {
  const renderComponent = async (preloadedState) => {
    const handleLoginSubmitSpy = vi.fn();
    const { store } = renderWithProviders(
      <BrowserRouter>
        <Login handleSubmit={handleLoginSubmitSpy} />
      </BrowserRouter>,
      {
        preloadedState: preloadedState,
      }
    );

    await screen.queryByRole("form");

    return {
      store,
      user: userEvent.setup(),
      formData: {
        name: "testName",
        password: "1234",
      },
      handleLoginSubmitSpy,
      submitBtn: screen.getByRole("button", { name: /submit/i }),
    };
  };

  it("should render with form and submit with empty data", async () => {
    const { user, submitBtn } = await renderComponent();

    await user.click(submitBtn);

    expect(await screen.findByRole("error")).toBeInTheDocument();
  });

  it("should render with form and enter values", async () => {
    const { user, formData, handleLoginSubmitSpy, submitBtn } =
      await renderComponent();

    const nameInput = screen.getByRole("textbox", { placeholder: /name/i });
    const passwordInput = screen.getByLabelText(/password/i);

    await user.clear(nameInput);
    await user.type(nameInput, formData.name);

    await user.clear(passwordInput);
    await user.type(passwordInput, formData.password);

    expect(nameInput).toHaveValue(formData.name);
    expect(passwordInput).toHaveValue(formData.password);

    await user.click(submitBtn);

    expect(await screen.queryByRole("error")).not.toBeInTheDocument();

    expect(handleLoginSubmitSpy).toHaveBeenCalledWith(formData);
  });
});
