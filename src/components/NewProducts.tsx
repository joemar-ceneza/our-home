import ProductSection from "./ProductSection";

export default function NewProducts() {
  return (
    <ProductSection
      title="new products"
      fetchUrl="/products/products?isNewProduct=true"
      bestLabel={false}
      newLabel={true}
      relatedLabel={false}
    />
  );
}
