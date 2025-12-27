import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import problemSolutionBg from '@/assets/problem-solution-bg.jpg';

export const ProblemSolution = () => {
  const painPoints = [
    'نمی‌دانم از کجا شروع کنم',
    'محتواهای انگیزشی زیاد، آموزش عملی کم',
    'ابزارها گران و پیچیده هستند',
  ];

  return (
    <section 
      className="py-20 px-4 relative"
      style={{
        backgroundImage: `url(${problemSolutionBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="container mx-auto relative z-10">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 font-vazir"
        >
          چرا اکثر ایرانی‌ها موفق به کسب درآمد آنلاین نمی‌شوند؟
        </motion.h2>

        {/* Pain Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {painPoints.map((point, index) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-4 p-6 rounded-xl bg-background/50"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <X size={20} className="text-destructive" />
              </div>
              <span className="font-vazir text-lg">{point}</span>
            </motion.div>
          ))}
        </div>

        {/* Solution Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center p-8 rounded-2xl glass-effect max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle2 size={32} className="text-accent-emerald" />
            <span className="text-xl text-accent-emerald font-bold font-vazir">راه‌حل</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold font-vazir">
            سیستم ۶ جلسه‌ای عملی که بدون سرمایه شروع می‌کنید
          </p>
        </motion.div>
      </div>
    </section>
  );
};
