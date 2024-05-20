import { render, screen } from "@testing-library/react";
import TagsComp from "../../src/components/utils/tags";

describe("tags", () => {
  it("should render without tags", () => {
    const { container } = render(<TagsComp />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render with tags", () => {
    const tags = ["sports", "politics", "fashion"];
    const fn = vi.fn();

    render(<TagsComp tagsList={tags} hadleClick={fn} />);

    const elemList = screen.getAllByRole("tag");
    expect(elemList).toHaveLength(tags.length);

    tags.forEach((tag) => {
      const elem = screen.getByText(tag);
      expect(elem).toBeInTheDocument();
    });
  });
});
