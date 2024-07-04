import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-200 text-sm tracking-wider">
      <>
        <div className="w-[100px] mx-auto flex justify-between text-black py-10">
          <Link>
            <FaFacebookF />
          </Link>
          <Link>
            <FaInstagram />
          </Link>
          <Link>
            <FaYoutube />
          </Link>
        </div>
        <div className="w-[90%] mx-auto flex justify-between pb-10 max-lg:flex-col">
          <div>
            <div className="h-[200px] max-lg:h-[150px]">
              <h3 className="font-semibold text-lg">We're here to help</h3>
              <p className="py-1">Customer Service</p>
              <p className="pb-1">Returns Policy</p>
              <p> Shop Online</p>
              <p className="pb-1">Give Us Feedback</p>
            </div>
            <h3 className="font-semibold text-lg">Stores</h3>
            <p className="py-1">Find A Store Near You</p>
          </div>
          <div>
            <div className="h-[200px]">
              <h3 className="font-semibold text-lg max-lg:pt-5 max">
                Information
              </h3>
              <p className="py-1">FAQs</p>
              <p className="pb-1">Privacy and Cookie Notice</p>
              <p className="pb-1">Terms of Service</p>
              <p className="pb-1">Sitemap</p>
              <p className="pb-1">Blog Articles</p>
            </div>

            <h3 className="font-semibold text-lg">More About Us</h3>
            <p className="py-1">Careers</p>
            <p className="pb-1">About Us</p>
          </div>
          <div className="max-lg:py-5">
            <h3 className="font-semibold text-lg">Our Cards and Rewards</h3>
            <p className="py-1">SMAC</p>
            <p className="pb-1">Prestige</p>
          </div>
          <div className="w-[30%] max-lg:w-full">
            <h3 className="font-semibold text-lg">
              Sign Up For Sale + New Arrivals
            </h3>
            <p className="py-3">Join our mailing list for updates</p>
            <input
              type="text"
              placeholder="Email Address..."
              className="w-full h-[40px] px-3 outline-none"
            />
            <button className="block bg-slate-800 text-white p-4 my-5 max-lg:w-full">
              Join
            </button>
          </div>
        </div>
      </>
      <div className="bg-white text-center py-10">
        <p>© 2024 Our Home Philippines. All rights reserved.</p>
      </div>
    </footer>
  );
}
