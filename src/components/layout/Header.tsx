import { useState } from "react";
import { Phone, MessageCircle, ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "ვაკანსიები",
    href: "/vacancies",
    hasDropdown: true,
    dropdownItems: [
      { label: "ძიძა", href: "/vacancies?category=nanny" },
      { label: "მომვლელი", href: "/vacancies?category=caregiver" },
      { label: "დალაგება", href: "/vacancies?category=cleaning" },
      { label: "CDL მძღოლი", href: "/vacancies?category=cdl-driver" },
      { label: "ყველა ვაკანსია", href: "/vacancies" },
    ],
  },
  {
    label: "სერვისები",
    href: "/services",
    hasDropdown: true,
    dropdownItems: [
      { label: "თარჯიმნის მომსახურება", href: "/services/interpreter" },
      { label: "უძრავი ქონების აგენტი", href: "/services/real-estate" },
      { label: "ტაქსების გადახდა", href: "/services/taxes" },
    ],
  },
  {
    label: "სხვა სერვისები",
    href: "/other-services",
    hasDropdown: true,
    dropdownItems: [
      { label: "ჯარიმების გადახდა", href: "/services/fines" },
      { label: "ავია ბილეთები", href: "/services/tickets" },
      { label: "ავტომობილით მომსახურება", href: "/services/car-service" },
      { label: "მოგზაურობა", href: "/services/travel" },
    ],
  },
  { label: "ახალი ამბები", href: "/news", hasDropdown: false },
  { label: "ჩვენ შესახებ", href: "/about", hasDropdown: false },
];

const PHONE_NUMBER = "+1 (555) 123-4567";
const WHATSAPP_LINK = "https://wa.me/15551234567";
const MESSENGER_LINK = "https://m.me/yourpage";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header className="sticky-header">
      {/* Top bar with contact */}
      <div className="bg-primary/10 py-1.5 px-4">
        <div className="container flex items-center justify-between">
          <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="flex items-center gap-2 text-primary-foreground text-sm font-medium">
            <Phone className="w-4 h-4" />
            <span className="text-white">{PHONE_NUMBER}</span>
          </a>
          <div className="flex items-center gap-3">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="contact-icon-whatsapp w-8 h-8">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href={MESSENGER_LINK} target="_blank" rel="noopener noreferrer" className="contact-icon-messenger w-8 h-8">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 py-3">
        <div className="container flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white">
            GeorgiaUSA
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
                {item.hasDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-card rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.dropdownItems?.map((dropItem) => (
                      <Link
                        key={dropItem.href}
                        to={dropItem.href}
                        className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {dropItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop contact buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="cta-button flex items-center gap-2">
              <Phone className="w-4 h-4" />
              დარეკეთ
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-secondary border-t border-white/10 animate-fade-in">
          <nav className="container py-4">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => item.hasDropdown ? toggleDropdown(item.label) : setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Link to={item.hasDropdown ? "#" : item.href} onClick={(e) => item.hasDropdown && e.preventDefault()}>
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                  )}
                </button>
                {item.hasDropdown && openDropdown === item.label && (
                  <div className="ml-4 mb-2 bg-white/5 rounded-lg overflow-hidden animate-fade-in">
                    {item.dropdownItems?.map((dropItem) => (
                      <Link
                        key={dropItem.href}
                        to={dropItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {dropItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
