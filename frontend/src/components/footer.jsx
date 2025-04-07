import { Logo } from "./ui/Logo";
import { Youtube, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { label: "About", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" }
    ],
    Product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Security", href: "#" },
      { label: "Roadmap", href: "#" }
    ],
    Resources: [
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Partners", href: "#" }
    ],
    Legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Licenses", href: "#" }
    ]
  };

  const socialIcons = [
    { icon: Youtube, href: "https://youtube.com" },
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Twitter, href: "https://twitter.com" }
  ];

  return (
    <footer className="relative overflow-hidden text-white bg-gray-900">
      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          <div className="md:col-span-2">
            <a href="/" className="flex items-center mb-6">
              <Logo className="dark"/>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              More Than Just A Logistic Shipment
            </p>
            <div className="flex space-x-4">
              {socialIcons.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 transition-colors hover:bg-blue-500 hover:text-white"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links], index) => (
            <div key={index} className="md:col-span-1">
              <h3 className="font-bold mb-4 text-white">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 flex flex-col items-center md:flex-row justify-center border-t border-gray-700">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} ShipWell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;