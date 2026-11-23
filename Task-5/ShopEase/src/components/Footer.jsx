
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>ShopEase</h2>
        <p>Your everyday shopping, made easier.</p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/#products">Products</a>
          <a href="/cart">Cart</a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
