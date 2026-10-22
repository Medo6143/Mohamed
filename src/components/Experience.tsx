import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Tharwah",
    period: "Sep 2026 – Present",
    type: "Remote",
    quote: "Building full-stack products for the Saudi market.",
    bullets: [
      "Full-stack development on Tharwah's products for the Saudi market",
      "Working remotely with the engineering team across frontend and backend",
    ],
    tags: [],
  },
  {
    role: "Full-Stack Developer",
    company: "Kowa",
    period: "Jun 2026 – Oct 2026",
    type: "On-site",
    quote: "Full-stack delivery for a company serving the Saudi market.",
    bullets: [
      "Full-stack development on products for the Saudi market",
      "Worked on-site with the team across frontend and backend",
    ],
    tags: [],
  },
  {
    role: "Frontend Engineer",
    company: "Huma-volove",
    period: "Jan 2025 – Jan 2026",
    type: "Full-Time",
    quote: "Where production systems met performance engineering.",
    bullets: [
      "Built responsive and scalable web applications using Next.js, React, and TypeScript",
      "Contributed to shared component library and design system evolution",
      "Implemented state management solutions and optimised bundle size",
      "Integrated RESTful APIs with robust authentication workflows",
      "Collaborated cross-functionally with design and product teams in async remote environment",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "REST API"],
  },
  {
    role: "Freelance Frontend Developer",
    company: "Self-Employed",
    period: "2024 – Present",
    type: "Freelance",
    quote: "Shipping production-grade frontends for clients across time zones.",
    bullets: [
      "Delivered end-to-end frontend applications for clients across SaaS, e-commerce, and marketing",
      "Managed projects asynchronously with clients globally, from design spec to Vercel deployment",
      "Built reusable component systems and optimised Core Web Vitals across client projects",
      "Maintained clear written communication throughout every build cycle",
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "Vercel", "Firebase"],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "CodVeda",
    period: "Sep 2025 – Nov 2025",
    type: "Remote Internship",
    quote: "Where I turned ideas into real-world applications.",
    bullets: [
      "Developed Weather App, Data Management System, and Landing Page using React & Node.js",
      "Implemented CRUD operations with Firebase and clean REST API integrations",
      "Focused on API integration & scalability patterns",
      "Improved debugging workflows and team collaboration",
    ],
    tags: ["React", "Node.js", "Firebase", "MUI", "Express"],
  },
  {
    role: "Frontend Developer Intern — Team Lead",
    company: "DevWave",
    period: "Jun 2025 – Aug 2025",
    type: "Internship",
    quote: "Where I led a team and built scalable React systems.",
    bullets: [
      "Led development team during React internship",
      "Built full-stack Amazon Clone with Firebase Auth as Team Lead",
      "Divided tasks, tracked progress via Trello, and conducted code reviews",
      "Applied Git version control best practices across the team",
    ],
    tags: ["React", "Firebase", "Redux", "Git", "Trello"],
  },
];

const typeColors: Record<string, string> = {
  'Full-Time': 'bg-cyan/10 border-cyan/30 text-cyan',
  'Remote': 'bg-cyan/10 border-cyan/30 text-cyan',
  'On-site': 'bg-blue-500/10 border-blue-400/30 text-blue-400',
  'Freelance': 'bg-violet/10 border-violet/30 text-violet',
  'Remote Internship': 'bg-emerald-500/10 border-emerald-400/30 text-emerald-400',
  'Internship': 'bg-amber-500/10 border-amber-400/30 text-amber-400',
};

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative bg-secondary/20 border-t border-border/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan font-mono text-sm mb-2 tracking-widest">// career history</p>
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-16 inline-block border-b-2 border-cyan pb-2">
            <span className="text-violet">#</span> Experience
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-violet to-transparent" />

            <div className="space-y-10">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  data-testid={`experience-${exp.company.toLowerCase().replace(/\s+/g, '-')}`}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-6 w-10 h-10 rounded-full border-2 border-cyan bg-background flex items-center justify-center z-10 shadow-[0_0_12px_rgba(0,212,255,0.3)]">
                    <Briefcase size={14} className="text-cyan" />
                  </div>

                  <div className="glass-panel p-6 rounded-xl border border-border hover:border-cyan/30 transition-colors duration-300 group">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground font-mono">{exp.role}</h3>
                        <p className="text-violet font-mono font-medium mt-0.5">@ {exp.company}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${typeColors[exp.type]}`}>
                          {exp.type}
                        </span>
                        <span className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono">
                          <Calendar size={11} /> {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="border-l-2 border-cyan/40 pl-4 italic text-muted-foreground mb-5 text-sm">
                      "{exp.quote}"
                    </blockquote>

                    {/* Bullets */}
                    <ul className="space-y-2 mb-5">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="text-secondary-foreground text-sm flex items-start gap-2">
                          <span className="text-cyan mt-0.5 shrink-0">&gt;</span> {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-mono px-2 py-0.5 bg-cyan/10 text-cyan border border-cyan/20 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
