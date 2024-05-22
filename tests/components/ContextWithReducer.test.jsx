import { render, screen } from "@testing-library/react";
import ContextWithReducer from "../../src/pages/contextWithReducer/Context";
import { BrowserRouter } from "react-router-dom";
describe("ContextWithReducer", () => {
  it("should render", () => {
    render(<ContextWithReducer />, { wrapper: BrowserRouter });

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /context/i
    );
  });
});
