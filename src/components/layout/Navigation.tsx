import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { name: t('home_label'), path: "/" },
    { name: t('dashboard_label'), path: "/dashboard" },
    { name: t('how_it_works_label'), path: "/how-it-works" },
    { name: t('about_project_label'), path: "/about" },
    { name: t('our_team_label'), path: "/team" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-primary shadow-natural relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-primary-foreground">
              {t('footer_brand')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-accent"
                    : "text-primary-foreground hover:text-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="hero" size="sm" asChild>
              <Link to="/dashboard">{t('get_started')}</Link>
            </Button>
            {/* Language toggle: EN <-> KN */}
            <div className="flex items-center space-x-3">
              <div className={`text-sm font-medium ${language === 'en' ? 'text-accent' : 'text-primary-foreground'}`}>EN</div>
              <button
                aria-label="Toggle language"
                className={`relative inline-flex items-center h-7 w-14 rounded-full transition-colors ${
                  language === 'kn' ? 'bg-accent/30' : 'bg-primary/10'
                }`}
                onClick={() => toggleLanguage()}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                    language === 'kn' ? 'translate-x-7' : 'translate-x-0'
                  }`}
                  style={{ marginLeft: 2 }}
                />
              </button>
              <div className={`text-sm font-medium ${language === 'kn' ? 'text-accent' : 'text-primary-foreground'}`}>ಕನ್ನಡ</div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary-foreground hover:text-accent"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-primary border-t border-primary-light z-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? "text-accent bg-primary-dark"
                      : "text-primary-foreground hover:text-accent hover:bg-primary-light"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button variant="hero" size="sm" className="w-full" asChild>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    {t('get_started')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;