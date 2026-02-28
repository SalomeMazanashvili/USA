import { Header } from "@/components/layout/Header";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Languages, Home, Receipt, AlertCircle, Plane, Car, MapPin, Phone, ArrowRight } from "lucide-react";
import serviceInterpreter from "@/assets/service-interpreter.jpg";
import serviceRealestate from "@/assets/service-realestate.jpg";
import serviceTaxes from "@/assets/service-taxes.jpg";
import serviceFines from "@/assets/service-fines.jpg";
import serviceTravel from "@/assets/service-travel.jpg";
import serviceCar from "@/assets/service-car.jpg";

const PHONE_NUMBER = "+1 (555) 123-4567";

const mainServices = [
  { 
    id: "interpreter", 
    title: "თარჯიმნის მომსახურება", 
    description: "პროფესიონალური თარგმანი ნებისმიერ დაწესებულებაში", 
    icon: Languages, 
    image: serviceInterpreter,
    highlight: "ყველაზე პოპულარული"
  },
  { 
    id: "real-estate", 
    title: "უძრავი ქონების აგენტი", 
    description: "ყიდვა და გაქირავება საუკეთესო პირობებით", 
    icon: Home, 
    image: serviceRealestate,
    highlight: "რეკომენდირებული"
  },
  { 
    id: "taxes", 
    title: "ტაქსების გადახდა", 
    description: "სწრაფი და მარტივი ტაქსების მომსახურება", 
    icon: Receipt, 
    image: serviceTaxes,
    highlight: "Tax Season"
  },
];

const otherServices = [
  { id: "fines", title: "ჯარიმების გადახდა / გასაჩივრება", description: "პროფესიონალური დახმარება ჯარიმების საკითხებში", icon: AlertCircle, image: serviceFines },
  { id: "tickets", title: "ავია და სხვა ბილეთები", description: "ავიაბილეთების დაჯავშნა საუკეთესო ფასად", icon: Plane, image: serviceTravel },
  { id: "car-service", title: "ავტომობილით მომსახურება", description: "სატრანსპორტო მომსახურება ნებისმიერ მარშრუტზე", icon: Car, image: serviceCar },
  { id: "travel", title: "მოგზაურობა", description: "ტურისტული პაკეტები და მოგზაურობის დაგეგმვა", icon: MapPin, image: serviceTravel },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-[88px]">
        {/* Hero section with image */}
        <div className="relative h-[160px] md:h-[200px] overflow-hidden">
          <img 
            src={serviceInterpreter} 
            alt="ჩვენი სერვისები" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70" />
          <div className="container relative h-full flex flex-col justify-center px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
              ჩვენი სერვისები
            </h1>
            <p className="text-primary-foreground/80 text-sm md:text-base">
              აირჩიეთ თქვენთვის სასურველი მომსახურება
            </p>
          </div>
        </div>

        <div className="container py-6 px-4 pb-24 lg:pb-8">
          {/* Call button */}
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
            className="w-full cta-button-large flex items-center justify-center gap-2 mb-6 shadow-lg"
          >
            <Phone className="w-5 h-5" />
            დარეკეთ ახლავე — უფასო კონსულტაცია
          </a>

          {/* Primary services - with images */}
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            მთავარი სერვისები
          </h2>
          <div className="grid grid-cols-1 gap-4 mb-8">
            {mainServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link 
                  key={service.id} 
                  to={`/services/${service.id}`} 
                  className="group relative bg-card rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg hover:shadow-xl transition-all"
                >
                  {/* Background image */}
                  <div className="absolute inset-0 opacity-20">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Highlight badge */}
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full z-10">
                    {service.highlight}
                  </span>
                  
                  <div className="relative p-5 flex items-center gap-4">
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

          {/* Visual divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground">დამატებითი სერვისები</span>
            </div>
          </div>

          {/* Other services - 2x2 grid with images */}
          <div className="grid grid-cols-2 gap-3">
            {otherServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link 
                  key={service.id} 
                  to={`/services/${service.id}`} 
                  className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                >
                  {/* Thumbnail image */}
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 w-8 h-8 rounded-lg bg-card/90 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">{service.title}</h3>
                    <span className="text-xs text-primary font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      გაიგე მეტი <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      <StickyContactBar />
    </div>
  );
};

export default Services;
