
import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">

      <Link
        to={`/product/${product.id}`}
        className="product-image-link"
      >
        <div className="product-image">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
          />
        </div>
      </Link>

      <div className="product-info">
        <h3 className="product-title">
          {product.title}
        </h3>

        <p className="product-category">
          {product.category}
        </p>

        <div className="product-rating">
          <span>★</span>
          <span>{product.rating?.rate ?? "N/A"}</span>
          <span>
            ({product.rating?.count ?? 0} reviews)
          </span>
        </div>

        <div className="product-bottom">
          <p className="product-price">
            ${Number(product.price).toFixed(2)}
          </p>

          <button
            type="button"
            className="add-cart-btn"
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>

    </article>
  );
}

export default ProductCard;
