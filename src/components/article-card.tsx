
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  image?: string;
  category?: string;
  className?: string;
}

export function ArticleCard({ title, image, category, className }: ArticleCardProps) {
  return (
    <div className={cn("rounded-lg overflow-hidden shadow-sm bg-white", className)}>
      <div 
        className={cn(
          "h-40 bg-rhythm-tertiary", 
          image ? "bg-cover bg-center" : ""
        )}
        style={image ? { backgroundImage: `url(${image})` } : {}}
      />
      <div className="p-4">
        {category && (
          <p className="text-xs text-rhythm-secondary font-medium mb-2">
            {category}
          </p>
        )}
        <h3 className="font-medium text-sm leading-tight">{title}</h3>
      </div>
    </div>
  );
}

export function ArticleSection({ title, children, seeAllLink }: { title: string, children: React.ReactNode, seeAllLink?: string }) {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        {seeAllLink && (
          <a href={seeAllLink} className="text-sm text-rhythm-primary">
            See all
          </a>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {children}
      </div>
    </section>
  );
}
