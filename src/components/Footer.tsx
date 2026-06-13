import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";

const socials: { Icon: IconType; label: string }[] = [
  { Icon: FaFacebookF, label: "Facebook" },
  { Icon: FaInstagram, label: "Instagram" },
  { Icon: FaYoutube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-cream border-t border-ink/10 text-sm tracking-wide text-muted">
      <div className="flex justify-center gap-6 py-10">
        {socials.map(({ Icon, label }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className="grid place-items-center h-10 w-10 rounded-full border border-ink/15 text-ink hover:bg-clay hover:text-white hover:border-clay transition-colors">
            <Icon />
          </button>
        ))}
      </div>

      <div className="w-[90%] max-w-screen-xl mx-auto grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-serif text-lg text-ink mb-3">We're here to help</h3>
          <ul className="space-y-1">
            <li>Customer Service</li>
            <li>Returns Policy</li>
            <li>Shop Online</li>
            <li>Give Us Feedback</li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-ink mb-3">Information</h3>
          <ul className="space-y-1">
            <li>FAQs</li>
            <li>Privacy and Cookie Notice</li>
            <li>Terms of Service</li>
            <li>Blog Articles</li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-ink mb-3">More About Us</h3>
          <ul className="space-y-1">
            <li>Careers</li>
            <li>About Us</li>
            <li>Find A Store Near You</li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-ink mb-3">
            Sign up for sale + new arrivals
          </h3>
          <p className="mb-3">Join our mailing list for updates</p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email address..."
              aria-label="Email address"
              className="w-full h-11 px-3 rounded-lg bg-sand border border-ink/10 outline-none text-ink placeholder:text-muted focus:border-clay transition-colors"
            />
            <button
              type="submit"
              className="h-11 rounded-lg bg-clay text-white hover:bg-clay-dark transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-ink/10 text-center py-6 text-xs">
        <p>© 2024 Our Home Philippines. All rights reserved.</p>
      </div>
    </footer>
  );
}
