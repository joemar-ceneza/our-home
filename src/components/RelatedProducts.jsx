import ProductSection from "./ProductSection";

export default function RelatedProducts({ categoryTitle }) {
  return (
    <ProductSection
      title="related products"
      fetchUrl={`/products?populate=*&filters[categories][title]=${categoryTitle}`}
      bestLabel={false}
      newLabel={false}
      relatedLabel={true}
    />
  );
}
