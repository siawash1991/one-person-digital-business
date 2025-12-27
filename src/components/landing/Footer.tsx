import { Instagram, Youtube, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const LandingFooter = () => {
  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/siavashexperience', label: 'اینستاگرام' },
    { icon: Youtube, href: 'https://youtube.com', label: 'یوتیوب' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'لینکدین' },
  ];

  const quickLinks = [
    { label: 'شرایط و قوانین', href: '#' },
    { label: 'سیاست حفظ حریم خصوصی', href: '#' },
    { label: 'تماس با ما', href: '#contact' },
  ];

  return (
    <footer id="contact" className="py-16 px-4 border-t border-border/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Logo & Social */}
          <div>
            <h3 className="text-xl font-bold mb-2 font-vazir">سیاوش اکسپرینس</h3>
            <p className="text-muted-foreground mb-6 font-vazir">
              آموزش کسب‌وکار دیجیتال با هوش مصنوعی
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center hover:bg-card/50 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold mb-4 font-vazir">لینک‌های مهم</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors font-vazir"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="font-bold mb-4 font-vazir">از آخرین محتواها باخبر شو</h4>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="ایمیل شما"
                className="bg-background/50 border-border/50 font-vazir flex-1"
                dir="ltr"
              />
              <Button type="submit" size="icon" className="bg-cta hover:bg-cta-hover text-cta-foreground">
                <Send size={18} />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-sm font-vazir">
            © ۲۰۲۴ سیاوش اکسپرینس | تمامی حقوق محفوظ است
          </p>
        </div>
      </div>
    </footer>
  );
};
