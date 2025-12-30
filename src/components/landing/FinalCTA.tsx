import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FinalCTA = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-accent-purple/20 via-cta/10 to-accent-blue/20">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-vazir"
        >
          آماده‌ای بیزینس خودت را شروع کنی؟
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground mb-12 font-vazir"
        >
          با هزاران نفر که این سفر را شروع کرده‌اند بپیوند
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/auth">
            <Button
              size="lg"
              className="bg-cta hover:bg-cta-hover text-cta-foreground text-xl px-12 py-8 font-vazir pulse-glow group"
            >
              همین الان شروع کن
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
