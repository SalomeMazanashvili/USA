import { Link } from "react-router-dom";
import { AlertCircle, Plane, Car, MapPin, ArrowRight } from "lucide-react";

const otherServices = [
  {
    id: 1,
    title: "ჯარიმების და ტოლების გადახდა / გასაჩივრება",
    description: "პროფესიონალური დახმარება ჯარიმების საკითხებში",
    icon: AlertCircle,
    href: "/services/fines",
  },
  {
    id: 2,
    title: "ავია და სხვა ბილეთები",
    description: "ავიაბილეთების დაჯავშნა საუკეთესო ფასად",
    icon: Plane,
    href: "/services/tickets",
  },
  {
    id: 3,
    title: "ავტომობილით მომსახურება",
    description: "სატრანსპორტო მომსახურება ნებისმიერ მარშრუტზე",
    icon: Car,
    href: "/services/car-service",
  },
  {
    id: 4,
    title: "მოგზაურობა",
    description: "ტურისტული პაკეტები და მოგზაურობის დაგეგმვა",
    icon: MapPin,
    href: "/services/travel",
  },
];

export const OtherServicesSection = () => {
  return (
    <section className="py-8 px-4 bg-muted/30">
      <div className="container">
        {/* Section header */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-foreground mb-1">
            დამატებითი სერვისები
          </h2>
          <p className="text-sm text-muted-foreground">სხვა მომსახურებები, რომლებიც შეიძლება დაგჭირდეთ</p>
        </div>

        {/* Grid layout instead of expandable */}
        <div className="grid grid-cols-2 gap-3">
          {otherServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link 
                key={service.id} 
                to={service.href} 
                className="group bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">{service.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{service.description}</p>
                <span className="text-xs text-primary font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  გაიგე მეტი <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Link to all services */}
        <Link 
          to="/services" 
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 bg-secondary/50 hover:bg-secondary rounded-xl text-sm font-medium text-secondary-foreground transition-colors"
        >
          ნახე ყველა სერვისი
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
