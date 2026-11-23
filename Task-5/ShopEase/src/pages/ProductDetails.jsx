
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="status-message">Loading product details...</p>;
  }

  if (error || !product) {
    return (
      <main className="status-page">
        <h2>{error || "Product not found"}</h2>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-details-container">
        <div className="details-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details-content">
          <p className="details-category">{product.category}</p>

          <h1>{product.title}</h1>

          <div className="details-rating">
            <span>★</span>
            <span>{product.rating?.rate ?? "N/A"}</span>
            <span>
              ({product.rating?.count ?? 0} reviews)
            </span>
          </div>

          <p className="details-description">
            {product.description}
          </p>

          <h2 className="details-price">
            ${Number(product.price).toFixed(2)}
          </h2>

          <button
            type="button"
            className="add-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
