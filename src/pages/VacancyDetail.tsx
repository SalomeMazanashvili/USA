import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { Footer } from "@/components/layout/Footer";
import { Phone, MapPin, Clock, Briefcase, ArrowLeft, CheckCircle, DollarSign, Users, Shield, Star } from "lucide-react";
import vacanciesHero from "@/assets/vacancies-hero.jpg";
import serviceInterpreter from "@/assets/service-interpreter.jpg";
import { getVacancyById, relativeTime } from "@/lib/queries";

const PHONE_NUMBER = "+1 (555) 123-4567";
const WHATSAPP_LINK = "https://wa.me/15551234567";

const categories: Record<string, string> = {
  nanny: "ძიძა", caregiver: "მომვლელი", cleaning: "დალაგება",
  temporary: "დროებითი სამუშაოები", "cdl-driver": "CDL მძღოლი",
  dispatcher: "დისპეჩერი", auto: "ავტორემონტი", security: "დაცვა",
  construction: "მშენებლობა", education: "განათლება / სპორტი",
  factory: "ქარხნები", finance: "ფინანსები", beauty: "სტილისტი, სპა",
  office: "ოფისი", waiter: "მიმტანი / ბარმენი", other: "სხვადასხვა",
};

const VacancyDetail = () => {
  const { vacancyId } = useParams();
  const { data: vacancy, isLoading } = useQuery({
    queryKey: ["vacancy", vacancyId],
    queryFn: () => getVacancyById(vacancyId!),
    enabled: !!vacancyId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[88px]">
          <div className="h-[180px] md:h-[220px] bg-muted animate-pulse" />
          <div className="container py-6 px-4 space-y-4 -mt-10">
            <div className="grid grid-cols-2 gap-3">
              {[1,2].map(i => <div key={i} className="bg-card rounded-xl p-4 border border-border h-20 animate-pulse" />)}
            </div>
            <div className="bg-card rounded-xl p-5 border border-border h-32 animate-pulse" />
          </div>
        </main>
        <Footer />
        <StickyContactBar />
      </div>
    );
  }

  if (!vacancy) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[120px] container py-10 px-4 text-center">
          <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <h1 className="text-xl font-bold mb-2">ვაკანსია ვერ მოიძებნა</h1>
          <p className="text-muted-foreground mb-6">ეს ვაკანსია არ არსებობს ან წაშლილია</p>
          <Link to="/vacancies" className="cta-button inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            ყველა ვაკანსია
          </Link>
        </main>
        <Footer />
        <StickyContactBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-[88px]">
        <div className="relative h-[180px] md:h-[220px] overflow-hidden">
          <img src={vacanciesHero} alt="ვაკანსია" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70" />
          <div className="container relative h-full flex flex-col justify-center px-4">
            <Link to="/vacancies" className="inline-flex items-center gap-1 text-primary-foreground/80 text-sm mb-3 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              ყველა ვაკანსია
            </Link>
            <h1 className="text-xl md:text-2xl font-bold text-primary-foreground">{vacancy.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">{categories[vacancy.category] ?? vacancy.category}</span>
              <span className="text-sm text-primary-foreground/80">{vacancy.type}</span>
            </div>
          </div>
        </div>

        <div className="container py-6 px-4 pb-24 lg:pb-8">
          <div className="grid grid-cols-2 gap-3 -mt-10 mb-6 relative z-10">
            <div className="bg-card rounded-xl p-4 border border-border text-center shadow-lg">
              <MapPin className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">ლოკაცია</p>
              <p className="font-medium text-sm text-foreground">{vacancy.location}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center shadow-lg">
              <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">გამოქვეყნდა</p>
              <p className="font-medium text-sm text-foreground">{relativeTime(vacancy.publishedAt)}</p>
            </div>
          </div>

          {vacancy.salary && (
            <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-xl p-5 mb-6 border border-green-500/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ანაზღაურება</p>
                  <p className="text-2xl font-bold text-green-600">{vacancy.salary}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="flex-1 cta-button-large flex items-center justify-center gap-2 shadow-lg">
              <Phone className="w-5 h-5" />
              დარეკეთ ახლავე
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-whatsapp text-white rounded-lg font-semibold shadow-lg">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          <div className="rounded-xl overflow-hidden mb-6 shadow-md">
            <img src={serviceInterpreter} alt="სამუშაო გარემო" className="w-full aspect-video object-cover" />
          </div>

          <div className="bg-card rounded-xl p-5 border border-border mb-6 shadow-sm">
            <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              აღწერა
            </h2>
            <p className="text-muted-foreground leading-relaxed">{vacancy.description}</p>
          </div>

          {vacancy.requirements?.length > 0 && (
            <div className="bg-card rounded-xl p-5 border border-border mb-6 shadow-sm">
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                მოთხოვნები
              </h2>
              <ul className="space-y-3">
                {vacancy.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {vacancy.benefits?.length > 0 && (
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-5 border border-primary/20 mb-6">
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                რას გთავაზობთ
              </h2>
              <ul className="space-y-3">
                {vacancy.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[{ icon: Shield, text: "უფასო კონსულტაცია" }, { icon: Users, text: "სწრაფი დასაქმება" }].map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-card rounded-xl border border-border">
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-secondary rounded-xl p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img src={vacanciesHero} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <h3 className="text-lg font-bold text-secondary-foreground mb-2">დაინტერესდით?</h3>
              <p className="text-secondary-foreground/80 text-sm mb-4">დაგვირეკეთ და მიიღეთ დეტალური ინფორმაცია</p>
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="cta-button inline-flex items-center gap-2">
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

export default VacancyDetail;
