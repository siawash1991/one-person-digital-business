import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);

  const navItems = [
    { label: 'دوره‌ها', href: '#courses' },
    { label: 'روش آموزش', href: '#method' },
    { label: 'درباره مدرس', href: '#instructor' },
    { label: 'تماس', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-50 glass-navbar">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl font-bold text-foreground font-vazir">
            سیاوش اکسپرینس
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-vazir"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSoundOn(!isSoundOn)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={isSoundOn ? 'قطع صدا' : 'پخش صدا'}
            >
              {isSoundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            
            <Link to="/auth">
              <Button className="hidden md:inline-flex bg-cta hover:bg-cta-hover text-cta-foreground font-vazir">
                ثبت‌نام در دوره
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label={isMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            >
              {isMenuOpen ? <Menu size={24} /> : <X size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border/20 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors font-vazir"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link to="/auth">
                <Button className="bg-cta hover:bg-cta-hover text-cta-foreground font-vazir w-full">
                  ثبت‌نام در دوره
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
