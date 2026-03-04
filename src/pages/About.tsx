import { Header } from "@/components/layout/Header";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { Footer } from "@/components/layout/Footer";
import { Phone, MessageCircle, Users, Award, Clock, Heart, Shield, CheckCircle } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";
import heroInterpreter from "@/assets/hero-interpreter.jpg";

const PHONE_NUMBER = "+1 (555) 123-4567";
const WHATSAPP_LINK = "https://wa.me/15551234567";

const stats = [
  { icon: Users, value: "10,000+", label: "კლიენტი" },
  { icon: Award, value: "10+", label: "წლის გამოცდილება" },
  { icon: Clock, value: "24/7", label: "ხელმისაწვდომობა" },
  { icon: Heart, value: "100%", label: "კმაყოფილება" },
];

const teamMembers = [
  { name: "ლუკა გვაზავა", role: "დამფუძნებელი", description: "წლები ემიგრანტების დახმარებაში"},
  { name: "თათია წულაძე", role: "თარჯიმანი", description: "სამედიცინო და იურიდიული თარგმანი" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-[88px]">
        {/* Hero with team image */}
        <div className="relative h-[200px] md:h-[260px] overflow-hidden">
          <img 
            src={aboutTeam} 
            alt="ჩვენი გუნდი" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70" />
          <div className="container relative h-full flex flex-col justify-center px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
              ჩვენ შესახებ
            </h1>
            <p className="text-primary-foreground/80 text-sm md:text-base max-w-md">
              ქართველი ემიგრანტების სანდო პარტნიორი ამერიკაში
            </p>
          </div>
        </div>

        <div className="container py-6 px-4 pb-24 lg:pb-8">
          {/* Stats - visual grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 -mt-12 relative z-10">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-card rounded-xl p-4 text-center shadow-lg border border-border">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Mission with image */}
          <div className="bg-card rounded-2xl overflow-hidden border border-border mb-6 shadow-md">
            <div className="aspect-video md:aspect-[3/1] relative">
              <img 
                src={heroInterpreter} 
                alt="ჩვენი მისია" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>
            <div className="p-5 -mt-16 relative">
              <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                ჩვენი მისია
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                ამერიკაში საცხოვრებლად 2022 წელს ჩამოვედით და ჩვენც, ისევე, როგორც ყველა
                ემიგრანტს, უამრავი სირთულე შეგვხვდა გზად. თავიდან, როცა ამ ქვეყნის
                თავისებურებების გაცნობიერებისა და განსხვავებული ცხოვრების სტილთან შეგუების
                ეტაპზე ვიყავით, უამრავი დროისა და რესურსის დახარჯვა გვიწევდა, რომ თუნდაც
                ეათედი ნაბიჯით წავსულიყავით წინ, ან რაიმეს მოგვარება მოგვეხერხებინა. იყო
                მომენტები, როდესაც ოფისიდან ოფისში, სატელეფონო ზარიდან სატელეფონო ზარზე
                გადავდიოდით, უამრავი დეტალის გარკვევა გვჭირდებოდა და მაინც ერთ წრეზე
                ვტრიალებდით. თუმცა, დროის გასვლამ და გამოცდილების დაგროვებამ შემდგომში
                არამხოლოდ ჩვენი პრობლემების მოგვარების, არამედ იმის შესაძლებლობა მოგვცა,
                ემიგრაციის რთული ყოველდღიურობა შევუმსუბუქოთ იმ ემიგრანტებს, რომლებიც ამ
                გზას ახლა გადიან, ან რომლებსაც სხვადასხვა საკითხში სჭირდებათ დახმარება.
                ეს ვებგვერდი ჩვენთვის მხოლოდ რიგითი ბიზნესი არაა. ესაა პროექტი, რომლის იდეაც
                სამი წლის წინ გაჩნდა და მას შემდეგ ხან აქტიურ, ხან პასიურ, თუმცა მუდმივი
                დამუშავების ფაზაში იყო, რომ მაქსიმალურად ყოფილიყო მორგებული არამხოლოდ
                ზოგად, არამედ პერსონალურ საჭიროებებსაც. დიდხანს ვიკვლიეთ, რა იყო
                მნიშვნელოვანი და ვეცადეთ, რომ თავი მოგვეყარა იმ ინფორმაციისთვის, რომელიც
                ყოველდღიურობაში ძალიან საჭიროა.
              </p>
            </div>
          </div>

          {/* Team members visual cards */}
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            ჩვენი გუნდი
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-primary">{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-foreground text-center mb-1">{member.name}</h3>
                <p className="text-primary text-sm text-center mb-2">{member.role}</p>
                <p className="text-muted-foreground text-xs text-center">{member.description}</p>
              </div>
            ))}
          </div>

          {/* Why trust us - with icons */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              რატომ ჩვენ?
            </h2>
            <ul className="space-y-4">
              {[
                "ვართ ქართულენოვანი - ზუსტად გვესმის თქვენი საჭიროებები",
                "სწრაფი და პროფესიონალური მომსახურება",
                "ხელმისაწვდომი ფასები",
               ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA with visual emphasis */}
          <div className="bg-secondary rounded-2xl p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img src={aboutTeam} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <h2 className="text-xl font-bold text-secondary-foreground mb-2">
                გაქვთ კითხვები?
              </h2>
              <p className="text-secondary-foreground/80 text-sm mb-5">
                დაგვიკავშირდით ნებისმიერ დროს - ჩვენ აქ ვართ თქვენთვის
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                  className="cta-button flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  დარეკეთ ახლავე
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-whatsapp text-white rounded-lg font-semibold"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <StickyContactBar />
    </div>
  );
};

export default About;
