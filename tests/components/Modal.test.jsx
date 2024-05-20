import { render, screen } from "@testing-library/react";
import Modal from "../../src/components/utils/Modal";

describe("Modal", () => {
  it("should render", () => {
    const props = {
      closeModal: vi.fn(),
      children: <div>Test</div>,
    };

    render(<Modal {...props} />);

    const btn = screen.getByRole("button", { name: /close/i });
    expect(btn).toBeInTheDocument();
  });
});
