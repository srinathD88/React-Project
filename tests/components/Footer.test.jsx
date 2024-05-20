import { render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer";

describe("Footer", () => {
  it("should render", () => {
    render(<Footer />);

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toHaveTextContent(/footer/i);
  });
});
