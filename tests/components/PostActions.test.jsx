import { render, screen } from "@testing-library/react";
import PostActions from "../../src/components/utils/PostActions";

describe("PostActions", () => {
  it("should render", () => {
    render(<PostActions />);

    const buttons = [/edit/i, /delete/i];
    const btns = screen.getAllByRole("button");
    expect(btns).toHaveLength(2);

    buttons.forEach((btn) => {
      const elem = screen.getByText(btn);
      expect(elem).toBeInTheDocument();
    });
  });
});
