import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '⬡',
    color: 'cyan',
    description: 'React ecosystem, modern frameworks & pixel-perfect UI',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js 14', level: 92 },
      { name: 'Angular', level: 85 },
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript ES6+', level: 95 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Redux Toolkit', level: 88 },
      { name: 'RxJS', level: 75 },
      { name: 'HTML5', level: 98 },
      { name: 'CSS3 / SCSS', level: 93 },
      { name: 'React Native', level: 80 },
      { name: 'Framer Motion', level: 82 },
      { name: 'Material UI', level: 85 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & DB',
    icon: '⬡',
    color: 'violet',
    description: 'Server-side logic, databases & real-time systems',
    skills: [
      { name: 'Node.js', level: 78 },
      { name: 'Express.js', level: 76 },
      { name: 'Firebase', level: 88 },
      { name: 'Supabase', level: 80 },
      { name: 'PostgreSQL', level: 72 },
      { name: 'REST APIs', level: 92 },
      { name: 'Socket.io', level: 75 },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Automation',
    icon: '⬡',
    color: 'cyan',
    description: 'n8n pipelines, LLM APIs & intelligent workflow design',
    skills: [
      { name: 'n8n Workflows', level: 85 },
      { name: 'OpenRouter API', level: 82 },
      { name: 'Claude API', level: 80 },
      { name: 'Prompt Engineering', level: 85 },
      { name: 'WhatsApp Cloud API', level: 78 },
      { name: 'Gmail API', level: 75 },
      { name: 'Notion API', level: 75 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    icon: '⬡',
    color: 'violet',
    description: 'Dev workflow, build tools & deployment infrastructure',
    skills: [
      { name: 'Git / GitHub', level: 92 },
      { name: 'Vercel', level: 90 },
      { name: 'Netlify', level: 85 },
      { name: 'Vite', level: 88 },
      { name: 'Webpack', level: 75 },
      { name: 'Figma', level: 80 },
      { name: 'Postman', level: 85 },
      { name: 'Chrome Extensions (MV3)', level: 78 },
    ],
  },
];

const techLogos: Record<string, string> = {
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Next.js 14': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'JavaScript ES6+': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'Redux Toolkit': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS3 / SCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'Git / GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const active = skillCategories.find(c => c.id === activeCategory)!;

  return (
    <section id="skills" className="py-28 relative bg-secondary/10 border-t border-border/50 overflow-hidden">

      {/* Background hex decoration */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-cyan font-mono text-sm mb-2 tracking-widest">// technical proficiency</p>
          <h2 className="text-3xl md:text-4xl font-mono font-bold inline-block border-b-2 border-cyan pb-2">
            <span className="text-violet">#</span> Skills & Technologies
          </h2>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              data-testid={`skill-tab-${cat.id}`}
              className={`relative px-5 py-2.5 rounded-lg font-mono text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'border-cyan bg-cyan/10 text-cyan shadow-[0_0_20px_rgba(0,212,255,0.2)]'
                  : 'border-border text-muted-foreground hover:border-cyan/40 hover:text-foreground'
              }`}
            >
              {activeCategory === cat.id && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-lg bg-cyan/5"
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Main content area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-5 gap-8"
          >
            {/* Left: description + skill bars */}
            <div className="md:col-span-3 glass-panel rounded-2xl p-8 border border-border">
              <p className="text-sm font-mono text-cyan mb-1 tracking-widest">// {active.id}</p>
              <p className="text-secondary-foreground mb-8 text-sm leading-relaxed">{active.description}</p>

              <div className="space-y-5">
                {active.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    data-testid={`skill-bar-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        {techLogos[skill.name] && (
                          <img
                            src={techLogos[skill.name]}
                            alt={skill.name}
                            className="w-4 h-4 object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        )}
                        <span className="text-sm font-mono text-foreground">{skill.name}</span>
                      </div>
                      <span className="text-xs font-mono text-cyan">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: active.color === 'cyan'
                            ? 'linear-gradient(90deg, #00d4ff, #7c3aed)'
                            : 'linear-gradient(90deg, #7c3aed, #00d4ff)',
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.7, delay: i * 0.04, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: icon grid */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Technologies', value: active.skills.length + '+' },
                  { label: 'Avg Proficiency', value: Math.round(active.skills.reduce((a, s) => a + s.level, 0) / active.skills.length) + '%' },
                ].map((stat) => (
                  <div key={stat.label} className="glass-panel rounded-xl p-5 border border-border text-center">
                    <div className="text-3xl font-mono font-bold text-cyan mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Badge cloud */}
              <div className="glass-panel rounded-2xl p-6 border border-border flex-1">
                <p className="text-xs font-mono text-muted-foreground mb-4 tracking-widest">// stack</p>
                <div className="flex flex-wrap gap-2">
                  {active.skills.map((skill, i) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono border transition-all cursor-default ${
                        skill.level >= 85
                          ? 'bg-cyan/10 border-cyan/30 text-cyan'
                          : skill.level >= 75
                          ? 'bg-violet/10 border-violet/30 text-violet'
                          : 'bg-secondary/50 border-border text-muted-foreground'
                      }`}
                    >
                      {techLogos[skill.name] && (
                        <img
                          src={techLogos[skill.name]}
                          alt=""
                          className="w-3 h-3 object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      )}
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Proficiency legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-border/50"
        >
          <span className="text-xs font-mono text-muted-foreground">Proficiency:</span>
          {[
            { label: 'Expert (85%+)', color: 'bg-cyan/10 border-cyan/30 text-cyan' },
            { label: 'Advanced (75–84%)', color: 'bg-violet/10 border-violet/30 text-violet' },
            { label: 'Proficient (<75%)', color: 'bg-secondary/50 border-border text-muted-foreground' },
          ].map((item) => (
            <span key={item.label} className={`text-xs font-mono px-3 py-1 rounded border ${item.color}`}>
              {item.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
