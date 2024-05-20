import { render, screen } from "@testing-library/react";
import PageNotFound from "../../src/components/utils/PageNotFound";

describe("PageNotFound", () => {
  it("should render", () => {
    render(<PageNotFound />);
    const elem = screen.getByRole("message");
    expect(elem).toBeDefined();
    expect(elem).toHaveTextContent(/Not Found/i);
  });
});
