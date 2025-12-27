import { motion } from 'framer-motion';
import { Check, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Pricing = () => {
  const plans = [
    {
      name: 'برنز',
      price: '۱.۵',
      unit: 'میلیون تومان',
      features: [
        'دسترسی به ۶ جلسه آموزشی',
        'فایل‌های تمرینی',
        'پشتیبانی ۳۰ روزه',
      ],
      highlighted: false,
    },
    {
      name: 'نقره‌ای',
      price: '۲',
      unit: 'میلیون تومان',
      features: [
        'همه‌چیز پکیج برنز',
        'جلسات پرسش و پاسخ زنده',
        'دسترسی به کامیونیتی خصوصی',
        'پشتیبانی ۶۰ روزه',
      ],
      highlighted: true,
      badge: 'پیشنهادی',
    },
    {
      name: 'طلایی',
      price: '۳.۵',
      unit: 'میلیون تومان',
      features: [
        'همه‌چیز پکیج نقره‌ای',
        'مشاوره ۱:۱ (۲ ساعت)',
        'گارانتی بازگشت وجه',
        'پشتیبانی نامحدود',
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 px-4 bg-card">
      <div className="container mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-accent-emerald" />
          <span className="text-muted-foreground text-sm font-vazir">پکیج‌های آموزشی</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 font-vazir"
        >
          یک سرمایه‌گذاری، تغییر مسیر شغلی
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-16 font-vazir"
        >
          پکیج مناسب خودت رو انتخاب کن
        </motion.p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-accent-purple/20 to-cta/20 border-2 border-cta/50'
                  : 'bg-background/50 border border-border/50'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cta text-cta-foreground text-sm font-vazir flex items-center gap-2">
                  <Crown size={14} />
                  {plan.badge}
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold mb-6 font-vazir">{plan.name}</h3>

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-black font-vazir">{plan.price}</span>
                <span className="text-muted-foreground font-vazir mr-2">{plan.unit}</span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check size={18} className="text-accent-emerald flex-shrink-0" />
                    <span className="text-muted-foreground font-vazir">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full font-vazir ${
                  plan.highlighted
                    ? 'bg-cta hover:bg-cta-hover text-cta-foreground'
                    : 'bg-background hover:bg-background/80 border border-border'
                }`}
                size="lg"
              >
                انتخاب پکیج
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
