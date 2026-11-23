
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard - temp";
import { getAllProducts, getAllCategories } from "../services/productService";
import { useCart } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const [productData, categoryData] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);

        setProducts(productData);
        setCategories(categoryData);
      } catch (err) {
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tagline">WELCOME TO SHOEASE</p>
          <h1>Discover Products You'll Love</h1>
          <p>
            Explore our collection of quality products
            and enjoy a simple shopping experience.
          </p>
          <a href="#products" className="hero-button">
            Explore Products
          </a>
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading">
          <div>
            <p className="section-subtitle">OUR COLLECTION</p>
            <h2>Explore Products</h2>
          </div>

          <p>{filteredProducts.length} products found</p>
        </div>

        <div className="product-controls">
          <input
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select
            aria-label="Filter products by category"
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.target.value)
            }
          >
            <option value="all">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <p className="status-message" role="status">
            Loading products...
          </p>
        )}

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))
            ) : (
              <p className="status-message">
                No products found. Try another search.
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
