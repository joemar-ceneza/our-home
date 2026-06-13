import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// images large screen sizes
import DesktopSale from "../images/desktop-sale.jpg";
import DesktopInteriorDesign from "../images/desktop-interior-design.jpg";
import DesktopInstallment from "../images/desktop-installment.jpg";
import DesktopShoppingReward from "../images/desktop-shopping-reward.jpg";
import DesktopLess from "../images/desktop-less.jpg";
// images small screen sizes
import MobileExtra from "../images/mobile-extra.jpeg";
import MobileGiftsDad from "../images/mobile-gifts-dad.jpeg";
import MobileInteriorDesign from "../images/mobile-interior-design.jpeg";
import MobileLess from "../images/mobile-less.jpeg";
import MobileMidYearSale from "../images/mobile-mid-year-sale.jpeg";
import MobileInstallment from "../images/mobile-installment.jpeg";

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const heroImages = isDesktop
    ? [
        { url: DesktopSale },
        { url: DesktopInteriorDesign },
        { url: DesktopInstallment },
        { url: DesktopShoppingReward },
        { url: DesktopLess },
      ]
    : [
        { url: MobileExtra },
        { url: MobileGiftsDad },
        { url: MobileInteriorDesign },
        { url: MobileLess },
        { url: MobileMidYearSale },
        { url: MobileInstallment },
      ];

  useEffect(() => {
    const handleResize = (): void => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 pt-14 pb-10 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.1]">
          Make your house a <span className="italic text-clay">home</span>.
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-muted">
          Furniture and everyday essentials, thoughtfully chosen for the way you
          live.
        </p>
        <Link
          to="/category"
          className="inline-block mt-7 bg-clay hover:bg-clay-dark text-white px-8 py-3 rounded-full transition-colors">
          Shop the collection
        </Link>
      </div>

      <div className="max-w-screen-2xl w-[95%] mx-auto pb-12">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          loop={true}
          pagination={true}
          navigation={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}>
          {heroImages?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  className="w-full rounded-2xl select-none"
                  src={`${item.url}`}
                  alt=""
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
