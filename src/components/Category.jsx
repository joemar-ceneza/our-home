import { useState, useEffect } from "react";
import useFetch from "../hook/useFetch";
import MobileChooseCategory from "../images/mobile-choose-category.jpg";
import DesktopChooseCategory from "../images/desktop-choose-category.jpg";
import CategoryItem from "./CategoryItem";
import SpinnerLoader from "./SpinnerLoader";
import Error from "./Error";
import NotFound from "./NotFound";

export default function Category() {
  const { data, isLoading, error } = useFetch("/categories");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Initial check for mobile screen size

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="py-32">
        <SpinnerLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-32">
        <Error />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="py-32">
        <NotFound />
      </div>
    );
  }

  return (
    <section className="w-[95%] mx-auto py-5 select-none">
      <img
        className="w-full"
        src={isMobile ? MobileChooseCategory : DesktopChooseCategory}
        alt="Choose Category"
      />
      <div className="max-w-screen-2xl mx-auto grid place-items-center grid-cols-2 gap-2 py-16 md:gap-8 lg:grid-cols-3">
        {data?.map((category) => {
          return <CategoryItem key={category._id} category={category} />;
        })}
      </div>
    </section>
  );
}
