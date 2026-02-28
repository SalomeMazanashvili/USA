import { useState, useEffect } from "react";
import { Phone, ChevronLeft, ChevronRight } from "lucide-react";
import heroInterpreter from "@/assets/hero-interpreter.jpg";
import heroRealestate from "@/assets/hero-realestate.jpg";

const PHONE_NUMBER = "+1 (555) 123-4567";

const slides = [
  {
    id: 1,
    title: "დაგვირეკეთ ნებისმიერი საკითხის მოსაგვარებლად",
    subtitle: "ჩვენ გვერდით ვართ 24/7",
    image: heroInterpreter,
  },
  {
    id: 2,
    title: "თარჯიმნის მომსახურება ყველა დაწესებულებაში",
    subtitle: "პროფესიონალური თარგმანი ნებისმიერ სფეროში",
    image: heroInterpreter,
  },
  {
    id: 3,
    title: "უძრავი ქონების ყიდვა და გაქირავება",
    subtitle: "საუკეთესო შეთავაზებები აშშ-ში",
    image: heroRealestate,
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative overflow-hidden">
      {/* Slides */}
      <div className="relative h-[260px] md:h-[340px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background image */}
            <img 
              src={slide.image} 
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/50" />
            
            <div className="container relative h-full flex flex-col justify-center px-4 py-6">
              <h1 className="text-xl md:text-3xl font-bold text-primary-foreground mb-2 text-balance max-w-lg animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-primary-foreground/80 text-sm md:text-base mb-4 max-w-md">
                {slide.subtitle}
              </p>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="cta-button-large inline-flex items-center gap-2 w-fit text-base"
              >
                <Phone className="w-5 h-5" />
                დარეკეთ ახლავე
              </a>
            </div>
          </div>
        ))}

        {/* Navigation arrows - desktop only */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm items-center justify-center text-primary-foreground hover:bg-background/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm items-center justify-center text-primary-foreground hover:bg-background/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-primary-foreground w-6" : "bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
