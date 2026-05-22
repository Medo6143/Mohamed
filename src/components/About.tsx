import { motion } from 'framer-motion';
import { MapPin, Briefcase, Globe, Languages, Cpu } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 relative border-t border-border/50 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-10 inline-block border-b-2 border-cyan pb-2">
            <span className="text-violet">#</span> About Me
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6 text-lg text-secondary-foreground leading-relaxed">
              <p>
                I'm a passionate Frontend & Full-Stack Developer with 2+ years of experience building production-grade web applications and automation systems. My core expertise is in React, Next.js, and Angular ecosystems, with solid backend skills in Node.js, Firebase, Supabase, and PostgreSQL.
              </p>
              <p>
                I lead AxonDev/DevWave — a small dev team — and I'm deeply interested in AI-powered products, Arabic RTL design, and developer tooling. I also build AI automation workflows using n8n, integrating tools like Gmail, Notion, WhatsApp Cloud API, and OpenRouter into real-world pipelines.
              </p>
              <p>
                Currently seeking remote opportunities in Egypt, Gulf, and internationally.
              </p>
            </div>

            <div className="space-y-4">
              <div className="glass-panel p-6 rounded-lg">
                <h3 className="font-mono text-cyan mb-4 text-sm">&gt; quick_facts</h3>
                <ul className="space-y-4">
                  <FactItem icon={<MapPin size={18} />} text="Cairo, Egypt" />
                  <FactItem icon={<Briefcase size={18} />} text="2+ years experience" />
                  <FactItem icon={<Globe size={18} />} text="Remote / On-site / Hybrid" />
                  <FactItem icon={<Languages size={18} />} text="Arabic & English" />
                  <FactItem icon={<Cpu size={18} />} text="AI & Automation enthusiast" />
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-3 text-sm text-foreground">
      <span className="text-violet">{icon}</span>
      <span>{text}</span>
    </li>
  );
}