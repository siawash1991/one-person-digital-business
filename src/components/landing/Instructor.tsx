import { motion } from 'framer-motion';
import { Instagram, Youtube, Linkedin, CheckCircle2 } from 'lucide-react';

export const Instructor = () => {
  const credentials = [
    '۶۶K فالوور اینستاگرام (@siavashexperience)',
    'کانال یوتیوب با محتوای AI و کارآفرینی',
    'تخصص در اتوماسیون و هوش مصنوعی',
    'طراح سیستم‌های درآمدزایی بدون سرمایه اولیه',
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/siavashexperience', label: 'اینستاگرام' },
    { icon: Youtube, href: 'https://youtube.com', label: 'یوتیوب' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'لینکدین' },
  ];

  return (
    <section id="instructor" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-accent-purple" />
          <span className="text-muted-foreground text-sm font-vazir">درباره مدرس</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 font-vazir"
        >
          سیاوش کیست؟
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass-effect">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/30 to-accent-blue/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 glass-effect px-4 py-2 rounded-xl">
              <span className="text-sm font-vazir">۱۲+ سال تجربه</span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground mb-8 font-vazir leading-relaxed">
              سیاوش یک کارآفرین دیجیتال با بیش از ۱۲ سال تجربه در حوزه کسب‌وکارهای آنلاین است. 
              او متخصص در استفاده از هوش مصنوعی برای اتوماسیون و مقیاس‌پذیری کسب‌وکار است و 
              به صدها نفر کمک کرده تا بیزینس تک‌نفره خود را راه‌اندازی کنند.
            </p>

            {/* Credentials */}
            <ul className="space-y-4 mb-8">
              {credentials.map((credential) => (
                <li key={credential} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-accent-emerald flex-shrink-0" />
                  <span className="font-vazir">{credential}</span>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center hover:bg-card/50 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
