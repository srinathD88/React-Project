import Button from "./utils/Button";

const Product = ({
  product,
  handleProductClick,
  handleCartBtnClick,
  handleRemoveCartBtnClick,
  showAllDetails = false,
  inCart = false,
  inCartPage = false,
  handleGoToCartClick
}) => {
  return (
    <div className="product">
      <img
        src={product.thumbnail}
        onClick={() => handleProductClick?.(product.id)}
      />
      <div className="product-details">
        <div className="title">
          <h3>{product.title}</h3>
          <p>
            Rs. {product.price}
            <small> ({product.discountPercentage}% off)</small>
          </p>
        </div>
        {showAllDetails && <p>{product.description}</p>}
        <div className="product-actions">
          {!inCartPage && !inCart && <Button
            text="Add to Cart"
            hadnleClick={() => handleCartBtnClick(product)}
          />}
          {!inCartPage && inCart && <Button
            text='Go to Cart'
            hadnleClick={handleGoToCartClick}
          />}
          {inCartPage && <Button
            text='Remove From Cart'
            hadnleClick={() => handleRemoveCartBtnClick(product.id)}
          />}
        </div>
      </div>
    </div>
  );
};

export default Product;
