import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { HttpResponse, delay, http } from "msw";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReduxMain from "../../src/components/ReduxMain";
import store from "../../src/store/redux/store";
import { server } from "../mocks/server";

describe("ReduxMain", () => {
  const renderComponent = () => {
    render(
      <Provider store={store}>
        <ReduxMain />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    return {
      getLoader: () => screen.getByRole("loader"),
    };
  };

  it("should render with loading state", async () => {
    server.use(http.get("https://dummyjson.com/products"), async () => {
      await delay();
      return HttpResponse.json([]);
    });

    const { getLoader } = renderComponent();

    expect(getLoader()).toBeInTheDocument();
  });

  it("should remove loader after products fetched", async () => {
    const { getLoader } = renderComponent();

    await waitForElementToBeRemoved(getLoader);

    expect(screen.getAllByRole("product").length).toBeGreaterThan(0);
  });

  it("should render with error", async () => {
    server.use(http.get("https://dummyjson.com/products"), () =>
      HttpResponse.error()
    );

    const { getLoader } = renderComponent();

    await waitForElementToBeRemoved(getLoader);

    expect(await screen.getByRole("error-message")).toBeInTheDocument();
  });
});
