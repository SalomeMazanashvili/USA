import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, ArrowRight, Users } from "lucide-react";
import { getAllVacancies, relativeTime } from "@/lib/queries";

const categoryLabels: Record<string, string> = {
  nanny: "ძიძა", caregiver: "მომვლელი", cleaning: "დალაგება",
  temporary: "დროებითი", "cdl-driver": "CDL მძღოლი",
  dispatcher: "დისპეჩერი", auto: "ავტორემონტი", security: "დაცვა",
  construction: "მშენებლობა", education: "განათლება", factory: "ქარხნები",
  finance: "ფინანსები", beauty: "სტილისტი", office: "ოფისი",
  waiter: "მიმტანი", other: "სხვა",
};

export const VacanciesPreview = () => {
  const { data: vacancies = [] } = useQuery({
    queryKey: ["vacancies"],
    queryFn: getAllVacancies,
  });

  const preview = vacancies.slice(0, 3);

  return (
    <section className="py-6 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">ვაკანსიები</h2>
              <p className="text-xs text-muted-foreground">აქტიური სამუშაო შეთავაზებები</p>
            </div>
          </div>
          <Link to="/vacancies" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            ყველა <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {preview.map((vacancy) => (
            <Link
              key={vacancy._id}
              to={`/vacancies/${vacancy._id}`}
              className="block bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm mb-1">{vacancy.title}</h3>
                  <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded-full mb-2">
                    {categoryLabels[vacancy.category] ?? vacancy.category}
                  </span>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{vacancy.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{relativeTime(vacancy.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
