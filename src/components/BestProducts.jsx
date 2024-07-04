import ProductSection from "./ProductSection";

export default function BestProducts() {
  return (
    <ProductSection
      title="best sellers"
      fetchUrl="/products?populate=*&filters[isBSeller]=true"
      bestLabel={true}
      newLabel={false}
      relatedLabel={false}
    />
  );
}
