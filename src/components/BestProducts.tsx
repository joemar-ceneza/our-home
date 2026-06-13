import ProductSection from "./ProductSection";

export default function BestProducts() {
  return (
    <ProductSection
      title="best sellers"
      fetchUrl="/products/products?isBSeller=true"
      bestLabel={true}
      newLabel={false}
      relatedLabel={false}
    />
  );
}
