import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "../../src/components/Product";
import { products } from "../mocks/data";

describe("Product", () => {
  const renderComponent = (newProps = {}) => {
    const propsData = {
      product: products[0],
      handleProductClick: vi.fn(),
      handleCartBtnClick: vi.fn(),
      handleRemoveCartBtnClick: vi.fn(),
      showAllDetails: false,
      inCart: false,
      inCartPage: false,
      handleGoToCartClick: vi.fn(),
    };

    const props = { ...propsData, ...newProps };
    render(<Product {...props} />);
    const btn = () => screen.getByRole("button");
    const title = () => screen.getByRole("product-title");
    const getDescription = () =>
      screen.getByText(new RegExp(products[0].description));
    const getImage = (altText) => screen.getByAltText(new RegExp(altText));

    return {
      product: products[0],
      btn,
      title,
      getDescription,
      getImage,
      user: userEvent.setup(),
      handleRemoveCartBtnClick: props.handleRemoveCartBtnClick,
      handleCartBtnClick: props.handleCartBtnClick,
      handleProductClick: props.handleProductClick,
    };
  };

  it("should render product", async () => {
    const {
      btn,
      title,
      getImage,
      user,
      handleCartBtnClick,
      product,
      handleProductClick,
    } = renderComponent();

    expect(title()).toHaveTextContent(product.title);

    expect(btn()).toHaveTextContent(/add/i);

    expect(getImage(product.title)).toBeInTheDocument();

    await user.click(btn());

    expect(handleCartBtnClick).toHaveBeenCalledWith(product);

    await user.click(getImage(product.title));

    expect(handleProductClick).toHaveBeenCalledWith(product.id);
    expect(screen.queryByText(product.description)).not.toBeInTheDocument();
  });

  it("should show product description in product details page", () => {
    const { getDescription } = renderComponent({ showAllDetails: true });
    expect(getDescription()).toBeInTheDocument();
  });

  it("should update button text if product is in cart", () => {
    const { btn } = renderComponent({ inCart: true });
    expect(btn()).toHaveTextContent(/go to/i);
  });

  it("should show remove cart from button if product is in cart page", async () => {
    const { btn, user, handleRemoveCartBtnClick, product } = renderComponent({
      inCartPage: true,
    });
    expect(btn()).toHaveTextContent(/Remove/i);
    await user.click(btn());

    expect(handleRemoveCartBtnClick).toHaveBeenCalledWith(product.id);
  });
});
