import { Link } from "react-router-dom";
import { Languages, Home, Receipt, Phone, ArrowRight } from "lucide-react";

const PHONE_NUMBER = "+1 (347) 957-0185";

const mainServices = [
  {
    id: 1,
    title: "თარჯიმნის მომსახურება",
    description: "პროფესიონალური თარგმანი ნებისმიერ დაწესებულებაში",
    icon: Languages,
    href: "/services/interpreter",
    highlight: "პოპულარული",
  },
  {
    id: 2,
    title: "უძრავი ქონების აგენტი",
    description: "ყიდვა / გაქირავება საუკეთესო პირობებით",
    icon: Home,
    href: "/services/real-estate",
    highlight: "რეკომენდირებული",
  },
  {
    id: 3,
    title: "ტაქსების გადახდა",
    description: "სწრაფი და მარტივი ტაქსების მომსახურება",
    icon: Receipt,
    href: "/services/taxes",
  },
  
];

export const MainServicesSection = () => {
  return (
    <section className="py-5 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        {/* Section header with value proposition */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-foreground mb-1">
            სერვისები, რომლებიც ყველაზე ხშირად სჭირდებათ ემიგრანტებს
          </h2>
          <p className="text-sm text-muted-foreground">სწრაფი და პროფესიონალური დახმარება</p>
        </div>
        {/* Call button - prominent */}
        <a
          href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
          className="w-full cta-button-large flex items-center justify-center gap-2 mb-5 shadow-lg"
        >
          <Phone className="w-5 h-5" />
          დარეკეთ ახლავე — უფასო კონსულტაცია
        </a>

        {/* Main services grid - LARGE, visually dominant */}
        <div className="grid grid-cols-1 gap-4">
          {mainServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link 
                key={service.id} 
                to={service.href} 
                className="group relative bg-card rounded-2xl p-5 border-2 border-primary/30 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Highlight badge */}
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  {service.highlight}
                </span>
                
                {/* Background gradient accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 shadow-inner">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-lg mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
