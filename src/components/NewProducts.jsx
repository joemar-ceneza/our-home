import ProductSection from "./ProductSection";

export default function NewProducts() {
  return (
    <ProductSection
      title="new products"
      fetchUrl="/products?populate=*&filters[isNew]=true"
      bestLabel={false}
      newLabel={true}
      relatedLabel={false}
    />
  );
}
