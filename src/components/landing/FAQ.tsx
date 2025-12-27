import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const FAQ = () => {
  const faqs = [
    {
      question: 'این دوره برای چه کسانی مناسب است؟',
      answer: 'این دوره برای افرادی است که می‌خواهند یک کسب‌وکار دیجیتال تک‌نفره راه‌اندازی کنند. چه تازه‌کار باشید و چه تجربه قبلی داشته باشید، این دوره به شما کمک می‌کند تا با استفاده از هوش مصنوعی، کارآفرین دیجیتال شوید.',
    },
    {
      question: 'آیا نیاز به دانش فنی قبلی دارم؟',
      answer: 'خیر! این دوره از صفر شروع می‌شود و همه چیز را به زبان ساده توضیح می‌دهد. فقط کافیست با کامپیوتر و اینترنت آشنا باشید.',
    },
    {
      question: 'چه ابزارهایی نیاز دارم؟',
      answer: 'بیشتر ابزارهایی که در دوره معرفی می‌شوند رایگان هستند یا نسخه رایگان دارند. برای شروع فقط یک کامپیوتر و اتصال اینترنت نیاز دارید.',
    },
    {
      question: 'بعد از دوره چه پشتیبانی‌ای دارم؟',
      answer: 'بسته به پکیجی که انتخاب کنید، از ۳۰ روز تا پشتیبانی نامحدود خواهید داشت. همچنین دسترسی به کامیونیتی خصوصی دانشجویان نیز در پکیج‌های نقره‌ای و طلایی وجود دارد.',
    },
    {
      question: 'آیا می‌توانم قسطی پرداخت کنم؟',
      answer: 'بله! امکان پرداخت قسطی برای تمام پکیج‌ها وجود دارد. برای اطلاعات بیشتر با پشتیبانی تماس بگیرید.',
    },
    {
      question: 'مدت زمان دسترسی به محتوا چقدر است؟',
      answer: 'دسترسی شما به محتوای دوره نامحدود است. یعنی هر زمان که بخواهید می‌توانید جلسات را مرور کنید.',
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 font-vazir"
        >
          سوالات متداول
        </motion.h2>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-effect rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-right font-vazir hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-vazir pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
