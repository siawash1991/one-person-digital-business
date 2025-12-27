import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export const FreeSession = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agreed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-cta/10 via-accent-purple/10 to-accent-blue/10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden glass-effect group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/30 to-cta/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-cta/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={28} className="text-cta-foreground mr-[-2px]" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 glass-effect px-3 py-1.5 rounded-lg">
                  <span className="text-sm font-vazir">جلسه ۱: تحقیق بازار</span>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-vazir">
                جلسه اول را رایگان دریافت کنید
              </h2>
              <p className="text-muted-foreground mb-8 font-vazir">
                بدون هیچ تعهدی - فقط یادگیری
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background/50 border-border/50 text-right font-vazir"
                  required
                />
                <Input
                  type="email"
                  placeholder="ایمیل"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background/50 border-border/50 text-right font-vazir"
                  dir="ltr"
                  required
                />
                <Input
                  type="tel"
                  placeholder="شماره تماس (اختیاری)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background/50 border-border/50 text-right font-vazir"
                  dir="ltr"
                />

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="agree"
                    checked={formData.agreed}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreed: checked as boolean })}
                  />
                  <label htmlFor="agree" className="text-sm text-muted-foreground font-vazir cursor-pointer">
                    می‌خواهم جلسه اول را رایگان دریافت کنم
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-cta hover:bg-cta-hover text-cta-foreground font-vazir text-lg"
                >
                  دریافت رایگان
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield size={16} className="text-accent-emerald" />
                  <span className="font-vazir">اطلاعات شما محفوظ است</span>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
