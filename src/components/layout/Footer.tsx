import { Link } from "react-router-dom";
import { Sprout, Mail, MapPin, ExternalLink } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sprout className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold">{t('footer_brand')}</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              {t('footer_description')}
            </p>
            <div className="flex items-center space-x-2 text-sm text-primary-foreground/70">
              <MapPin className="h-4 w-4" />
              <span>{t('address_line')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quick_links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  {t('home_label')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  {t('dashboard_label')}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  {t('how_it_works_label')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  {t('about_project_label')}
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  {t('our_team_label')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('resources_title')}</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-primary-foreground/80 hover:text-accent transition-colors flex items-center gap-1"
                >
                  {t('research_paper')}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-primary-foreground/80 hover:text-accent transition-colors flex items-center gap-1"
                >
                  {t('api_documentation')}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="flex items-center space-x-2 text-primary-foreground/70">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{t('contact_email')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-light mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/70 text-sm">
            {t('copyright_line')}
          </p>
          <p className="text-primary-foreground/70 text-sm mt-2 md:mt-0">
            {t('built_for')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;