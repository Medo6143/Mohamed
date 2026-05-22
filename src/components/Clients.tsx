import { motion } from 'framer-motion';

const INDUSTRIES = [
  { icon: '🏥', label: 'Healthcare', desc: 'Clinic & hospital platforms' },
  { icon: '🛍️', label: 'E-Commerce', desc: 'Online stores & payment' },
  { icon: '🏠', label: 'Real Estate', desc: 'Property listing systems' },
  { icon: '🎨', label: 'Design Agencies', desc: 'Portfolio & branding sites' },
  { icon: '🍽️', label: 'Food & Restaurants', desc: 'Menus, orders & reservations' },
  { icon: '📚', label: 'Education', desc: 'LMS & e-learning platforms' },
  { icon: '⚖️', label: 'Legal & Consulting', desc: 'Firm websites & portals' },
  { icon: '💪', label: 'Fitness', desc: 'Gym & wellness apps' },
  { icon: '💻', label: 'Tech Startups', desc: 'SaaS dashboards & tools' },
  { icon: '📣', label: 'Marketing', desc: 'AI tools & automation' },
];

const STATS = [
  { value: '10+', label: 'Clients Served' },
  { value: '15+', label: 'Projects Delivered' },
  { value: '3+', label: 'Years Experience' },
  { value: '100%', label: 'On-Time Delivery' },
];

export default function Clients() {
  return (
    <section className="py-24 relative bg-secondary/20 border-t border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-cyan font-mono text-sm mb-2 tracking-widest">// industries served</p>
          <h2 className="text-3xl md:text-4xl font-mono font-bold inline-block border-b-2 border-cyan pb-2">
            <span className="text-violet">#</span> Freelance Work
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed">
            Delivered production-grade solutions across multiple industries — from healthcare platforms to e-commerce stores and SaaS dashboards.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-panel border border-border/50 rounded-xl p-6 text-center hover:border-cyan/30 transition-colors"
            >
              <div className="text-3xl font-mono font-bold text-cyan mb-1">{s.value}</div>
              <div className="text-xs font-mono text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Industries grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="glass-panel border border-border/50 rounded-xl p-4 flex flex-col items-center text-center gap-2 hover:border-cyan/30 hover:scale-[1.03] transition-all duration-300 group"
            >
              <span className="text-2xl">{ind.icon}</span>
              <span className="text-xs font-mono font-bold text-foreground group-hover:text-cyan transition-colors">{ind.label}</span>
              <span className="text-[10px] font-mono text-muted-foreground leading-relaxed">{ind.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
