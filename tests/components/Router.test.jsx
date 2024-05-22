import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routerElemets from "../../src/routes/Router";
import { delay } from "msw";

describe("Router", () => {
  const renderComponent = async (path) => {
    const router = createMemoryRouter(routerElemets, {
      initialEntries: [path],
    });

    render(<RouterProvider router={router} />);

    await delay(500);
  };

  it.each([
    ["/", /home/i],
    ["/context", /add post/i],
    ["/redux", /Products/i],
    ["/not-found", /not found/i],
  ])("should route to %s", async (path, text) => {
    await renderComponent(path);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
