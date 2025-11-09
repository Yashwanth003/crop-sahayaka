import { Card, CardContent } from "@/components/ui/card";
import { 
  Database, 
  Brain, 
  Target, 
  BarChart3, 
  Cpu, 
  TrendingUp,
  Leaf,
  Shield,
  CheckCircle
} from "lucide-react";

import { useLanguage } from '@/contexts/LanguageContext'

const HowItWorks = () => {
  const { t } = useLanguage()

  const steps = [
    {
      number: "01",
      icon: Database,
      title: t('step1_title'),
      description: t('step1_description'),
      features: [t('step1_feat1'), t('step1_feat2'), t('step1_feat3'), t('step1_feat4')]
    },
    {
      number: "02",
      icon: Brain,
      title: t('step2_title'),
      description: t('step2_description'),
      features: [t('step2_feat1'), t('step2_feat2'), t('step2_feat3'), t('step2_feat4')]
    },
    {
      number: "03",
      icon: Target,
      title: t('step3_title'),
      description: t('step3_description'),
      features: [t('step3_feat1'), t('step3_feat2'), t('step3_feat3'), t('step3_feat4')]
    }
  ];

  const benefits = [
    { icon: TrendingUp, title: t('benefit1_title'), description: t('benefit1_desc') },
    { icon: Leaf, title: t('benefit2_title'), description: t('benefit2_desc') },
    { icon: Shield, title: t('benefit3_title'), description: t('benefit3_desc') },
    { icon: BarChart3, title: t('benefit4_title'), description: t('benefit4_desc') }
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{t('how_title')}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('how_subtitle')}</p>
        </div>

        {/* Methodology Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t('our_methodology_title')}</h2>
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2">
                  <Card className="shadow-natural">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                          <step.icon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-primary">{t('step_label')} {step.number}</div>
                          <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
                      <ul className="space-y-2">
                        {step.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center">
                    <step.icon className="h-16 w-16 text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t('technology_stack_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center shadow-natural">
              <CardContent className="p-6">
                <Cpu className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{t('technology_card1_title')}</h3>
                <p className="text-sm text-muted-foreground">{t('technology_card1_desc')}</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-natural">
              <CardContent className="p-6">
                <Database className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{t('technology_card2_title')}</h3>
                <p className="text-sm text-muted-foreground">{t('technology_card2_desc')}</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-natural">
              <CardContent className="p-6">
                <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{t('technology_card3_title')}</h3>
                <p className="text-sm text-muted-foreground">{t('technology_card3_desc')}</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-natural">
              <CardContent className="p-6">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{t('technology_card4_title')}</h3>
                <p className="text-sm text-muted-foreground">{t('technology_card4_desc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t('benefits_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="shadow-natural">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center hero-gradient rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">{t('how_cta_title')}</h2>
          <p className="text-xl mb-6 opacity-90">{t('how_cta_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/dashboard" className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent-light transition-colors">{t('try_dashboard')}</a>
            <a href="/about" className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur text-white border border-white/20 font-semibold rounded-md hover:bg-white/20 transition-colors">{t('learn_more_about_project')}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;