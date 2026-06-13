import Link from "next/link";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

const companyNavLinks = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Isoleap", href: "#why-isoleap" },
  { label: "Our Heritage", href: "#our-heritage" },
  { label: "Sectors", href: "#sectors" },
];

export default function Footer() {
  return (
    <footer className="mx-[2vw] mb-4 rounded-2xl px-5 md:px-15 lg:px-20 py-10 bg-green-900">
      <div
        className="grid grid-cols-1 md:grid-cols-3 md:justify-items-center gap-7 mb-10
          border-b border-grey-500/[0.25] pb-10"
      >
        <div className="flex flex-col gap-2 text-sm text-grey-400">
          <Link href="#home" className="select-none w-fit mb-4">
            Isoleap
          </Link>

          <p>Skills that move organizations forward.</p>

          <p>
            A digital and AI skills training company, powered by the
            instructional expertise of Tech4Dev.
          </p>
        </div>

        <nav aria-labelledby="companyNavigationHeading">
          <h4
            id="companyNavigationHeading"
            className="mb-5 text-xs font-body uppercase font-semibold text-grey-500"
          >
            Company
          </h4>

          <ul className="flex flex-col gap-3">
            {companyNavLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="select-none text-sm capitalize text-grey-400 transition-colors
                    duration-150 hover:text-amber-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="mb-5 text-xs font-body uppercase font-semibold text-grey-500">
            Connect with us
          </h4>

          <ul className="flex flex-col gap-3 text-sm text-grey-400">
            <li className="flex items-center gap-2">
              <Mail size={16} /> hello@isoleap.com
            </li>

            <li>
              <Link
                href="#cta"
                className="select-none flex items-center gap-2 transition-colors
                  duration-150 hover:text-amber-500"
              >
                <Phone size={16} /> Book a discovery call
              </Link>
            </li>

            <li>
              <Link
                href="https://tech4dev.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="select-none flex items-center gap-2 transition-colors
                  duration-150 hover:text-amber-500"
              >
                <Globe size={16} /> Tech4Dev
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-3
          text-grey-500"
      >
        <small>&copy; 2025 Isoleap. All rights reserved.</small>

        <small className="inline-flex items-center gap-2">
          <MapPin size={16} /> Lagos, Nigeria
        </small>
      </div>
    </footer>
  );
}
