import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, ExternalLink, Award, BookOpen } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext'

const Team = () => {
  const teamMembers = [
    {
      name: "Ayush D Rao",
      role: "Project Lead & ML Engineer",
      image: "/placeholder.svg",
      description: "Specialized in machine learning algorithms and data preprocessing. Led the development of the XGBoost model for crop prediction.",
      descriptionKey: 'member_ayush_description',
      skills: ["Machine Learning", "Python", "Data Analysis", "XGBoost"],
      email: "ayush.rao@sdmit.in"
    },
    {
      name: "Chiranth SG", 
      role: "Backend Developer & Data Engineer",
      image: "/placeholder.svg",
      description: "Focused on API development and database management. Built the FastAPI backend and data pipeline infrastructure.",
      descriptionKey: 'member_chiranth_description',
      skills: ["FastAPI", "Database Design", "API Development", "Data Engineering"],
      email: "chiranth.sg@sdmit.in"
    },
    {
      name: "Yashwanth K",
      role: "Frontend Developer & UI/UX Designer", 
      image: "/placeholder.svg",
      description: "Designed and developed the user interface. Ensured the platform is accessible and user-friendly for farmers.",
      descriptionKey: 'member_yashwanthk_description',
      skills: ["React", "UI/UX Design", "Frontend Development", "User Research"],
      email: "yashwanth.k@sdmit.in"
    },
    {
      name: "Yashwanth T",
      role: "Research Analyst & Data Scientist",
      image: "/placeholder.svg", 
      description: "Conducted agricultural research and data analysis. Validated model performance and agricultural accuracy.",
      descriptionKey: 'member_yashwantht_description',
      skills: ["Research", "Data Science", "Statistical Analysis", "Agricultural Knowledge"],
      email: "yashwanth.t@sdmit.in"
    }
  ];

  const { t } = useLanguage()

  const guide = {
    name: "Mr. Prasad SR",
    title: "Assistant Professor",
    department: "Computer Science & Engineering",
    institution: "SDM Institute of Technology, Ujire",
    image: "/placeholder.svg",
    description: undefined,
    expertise: ["Machine Learning", "Agricultural Technology", "Research Supervision", "AI Applications"],
    achievements: [
      undefined,
      undefined,
      undefined,
      undefined
    ],
    email: "prasad.sr@sdmit.in"
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('team_title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('team_subtitle')}
          </p>
        </div>

        {/* Project Guide */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t('guide_title')}</h2>
          <Card className="max-w-4xl mx-auto shadow-warm">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <img 
                    src={guide.image} 
                    alt={guide.name}
                    className="w-40 h-40 rounded-full object-cover border-4 border-primary/10"
                  />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{guide.name}</h3>
                  <p className="text-lg text-primary font-semibold mb-1">{guide.title}</p>
                  <p className="text-muted-foreground mb-4">{guide.department}</p>
                  <p className="text-muted-foreground mb-6">{guide.institution}</p>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t('guide_description')}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold mb-3">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {guide.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Achievements</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {[t('guide_achievement_1'), t('guide_achievement_2'), t('guide_achievement_3'), t('guide_achievement_4')].map((achievement, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Award className="h-3 w-3 text-accent flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <a 
                      href={`mailto:${guide.email}`}
                      className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{guide.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t('student_developers_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="shadow-natural hover:shadow-warm transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/10"
                  />
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-4">{member.role}</p>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {t(member.descriptionKey ?? '') || member.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-sm">{t('specializations_title')}</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors text-sm"
                    >
                      <Mail className="h-4 w-4" />
                      {t('contact_label')}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Institution */}
        <div className="mb-20">
          <Card className="shadow-warm">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {t('institution_name')}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                    {t('institution_description')}
                  </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                      {t('visit_website')}
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                      {t('cs_department')}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acknowledgments */}
        <div className="hero-gradient rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">{t('acknowledgments_title')}</h2>
          <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
            {t('acknowledgments_para1')}
          </p>
          <p className="text-base opacity-80">
            {t('acknowledgments_para2')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;