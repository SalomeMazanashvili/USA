import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Newspaper, Calendar } from "lucide-react";
import heroInterpreter from "@/assets/hero-interpreter.jpg";
import { getAllNews, formatDate } from "@/lib/queries";
import { urlFor } from "@/lib/imageUrl";

export const NewsPreview = () => {
  const { data: news = [] } = useQuery({
    queryKey: ["news"],
    queryFn: getAllNews,
  });

  const preview = news.slice(0, 2);

  return (
    <section className="py-6 px-4 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">ახალი ამბები</h2>
              <p className="text-xs text-muted-foreground">სასარგებლო ინფორმაცია ემიგრანტებისთვის</p>
            </div>
          </div>
          <Link to="/news" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            ყველა <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preview.map((article) => (
            <Link
              key={article._id}
              to={`/news/${article._id}`}
              className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={article.mainImage ? urlFor(article.mainImage).width(600).height(340).fit("crop").url() : heroInterpreter}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {formatDate(article.publishedAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
