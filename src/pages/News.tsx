import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Newspaper, Phone } from "lucide-react";
import newsCover from "@/assets/news-cover.jpg";
import { getAllNews, formatDate } from "@/lib/queries";
import { urlFor } from "@/lib/imageUrl";

const PHONE_NUMBER = "+1 (555) 123-4567";

const News = () => {
  const { data: newsItems = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: getAllNews,
  });

  const featuredNews = newsItems.find((n) => n.featured);
  const regularNews = newsItems.filter((n) => !n.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-[88px]">
        <div className="relative h-[140px] md:h-[180px] overflow-hidden">
          <img src={newsCover} alt="ახალი ამბები" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70" />
          <div className="container relative h-full flex flex-col justify-center px-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">ახალი ამბები</h1>
                <p className="text-primary-foreground/80 text-sm">სასარგებლო ინფორმაცია ემიგრანტებისთვის</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-6 px-4 pb-24 lg:pb-8">
          {isLoading && (
            <div className="space-y-6 animate-pulse">
              <div className="aspect-[2.5/1] bg-muted rounded-2xl" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-border">
                    <div className="aspect-video bg-muted" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && featuredNews && (
            <Link to={`/news/${featuredNews._id}`} className="block bg-card rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-all mb-6 group">
              <div className="aspect-video md:aspect-[2.5/1] relative overflow-hidden">
                <img
                  src={featuredNews.mainImage ? urlFor(featuredNews.mainImage).width(1200).height(480).fit("crop").url() : newsCover}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full mb-2">{featuredNews.category}</span>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{featuredNews.title}</h2>
                  <p className="text-white/80 text-sm line-clamp-2 mb-2">{featuredNews.excerpt}</p>
                  <div className="flex items-center gap-1 text-white/60 text-xs">
                    <Calendar className="w-3 h-3" />
                    {formatDate(featuredNews.publishedAt)}
                  </div>
                </div>
              </div>
            </Link>
          )}

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 mb-6 border border-primary/20 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">გჭირდებათ კონსულტაცია?</p>
              <p className="text-muted-foreground text-xs">დაგვირეკეთ ნებისმიერ დროს</p>
            </div>
            <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="cta-button flex items-center gap-1.5 text-sm py-2 px-4">
              <Phone className="w-4 h-4" />
              დარეკეთ
            </a>
          </div>

          {!isLoading && regularNews.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-foreground mb-4">სხვა სტატიები</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regularNews.map((article) => (
                  <Link key={article._id} to={`/news/${article._id}`} className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all group">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={article.mainImage ? urlFor(article.mainImage).width(600).height(340).fit("crop").url() : newsCover}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 bg-card/90 text-foreground text-xs rounded-full">{article.category}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(article.publishedAt)}
                        </div>
                        <span className="text-xs text-primary font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          წაიკითხე <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {!isLoading && newsItems.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>სიახლეები მალე დაემატება</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <StickyContactBar />
    </div>
  );
};

export default News;
