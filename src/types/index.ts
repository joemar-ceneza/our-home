/** A product category. */
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  products?: Product[];
}

/** A product as returned by the API. `category` may be an id or populated. */
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  regularPrice: number;
  salePrice: number;
  isOnSale: boolean;
  isBSeller: boolean;
  isNewProduct: boolean;
  isFeatured: boolean;
  quantity: number;
  category: string | Category;
  createdAt?: string;
  updatedAt?: string;
}

/** A product with its category populated (product detail endpoint). */
export interface ProductDetail extends Omit<Product, "category"> {
  category: Category;
}

/** Response shape of GET /categories/categories/:slug. */
export interface CategoryProductsResponse {
  category: { id: string; name: string; slug: string };
  products: Product[];
}

/** Response shape of GET /products/products/:slug (a product + its related). */
export interface RelatedProductsResponse {
  product: Product;
  relatedProducts: Product[];
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalProducts: number;
}

/** Response shape of GET /products/featured. */
export interface FeaturedProductsResponse {
  products: Product[];
  pagination: Pagination;
}

/** A product in the cart, with the chosen quantity. */
export interface CartItem extends Product {
  amount: number;
}

/** Value exposed by CartContext. */
export interface CartContextValue {
  cart: CartItem[];
  itemsAmount: number;
  total: number;
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  addQty: (id: string) => void;
  reduceQty: (id: string) => void;
  clearCart: () => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}
