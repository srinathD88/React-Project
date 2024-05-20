import { render, screen } from "@testing-library/react";
import Loader from "../../src/components/utils/Loader";

describe("Loader", () => {
  it("should render", () => {
    const { container } = render(<Loader />);

    const elem = container.querySelector(".loader");
    expect(elem).toBeInTheDocument();
  });
});
