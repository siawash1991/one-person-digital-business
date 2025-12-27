import { motion } from 'framer-motion';
import { Users, Youtube, Award } from 'lucide-react';

export const SocialProof = () => {
  const stats = [
    {
      icon: Users,
      value: '۶۶,۰۰۰+',
      label: 'فالوور در اینستاگرام',
    },
    {
      icon: Youtube,
      value: '۵۰۰+',
      label: 'دانشجوی یوتیوب',
    },
    {
      icon: Award,
      value: '۱۲',
      label: 'سال تجربه کارآفرینی دیجیتال',
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-accent-emerald" />
          <span className="text-muted-foreground text-sm font-vazir">اعتماد مخاطبان</span>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card mb-4">
                <stat.icon size={28} className="text-accent-purple" />
              </div>
              <div className="text-4xl font-black mb-2 font-vazir">{stat.value}</div>
              <div className="text-muted-foreground font-vazir">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
