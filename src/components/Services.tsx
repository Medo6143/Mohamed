import { motion } from 'framer-motion';
import { Code2, Server, Layout, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Mail } from 'lucide-react';

const services = [
  {
    icon: <Code2 size={32} />,
    title: "Frontend Development",
    description: "Custom React / Next.js / Angular web apps with pixel-perfect UI, responsive layouts, and clean code.",
    whatsapp: "https://wa.me/201067333964?text=Hello%20I%20want%20to%20order%20a%20Frontend%20Development%20service",
    email: "mailto:mohamedwaeltorad@gmail.com?subject=Frontend%20Development%20Request"
  },
  {
    icon: <Server size={32} />,
    title: "Web Application",
    description: "Full-stack web applications with Firebase, Supabase, Node.js backend, and production-grade architecture.",
    whatsapp: "https://wa.me/201067333964?text=Hello%20I%20want%20to%20order%20a%20Web%20Application%20service",
    email: "mailto:mohamedwaeltorad@gmail.com?subject=Web%20Application%20Request"
  },
  {
    icon: <Layout size={32} />,
    title: "Portfolio / Landing Page",
    description: "High-converting landing pages and personal portfolios that leave a lasting impression.",
    whatsapp: "https://wa.me/201067333964?text=Hello%20I%20want%20to%20order%20a%20Portfolio%20/%20Landing%20Page%20service",
    email: "mailto:mohamedwaeltorad@gmail.com?subject=Portfolio%20Request"
  },
  {
    icon: <Sparkles size={32} />,
    title: "UI/UX Enhancement",
    description: "Transform existing apps with better UX, modern design systems, and performance optimization.",
    whatsapp: "https://wa.me/201067333964?text=Hello%20I%20want%20to%20order%20a%20UI/UX%20Enhancement%20service",
    email: "mailto:mohamedwaeltorad@gmail.com?subject=UI/UX%20Enhancement%20Request"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative bg-background border-t border-border/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-16 inline-block border-b-2 border-cyan pb-2">
            <span className="text-violet">#</span> Services
          </h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-8 rounded-xl flex flex-col h-full hover:border-cyan/40 transition-colors"
              >
                <div className="text-cyan mb-6 bg-cyan/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
                <p className="text-secondary-foreground mb-8 flex-grow">
                  {service.description}
                </p>
                
                <div className="flex gap-4 mt-auto">
                  <a 
                    href={service.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-lg transition-colors font-medium text-sm"
                  >
                    <FaWhatsapp size={18} /> WhatsApp
                  </a>
                  <a 
                    href={service.email}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 glass-panel text-foreground hover:bg-white/5 rounded-lg transition-colors font-medium text-sm"
                  >
                    <Mail size={18} /> Email
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}