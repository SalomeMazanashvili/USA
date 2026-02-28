import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Clock, Phone, Languages, Home, Receipt, Briefcase, Search, DollarSign, Users, Wrench, ShieldCheck, GraduationCap, Utensils } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import vacanciesHero from "@/assets/vacancies-hero.jpg";
import { getAllVacancies, relativeTime } from "@/lib/queries";

const categories = [
  { id: "all", label: "ყველა", icon: Briefcase },
  { id: "nanny", label: "ძიძა", icon: Users },
  { id: "caregiver", label: "მომვლელი", icon: Users },
  { id: "cleaning", label: "დალაგება", icon: Wrench },
  { id: "temporary", label: "დროებითი", icon: Clock },
  { id: "cdl-driver", label: "CDL მძღოლი", icon: Briefcase },
  { id: "dispatcher", label: "დისპეჩერი", icon: Briefcase },
  { id: "auto", label: "ავტორემონტი", icon: Wrench },
  { id: "security", label: "დაცვა", icon: ShieldCheck },
  { id: "construction", label: "მშენებლობა", icon: Wrench },
  { id: "education", label: "განათლება", icon: GraduationCap },
  { id: "factory", label: "ქარხნები", icon: Briefcase },
  { id: "finance", label: "ფინანსები", icon: DollarSign },
  { id: "beauty", label: "სტილისტი", icon: Users },
  { id: "office", label: "ოფისი", icon: Briefcase },
  { id: "waiter", label: "მიმტანი", icon: Utensils },
  { id: "other", label: "სხვა", icon: Briefcase },
];

const PHONE_NUMBER = "+1 (555) 123-4567";

const Vacancies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");

  const { data: vacancies = [], isLoading } = useQuery({
    queryKey: ["vacancies"],
    queryFn: getAllVacancies,
  });

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId === "all") setSearchParams({});
    else setSearchParams({ category: categoryId });
  };

  const filteredVacancies = activeCategory === "all"
    ? vacancies
    : vacancies.filter((v) => v.category === activeCategory);

  const getCategoryIcon = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.icon || Briefcase;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-[88px]">
        <div className="relative h-[120px] md:h-[140px] overflow-hidden">
          <img src={vacanciesHero} alt="სამუშაო გარემო" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70" />
          <div className="container relative h-full flex items-center px-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-primary-foreground">ვაკანსიები</h1>
                <p className="text-sm text-primary-foreground/80">იპოვე სამუშაო ახლავე</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-[88px] z-40 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
          <div className="container py-2 px-4">
            <div className="flex items-center gap-2 overflow-x-auto">
              <Link to="/services/interpreter" className="flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1.5 shrink-0 hover:bg-primary/20 transition-colors">
                <Languages className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary">თარჯიმანი</span>
              </Link>
              <Link to="/services/real-estate" className="flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1.5 shrink-0 hover:bg-primary/20 transition-colors">
                <Home className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary">უძრავი ქონება</span>
              </Link>
              <Link to="/services/taxes" className="flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1.5 shrink-0 hover:bg-primary/20 transition-colors">
                <Receipt className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary">ტაქსები</span>
              </Link>
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="cta-button flex items-center gap-1.5 shrink-0 text-xs py-1.5 px-3 ml-auto">
                <Phone className="w-3.5 h-3.5" />
                დარეკეთ
              </a>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 border-b border-border">
          <div className="container py-3 px-4">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">კატეგორიით ფილტრი:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center gap-1.5 ${activeCategory === cat.id ? "category-chip-active" : "category-chip-inactive"}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container py-6 px-4 pb-24 lg:pb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              ნაპოვნია <span className="font-semibold text-foreground">{filteredVacancies.length}</span> ვაკანსია
            </p>
          </div>

          {isLoading && (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-xl border border-border p-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-muted rounded w-1/2" />
                      <div className="h-4 bg-muted rounded w-1/3" />
                      <div className="h-3 bg-muted rounded w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && (
            <div className="space-y-4">
              {filteredVacancies.map((vacancy) => {
                const CategoryIcon = getCategoryIcon(vacancy.category);
                return (
                  <Link
                    key={vacancy._id}
                    to={`/vacancies/${vacancy._id}`}
                    className="block bg-card rounded-xl overflow-hidden border border-border shadow-md hover:shadow-lg hover:border-primary/30 transition-all group"
                  >
                    <div className="h-2 bg-gradient-to-r from-primary/20 to-primary/5" />
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 shadow-inner">
                          <CategoryIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{vacancy.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                              {categories.find((c) => c.id === vacancy.category)?.label}
                            </span>
                            {vacancy.salary && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-600 text-xs rounded-full font-medium">
                                <DollarSign className="w-3 h-3" />
                                {vacancy.salary}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{vacancy.description}</p>
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{vacancy.location}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{relativeTime(vacancy.publishedAt)}</span>
                            <span className="flex items-center gap-1 text-primary/80"><Briefcase className="w-3 h-3" />{vacancy.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {!isLoading && filteredVacancies.length === 0 && (
            <div className="text-center py-10 text-muted-foreground bg-muted/30 rounded-xl">
              <Briefcase className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
              <p>ამ კატეგორიაში ვაკანსიები არ მოიძებნა</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <StickyContactBar />
    </div>
  );
};

export default Vacancies;
