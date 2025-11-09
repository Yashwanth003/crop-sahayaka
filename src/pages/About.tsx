import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Target, 
  Lightbulb, 
  Users, 
  Award,
  Leaf,
  TrendingUp,
  BookOpen,
  Globe
} from "lucide-react";

const About = () => {
  const { t } = useLanguage()
  const objectives = [
    {
      icon: Target,
      title: t('objective1_title'),
      description: t('objective1_desc')
    },
    {
      icon: TrendingUp,
      title: t('objective2_title'), 
      description: t('objective2_desc')
    },
    {
      icon: Globe,
      title: t('objective3_title'),
      description: t('objective3_desc')
    },
    {
      icon: BookOpen,
      title: t('objective4_title'),
      description: t('objective4_desc')
    }
  ];

  const features = [
    {
      title: t('about_feature1_title'),
      description: t('about_feature1_desc')
    },
    {
      title: t('about_feature2_title'), 
      description: t('about_feature2_desc')
    },
    {
      title: t('about_feature3_title'),
      description: t('about_feature3_desc')
    },
    {
      title: t('about_feature4_title'),
      description: t('about_feature4_desc')
    }
  ];

  const impact = [
    { number: "29", label: t('impact1_label'), description: t('impact1_desc') },
    { number: "95%", label: t('impact2_label'), description: t('impact2_desc') },
    { number: "3+", label: t('impact3_label'), description: t('impact3_desc') },
    { number: "10+", label: t('impact4_label'), description: t('impact4_desc') }
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('about_title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about_subtitle')}
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-20">
          <Card className="shadow-warm">
            <CardContent className="p-12 text-center">
              <Lightbulb className="h-16 w-16 text-accent mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-6">{t('our_mission_title')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                {t('mission_description')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Project Objectives */}
        <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12">{t('project_objectives_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <Card key={index} className="shadow-natural hover:shadow-warm transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <objective.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{objective.title}</h3>
                      <p className="text-muted-foreground">{objective.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Project Impact */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t('project_impact_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {impact.map((item, index) => (
              <Card key={index} className="text-center shadow-natural">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">{item.number}</div>
                  <div className="text-lg font-semibold text-foreground mb-1">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t('key_features_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-natural">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Academic Context */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">{t('academic_excellence_title')}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                CropDiversify is a collaborative academic project developed at SDM Institute of Technology, Ujire. 
                This initiative represents the culmination of extensive research in machine learning, agricultural 
                science, and sustainable development.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-accent" />
                  <span>{t('academic_bullet1')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-accent" />
                  <span>{t('academic_bullet2')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className="h-5 w-5 text-accent" />
                  <span>{t('academic_bullet3')}</span>
                </div>
              </div>
            </div>
            
            <Card className="shadow-warm">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">{t('our_methodology_title')}</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• {t('methodology_bullet1')}</li>
                  <li>• {t('methodology_bullet2')}</li>
                  <li>• {t('methodology_bullet3')}</li>
                  <li>• {t('methodology_bullet4')}</li>
                  <li>• {t('methodology_bullet5')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Future Vision */}
        <div className="hero-gradient rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">{t('vision_title')}</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            {t('mission_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/dashboard" 
              className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent-light transition-colors"
            >
              {t('try_our_tool')}
            </a>
            <a 
              href="/team" 
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur text-white border border-white/20 font-semibold rounded-md hover:bg-white/20 transition-colors"
            >
              {t('meet_our_team')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;