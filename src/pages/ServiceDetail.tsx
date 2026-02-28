import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { Footer } from "@/components/layout/Footer";
import { Phone, CheckCircle, ArrowLeft, Languages, Home, Receipt, AlertCircle, Plane, Car, MapPin, Shield, Users } from "lucide-react";
import serviceInterpreter from "@/assets/service-interpreter.jpg";
import serviceRealestate from "@/assets/service-realestate.jpg";
import serviceTaxes from "@/assets/service-taxes.jpg";
import serviceFines from "@/assets/service-fines.jpg";
import serviceTravel from "@/assets/service-travel.jpg";
import serviceCar from "@/assets/service-car.jpg";

const PHONE_NUMBER = "+1 (555) 123-4567";
const WHATSAPP_LINK = "https://wa.me/15551234567";

const servicesData: Record<string, { 
  title: string; 
  description: string; 
  features: string[]; 
  icon: typeof Languages;
  image: string;
  highlight?: string;
  stats?: { label: string; value: string }[];
}> = {
  interpreter: {
    title: "თარჯიმნის მომსახურება",
    description: "პროფესიონალური თარგმანი ნებისმიერ დაწესებულებაში. ჩვენი გამოცდილი თარჯიმნები დაგეხმარებიან სამედიცინო, იურიდიულ, საბანკო და სხვა სფეროებში.",
    icon: Languages,
    image: serviceInterpreter,
    highlight: "ყველაზე პოპულარული",
    stats: [
      { label: "კმაყოფილი კლიენტი", value: "5000+" },
      { label: "წლის გამოცდილება", value: "10+" },
    ],
    features: [
      "სამედიცინო თარგმანი - ექიმებთან, საავადმყოფოებში",
      "იურიდიული თარგმანი - სასამართლო, იმიგრაცია",
      "საბანკო და ფინანსური საკითხები",
      "უძრავი ქონების ტრანზაქციები",
      "24/7 ხელმისაწვდომობა",
    ],
  },
  "real-estate": {
    title: "უძრავი ქონების აგენტი",
    description: "დაგეხმარებით სახლის ან ბინის ყიდვაში და გაქირავებაში საუკეთესო პირობებით. ჩვენი აგენტები კარგად იცნობენ ბაზარს.",
    icon: Home,
    image: serviceRealestate,
    highlight: "რეკომენდირებული",
    stats: [
      { label: "გარიგება", value: "1000+" },
      { label: "დაზოგილი $", value: "2M+" },
    ],
    features: [
      "სახლისა და ბინის შერჩევა თქვენი ბიუჯეტით",
      "გაქირავების საკითხებში დახმარება",
      "ხელშეკრულებების შედგენა და თარგმნა",
      "მოლაპარაკება ფასზე",
      "პროცესის სრული თანხლება",
    ],
  },
  taxes: {
    title: "ტაქსების გადახდა",
    description: "სწრაფი და მარტივი ტაქსების მომსახურება. დაგეხმარებით Tax Return-ში და სხვა საგადასახადო საკითხებში.",
    icon: Receipt,
    image: serviceTaxes,
    highlight: "Tax Season",
    stats: [
      { label: "დაბრუნებული თანხა", value: "$5M+" },
      { label: "დეკლარაცია", value: "3000+" },
    ],
    features: [
      "Tax Return მომზადება და წარდგენა",
      "ITIN ნომრის მიღება",
      "W2 და 1099 ფორმების დამუშავება",
      "დაბრუნების მაქსიმალური თანხა",
      "წლიური საგადასახადო კონსულტაცია",
    ],
  },
  fines: {
    title: "ჯარიმების გადახდა / გასაჩივრება",
    description: "პროფესიონალური დახმარება საგზაო ჯარიმების და ტოლების საკითხებში.",
    icon: AlertCircle,
    image: serviceFines,
    features: [
      "ჯარიმების გადახდა",
      "ტოლების მოგვარება",
      "გასაჩივრება სასამართლოში",
      "მართვის მოწმობის ქულების აღდგენა",
    ],
  },
  tickets: {
    title: "ავია და სხვა ბილეთები",
    description: "ავიაბილეთების დაჯავშნა საუკეთესო ფასად ნებისმიერი მიმართულებით.",
    icon: Plane,
    image: serviceTravel,
    features: [
      "ავიაბილეთების შერჩევა და დაჯავშნა",
      "საუკეთესო ფასების გარანტია",
      "ნებისმიერი მიმართულება",
      "ჯგუფური მგზავრობა",
    ],
  },
  "car-service": {
    title: "ავტომობილით მომსახურება",
    description: "სატრანსპორტო მომსახურება აეროპორტიდან და ნებისმიერ მარშრუტზე.",
    icon: Car,
    image: serviceCar,
    features: [
      "აეროპორტის ტრანსფერი",
      "ქალაქთაშორისი გადაყვანა",
      "ღონისძიებებზე მომსახურება",
      "კომფორტული და უსაფრთხო მანქანები",
    ],
  },
  travel: {
    title: "მოგზაურობა",
    description: "ტურისტული პაკეტები და მოგზაურობის სრული დაგეგმვა.",
    icon: MapPin,
    image: serviceTravel,
    features: [
      "ტურისტული პაკეტები",
      "ვიზების მიღება",
      "სასტუმროების დაჯავშნა",
      "მოგზაურობის დაგეგმვა",
    ],
  },
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = serviceId ? servicesData[serviceId] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[120px] container py-10 px-4 text-center">
          <h1 className="text-xl font-bold">სერვისი ვერ მოიძებნა</h1>
        </main>
        <Footer />
        <StickyContactBar />
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-[88px]">
        {/* Hero with image */}
        <div className="relative h-[200px] md:h-[260px] overflow-hidden">
          <img 
            src={service.image} 
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70" />
          <div className="container relative h-full flex flex-col justify-center px-4">
            <Link to="/services" className="inline-flex items-center gap-1 text-primary-foreground/80 text-sm mb-3 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              ყველა სერვისი
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                <Icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-primary-foreground">{service.title}</h1>
                {service.highlight && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                    {service.highlight}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container py-6 px-4 pb-24 lg:pb-8">
          {/* Stats cards if available */}
          {service.stats && (
            <div className="grid grid-cols-2 gap-3 -mt-10 mb-6 relative z-10">
              {service.stats.map((stat, index) => (
                <div key={index} className="bg-card rounded-xl p-4 text-center shadow-lg border border-border">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

          {/* Call buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
              className="flex-1 cta-button-large flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone className="w-5 h-5" />
              დარეკეთ ახლავე
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-whatsapp text-white rounded-lg font-semibold shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Visual service image */}
          <div className="rounded-2xl overflow-hidden mb-6 shadow-md">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full aspect-video object-cover"
            />
          </div>

          {/* Features */}
          <div className="bg-card rounded-2xl p-5 border border-border mb-6 shadow-sm">
            <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              რას მოიცავს:
            </h2>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust indicators */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-5 border border-primary/20 mb-6">
            <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              რატომ ჩვენ?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, text: "სანდო და პროფესიონალი" },
                { icon: Users, text: "10,000+ კლიენტი" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-card rounded-xl">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-secondary rounded-2xl p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img src={service.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <h3 className="text-lg font-bold text-secondary-foreground mb-2">
                გაქვთ კითხვები?
              </h3>
              <p className="text-secondary-foreground/80 text-sm mb-4">
                დაგვირეკეთ და მიიღეთ უფასო კონსულტაცია
              </p>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="cta-button inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <StickyContactBar />
    </div>
  );
};

export default ServiceDetail;
