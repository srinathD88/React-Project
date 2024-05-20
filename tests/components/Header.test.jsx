import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../../src/components/Header";

describe("Header", () => {
  it("should render", () => {
    const { container } = render(<Header />, { wrapper: BrowserRouter });

    const elem = container.querySelector(".logo");
    expect(elem).toBeInTheDocument();
  });
});
