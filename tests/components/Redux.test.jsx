import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Redux from "../../src/pages/redux/Redux";

describe("Redux", () => {
  it("should render", () => {
    render(<Redux />, { wrapper: BrowserRouter });

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toHaveTextContent(/redux/i);
  });
});
