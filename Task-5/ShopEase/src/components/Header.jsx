
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header-container">

        <Link to="/" className="logo">
          ShopEase<span>.</span>
        </Link>

        <nav className="navigation">
          <NavLink to="/" end>
            Home
          </NavLink>

          <a href="/#products">
            Products
          </a>

          <NavLink to="/cart" className="cart-link">
            <span>Cart</span>
            <span className="cart-icon">🛒</span>
          </NavLink>
        </nav>

      </div>
    </header>
  );
}

export default Header;
