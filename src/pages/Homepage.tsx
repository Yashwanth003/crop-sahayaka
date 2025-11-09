import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sprout, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Leaf, 
  Target,
  AlertTriangle,
  Brain,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";
import aiImage from "@/assets/ai-farming.jpg";
import cropsImage from "@/assets/diverse-crops.jpg";

import { useLanguage } from '@/contexts/LanguageContext'

const Homepage = () => {
  const { t } = useLanguage()
  const problems = [
    { icon: AlertTriangle, title: t('problem1_title'), description: t('problem1_desc') },
    { icon: Shield, title: t('problem2_title'), description: t('problem2_desc') },
    { icon: TrendingUp, title: t('problem3_title'), description: t('problem3_desc') }
  ];

  const features = [
    { icon: Brain, title: t('feature1_title'), description: t('feature1_desc') },
    { icon: TrendingUp, title: t('feature2_title'), description: t('feature2_desc') },
    { icon: Leaf, title: t('feature3_title'), description: t('feature3_desc') },
    { icon: Shield, title: t('feature4_title'), description: t('feature4_desc') }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t('hero_title_part1')}
            <span className="text-accent"> {t('hero_title_accent')}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero_subtitle')}
          </p>
          <Button variant="hero" size="lg" className="text-lg px-8 py-4" asChild>
            <Link to="/dashboard">
              {t('hero_cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t('problems_title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('problems_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <Card key={index} className="text-center hover:shadow-natural transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mb-6">
                    <problem.icon className="h-8 w-8 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{problem.title}</h3>
                  <p className="text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                {t('solution_title')}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {t('solution_subtitle')}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t('data_input_title')}</h3>
                    <p className="text-muted-foreground">{t('data_input_desc')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t('ai_analysis_title')}</h3>
                    <p className="text-muted-foreground">{t('ai_analysis_desc')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t('smart_recommendations_title')}</h3>
                    <p className="text-muted-foreground">{t('smart_recommendations_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={aiImage} 
                alt="AI-powered farming technology" 
                className="rounded-lg shadow-warm w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t('features_title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('features_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-natural transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('final_cta_title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('final_cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4" asChild>
              <Link to="/dashboard">
                {t('try_tool')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/how-it-works">{t('learn_how')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;