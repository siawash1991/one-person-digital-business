import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export const Guarantee = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-3xl glass-effect border-2 border-accent-emerald/30"
        >
          <div className="w-20 h-20 rounded-2xl bg-accent-emerald/20 flex items-center justify-center mx-auto mb-6">
            <Shield size={40} className="text-accent-emerald" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-vazir">
            ضمانت ۱۰۰٪ رضایت
          </h2>

          <p className="text-lg text-muted-foreground font-vazir leading-relaxed">
            اگر تا ۱۴ روز پس از خرید احساس کنید دوره برای شما مناسب نیست، 
            کل مبلغ را بدون هیچ سوالی پس می‌گیرید.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
