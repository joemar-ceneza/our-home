import BestProducts from "../components/BestProducts";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Category from "../components/Category";
import NewProducts from "../components/NewProducts";

export default function Home() {
  return (
    <section>
      <Hero />
      <BestProducts />
      <Category />
      <FeaturedProducts />
      <NewProducts />
    </section>
  );
}
