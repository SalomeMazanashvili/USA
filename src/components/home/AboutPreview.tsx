import { Link } from "react-router-dom";
import { ArrowRight, Shield, Phone, MessageCircle, Users } from "lucide-react";

const PHONE_NUMBER = "+1 (555) 123-4567";

const trustPoints = [
  { icon: Users, text: "1000+ კმაყოფილი კლიენტი" },
  { icon: Shield, text: "გამოცდილება 10+ წელი" },
  { icon: MessageCircle, text: "24/7 მხარდაჭერა" },
];

export const AboutPreview = () => {
  return (
    <section className="py-6 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="container">
        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div 
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-sm"
              >
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">{point.text}</span>
              </div>
            );
          })}
        </div>

        {/* About card */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-md text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">
            ჩვენ ვართ თქვენთვის
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            ქართველი ემიგრანტების სანდო პარტნიორი ამერიკაში. გვესაუბრეთ და დავეხმარებით!
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
              className="cta-button inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              დარეკეთ ახლავე
            </a>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-background hover:bg-muted text-foreground font-medium transition-colors"
            >
              მეტი ჩვენს შესახებ
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
