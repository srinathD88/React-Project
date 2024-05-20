import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BackToHome from "../../src/components/utils/BackToHome";

describe("BackToHome", () => {
  it("should render", () => {
    render(<BackToHome />, { wrapper: BrowserRouter });
    const elem = screen.getByRole("link", { name: /back/i });

    expect(elem).toBeInTheDocument();
  });
});
