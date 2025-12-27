import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-background.jpeg';

export const HeroSection = () => {
  const videoTopics = [
    'چطوری با AI محتوا تولید کنم؟',
    'اولین محصول دیجیتالم را چطور بسازم؟',
    'بازاریابی بدون بودجه',
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent-purple" />
          <span className="w-2 h-2 rounded-full bg-accent-blue" />
          <span className="text-muted-foreground text-sm font-vazir">آموزش تخصصی</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-center leading-tight mb-6 font-vazir"
        >
          <span className="block">بیزینس تک‌نفره</span>
          <span className="block text-gradient">دیجیتال</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-12 font-vazir"
        >
          راه‌اندازی کسب‌وکار آنلاین بدون سرمایه اولیه، تنها با هوش مصنوعی و مهارت‌های دیجیتال
        </motion.p>

        {/* Video Previews */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-4xl mx-auto mb-12"
        >
          {/* Video Topic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videoTopics.map((topic, index) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="glass-effect rounded-xl p-4 cursor-pointer hover:bg-card/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center group-hover:bg-accent-purple/30 transition-colors">
                    <Play size={16} className="text-accent-purple" />
                  </div>
                  <span className="text-sm font-vazir">{topic}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <Button size="lg" className="bg-cta hover:bg-cta-hover text-cta-foreground text-lg px-8 py-6 font-vazir pulse-glow">
            دریافت جلسه اول رایگان
          </Button>
          <p className="text-sm text-muted-foreground mt-3 font-vazir">
            بدون نیاز به کارت اعتباری
          </p>
        </motion.div>
      </div>
    </section>
  );
};
