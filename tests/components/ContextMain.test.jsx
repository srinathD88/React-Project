import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import ContextMain from "../../src/pages/contextWithReducer/ContextMain";
import { PostsContext } from "../../src/store/context/PostsProvider";
describe("ContextMain", () => {
  const renderComponent = (newProps) => {
    const data = {
      showForm: false,
      toggleForm: vi.fn(),
      editPostForm: vi.fn(),
    };

    const value = { ...data, ...newProps };

    render(
      <PostsContext.Provider value={value}>
        <ContextMain />
      </PostsContext.Provider>
    );

    return {
      user: userEvent.setup(),
      addBtn: screen.getByRole("button", { name: /add/i }),
    };
  };

  it("should render with no form and check add post button", () => {
    const { addBtn } = renderComponent();
    expect(addBtn).toBeInTheDocument();
  });

  it("should render with form", async () => {
    renderComponent({ showForm: true });

    expect(
      await screen.findByRole("heading", { name: /add/i })
    ).toBeInTheDocument();
  });
});
