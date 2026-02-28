import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, ArrowLeft, Phone, Languages, Home, Receipt, Share2 } from "lucide-react";
import { getNewsById, formatDate } from "@/lib/queries";
import { urlFor } from "@/lib/imageUrl";
import newsCover from "@/assets/news-cover.jpg";

const PHONE_NUMBER = "+1 (555) 123-4567";

// Renders Sanity Portable Text blocks to match existing prose style
function renderBody(body: any[]) {
  if (!body?.length) return null;
  return body.map((block, i) => {
    if (block._type !== "block") {
      if (block._type === "image") {
        return (
          <div key={i} className="rounded-xl overflow-hidden mb-6">
            <img src={urlFor(block).width(800).url()} alt="" className="w-full h-auto" />
          </div>
        );
      }
      return null;
    }
    const text = block.children?.map((c: any) => c.text).join("") ?? "";
    switch (block.style) {
      case "h2": return <h2 key={i} className="text-xl font-bold mt-6 mb-3">{text}</h2>;
      case "h3": return <h3 key={i} className="text-lg font-bold mt-6 mb-3">{text}</h3>;
      case "blockquote": return <blockquote key={i} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">{text}</blockquote>;
      default: return <p key={i} className="text-lg leading-relaxed mb-4">{text}</p>;
    }
  });
}

const NewsDetail = () => {
  const { newsId } = useParams();
  const { data: news, isLoading } = useQuery({
    queryKey: ["news", newsId],
    queryFn: () => getNewsById(newsId!),
    enabled: !!newsId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[88px]">
          <div className="h-[200px] md:h-[300px] bg-muted animate-pulse" />
          <div className="container py-6 px-4 -mt-20 relative">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-lg animate-pulse space-y-4">
              <div className="h-6 bg-muted rounded w-1/3" />
              <div className="h-8 bg-muted rounded w-2/3" />
              <div className="space-y-2 mt-4">
                {[1,2,3,4].map(i => <div key={i} className="h-4 bg-muted rounded w-full" />)}
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <StickyContactBar />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[120px] container py-10 px-4 text-center">
          <h1 className="text-xl font-bold">სტატია ვერ მოიძებნა</h1>
          <Link to="/news" className="cta-button inline-flex items-center gap-2 mt-4">
            <ArrowLeft className="w-4 h-4" />
            უკან სიახლეებზე
          </Link>
        </main>
        <Footer />
        <StickyContactBar />
      </div>
    );
  }

  const imageUrl = news.mainImage
    ? urlFor(news.mainImage).width(1200).height(600).fit("crop").url()
    : newsCover;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-[88px]">
        <div className="relative h-[200px] md:h-[300px] overflow-hidden">
          <img src={imageUrl} alt={news.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container py-6 px-4 pb-24 lg:pb-8 -mt-20 relative">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-lg mb-6">
            <Link to="/news" className="inline-flex items-center gap-1 text-sm text-primary mb-4 hover:underline">
              <ArrowLeft className="w-4 h-4" />
              უკან სიახლეებზე
            </Link>

            <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full mb-3">
              {news.category}
            </span>

            <h1 className="text-2xl font-bold text-foreground mb-3">{news.title}</h1>

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {formatDate(news.publishedAt)}
              </span>
              <button
                onClick={() => navigator.share?.({ title: news.title, url: window.location.href })}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
                გაზიარება
              </button>
            </div>

            <div className="prose prose-sm max-w-none text-foreground mb-6">
              {news.body ? renderBody(news.body) : (
                <p className="text-lg leading-relaxed">{news.excerpt}</p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-muted/50 to-muted rounded-2xl p-5 border border-border">
            <h3 className="font-semibold text-foreground mb-4">ჩვენი სერვისები</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <Link to="/services/interpreter" className="flex flex-col items-center p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Languages className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs text-center font-medium">თარჯიმანი</span>
              </Link>
              <Link to="/services/real-estate" className="flex flex-col items-center p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs text-center font-medium">უძრავი ქონება</span>
              </Link>
              <Link to="/services/taxes" className="flex flex-col items-center p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Receipt className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs text-center font-medium">ტაქსები</span>
              </Link>
            </div>
            <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="w-full cta-button flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              დარეკეთ ახლავე
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <StickyContactBar />
    </div>
  );
};

export default NewsDetail;
