
import { RhythmHeader } from "@/components/rhythm-header";
import { RhythmNav } from "@/components/rhythm-nav";
import { ArticleCard, ArticleSection } from "@/components/article-card";

const Content = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <RhythmHeader title="Content" />
      
      <main className="container px-4 pt-6 pb-20">
        <h1 className="text-2xl font-bold mb-6">Most read articles</h1>
        
        <div className="grid grid-cols-1 gap-4 mb-8">
          <ArticleCard 
            title="Understanding period poop: your menstrual cycle and bowel movements"
            category="Health"
            image="/placeholder.svg"
          />
          <ArticleCard 
            title="Female ejaculation and squirting: What's the difference?"
            category="Sexual Health"
            image="/placeholder.svg"
          />
        </div>
        
        <ArticleSection title="Sexual health" seeAllLink="/content/sexual-health">
          <ArticleCard 
            title="What is the clitoris? And where is it?"
            category="Sexual Health"
            image="/placeholder.svg"
          />
          <ArticleCard 
            title="5 things to know about sex drive"
            category="Sexual Health"
            image="/placeholder.svg"
          />
        </ArticleSection>
        
        <ArticleSection title="Period health" seeAllLink="/content/period-health">
          <ArticleCard 
            title="Why is my period late?"
            category="Period Health"
            image="/placeholder.svg"
          />
          <ArticleCard 
            title="Heavy periods: causes and treatments"
            category="Period Health"
            image="/placeholder.svg"
          />
        </ArticleSection>
        
        <ArticleSection title="Fertility" seeAllLink="/content/fertility">
          <ArticleCard 
            title="Ovulation signs to look for when trying to conceive"
            category="Fertility"
            image="/placeholder.svg"
          />
          <ArticleCard 
            title="Understanding your fertile window"
            category="Fertility"
            image="/placeholder.svg"
          />
        </ArticleSection>
      </main>
      
      <RhythmNav />
    </div>
  );
};

export default Content;
