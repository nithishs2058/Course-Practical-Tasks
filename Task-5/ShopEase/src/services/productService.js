
const API_URL = "https://fakestoreapi.com";

export async function getAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Product Fetch Error:", error);
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Product Details Error:", error);
    throw error;
  }
}

export async function getAllCategories() {
  try {
    const response = await fetch(`${API_URL}/products/categories`);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Category Fetch Error:", error);
    throw error;
  }
}
