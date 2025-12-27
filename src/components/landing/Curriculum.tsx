import { motion } from 'framer-motion';
import { Clock, Target } from 'lucide-react';

export const Curriculum = () => {
  const sessions = [
    {
      number: '۱',
      title: 'تحقیق بازار و انتخاب نیچ',
      outcomes: [
        'ابزارهای AI برای تحقیق',
        'پیدا کردن مخاطب ایده‌آل',
        'تحلیل رقبا با هوش مصنوعی',
      ],
      output: 'نقشه راه شخصی‌شده',
    },
    {
      number: '۲',
      title: 'ساخت هویت برند شخصی',
      outcomes: [
        'طراحی لوگو با AI',
        'انتخاب پالت رنگی',
        'تعیین لحن برند',
      ],
      output: 'کیت برند کامل',
    },
    {
      number: '۳',
      title: 'تولید محتوا با هوش مصنوعی',
      outcomes: [
        'نوشتن با ChatGPT',
        'ساخت ویدیو با AI',
        'طراحی گرافیک خودکار',
      ],
      output: 'تقویم محتوایی ۳۰ روزه',
    },
    {
      number: '۴',
      title: 'ساخت محصول دیجیتال',
      outcomes: [
        'ایده‌پردازی محصول',
        'ساخت دوره آنلاین',
        'نوشتن ایبوک',
      ],
      output: 'اولین محصول دیجیتال',
    },
    {
      number: '۵',
      title: 'سیستم فروش اتوماتیک',
      outcomes: [
        'ساخت قیف فروش',
        'ایمیل مارکتینگ',
        'اتوماسیون با ابزارهای رایگان',
      ],
      output: 'سیستم فروش ۲۴/۷',
    },
    {
      number: '۶',
      title: 'مقیاس‌پذیری و رشد',
      outcomes: [
        'تبلیغات هوشمند',
        'همکاری و شبکه‌سازی',
        'منابع درآمد متعدد',
      ],
      output: 'برنامه رشد ۹۰ روزه',
    },
  ];

  return (
    <section id="courses" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-accent-blue" />
          <span className="text-muted-foreground text-sm font-vazir">برنامه آموزشی</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 font-vazir"
        >
          چی یاد می‌گیری؟
        </motion.h2>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session, index) => (
            <motion.div
              key={session.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6 hover:bg-card/30 transition-colors"
            >
              {/* Session Number */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-purple/20 mb-4">
                <span className="text-xl font-bold text-accent-purple font-vazir">
                  {session.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-4 font-vazir">{session.title}</h3>

              {/* Outcomes */}
              <ul className="space-y-2 mb-6">
                {session.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-center gap-2 text-muted-foreground font-vazir">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                    {outcome}
                  </li>
                ))}
              </ul>

              {/* Duration & Output */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/30">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={14} />
                  <span className="font-vazir">۹۰ دقیقه</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-accent-emerald">
                  <Target size={14} />
                  <span className="font-vazir">{session.output}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Format Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-muted-foreground font-vazir"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card">
            ۴۰٪ تئوری + ۶۰٪ کارگاه عملی
          </span>
        </motion.div>
      </div>
    </section>
  );
};
