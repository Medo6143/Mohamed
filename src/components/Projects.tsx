import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Smartphone, Star, ArrowRight } from 'lucide-react';
import { useProjects, type Project } from '@/lib/projectsStore';

const FRAMEWORKS = ['All', 'React', 'Next.js', 'Angular', 'React Native', 'TypeScript', 'Redux', 'Firebase', 'Expo', 'JavaScript'];

const fwColors: Record<string, string> = {
  'Next.js': 'bg-white/10 border-white/30 text-white',
  'React': 'bg-cyan/10 border-cyan/40 text-cyan',
  'Angular': 'bg-red-500/10 border-red-400/40 text-red-400',
  'React Native': 'bg-cyan/10 border-cyan/30 text-cyan',
  'TypeScript': 'bg-blue-500/10 border-blue-400/40 text-blue-400',
  'Redux': 'bg-violet/10 border-violet/40 text-violet',
  'Firebase': 'bg-amber-500/10 border-amber-400/40 text-amber-400',
  'Expo': 'bg-slate-500/10 border-slate-400/30 text-slate-400',
  'JavaScript': 'bg-yellow-500/10 border-yellow-400/40 text-yellow-400',
};

function FwBadge({ name }: { name: string }) {
  const cls = fwColors[name] ?? 'bg-secondary/50 border-border text-muted-foreground';
  return <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${cls}`}>{name}</span>;
}

function matchesFilter(project: Project, filter: string) {
  return filter === 'All' || project.frameworks.includes(filter);
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const { projects } = useProjects();
  const [, setLocation] = useLocation();

  const featured = projects.filter(p => p.featured && matchesFilter(p, filter));
  const others = projects.filter(p => !p.featured && matchesFilter(p, filter));
  const isEmpty = featured.length === 0 && others.length === 0;

  function goToProject(id: string) {
    setLocation(`/project/${id}`);
  }

  return (
    <section id="projects" className="py-28 relative bg-background border-t border-border/50">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-cyan font-mono text-sm mb-2 tracking-widest">// selected work</p>
          <h2 className="text-3xl md:text-4xl font-mono font-bold inline-block border-b-2 border-cyan pb-2">
            <span className="text-violet">#</span> Projects
          </h2>
        </motion.div>

        {/* Framework filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-muted-foreground mb-3 tracking-widest">// filter by framework</p>
          <div className="flex flex-wrap gap-2">
            {FRAMEWORKS.map((fw) => (
              <button
                key={fw}
                onClick={() => setFilter(fw)}
                data-testid={`filter-fw-${fw.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium border transition-all duration-200 ${
                  filter === fw
                    ? 'bg-cyan text-background border-cyan shadow-[0_0_14px_rgba(0,212,255,0.35)]'
                    : 'border-border text-muted-foreground hover:border-cyan/40 hover:text-foreground'
                }`}
              >
                {fw === 'All' ? '[ All ]' : fw}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bento grid — featured */}
        <AnimatePresence mode="wait">
          {featured.length > 0 && (
            <motion.div
              key={`bento-${filter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-16"
            >
              <BentoGrid projects={featured} onOpen={goToProject} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Other projects */}
        <AnimatePresence mode="wait">
          {others.length > 0 && (
            <motion.div
              key={`other-${filter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-xl font-mono font-bold text-foreground/70">
                  <span className="text-cyan">&gt;</span> More_Projects
                </h3>
                <div className="h-px flex-1 bg-border/50" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {others.map((project, i) => (
                  <SmallCard key={project.id} project={project} index={i} onClick={() => goToProject(project.id)} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {isEmpty && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 font-mono text-muted-foreground">
            <p className="text-5xl mb-4 opacity-20">{'{ }'}</p>
            <p className="text-sm mb-4">No projects match <span className="text-cyan">{filter}</span></p>
            <button onClick={() => setFilter('All')} className="text-xs text-cyan hover:underline">&gt; Show all</button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ─── Bento Grid ─────────────────────────────────────────── */

function BentoGrid({ projects, onOpen }: { projects: Project[]; onOpen: (id: string) => void }) {
  if (projects.length === 0) return null;
  const [first, ...rest] = projects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="md:col-span-8">
        <BigCard project={first} onClick={() => onOpen(first.id)} />
      </motion.div>
      {rest[0] && (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.07 }} className="md:col-span-4">
          <TallCard project={rest[0]} onClick={() => onOpen(rest[0].id)} />
        </motion.div>
      )}
      {rest.slice(1).map((project, i) => (
        <motion.div key={project.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }} className="md:col-span-4">
          <NormalCard project={project} onClick={() => onOpen(project.id)} />
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Big Card ───────────────────────────────────────────── */

function BigCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      data-testid={`project-big-${project.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      className="relative rounded-2xl overflow-hidden group h-full min-h-[340px] border border-border hover:border-cyan/50 transition-all duration-300 cursor-pointer"
      style={{ background: '#0d0d14' }}
    >
      <img src={project.image} alt={project.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-500 group-hover:scale-105 transform"
        loading="lazy" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d14]/60 via-transparent to-[#0d0d14]/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/40 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />

      {/* Hover arrow */}
      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <div className="w-8 h-8 rounded-full bg-cyan/20 border border-cyan/40 flex items-center justify-center">
          <ArrowRight size={13} className="text-cyan" />
        </div>
      </div>

      <div className="relative z-10 p-7 flex flex-col h-full min-h-[340px]">
        <div className="flex items-start justify-between gap-3 mb-auto">
          <div className="flex flex-wrap gap-1.5">
            <FwBadge name={project.primaryFramework} />
            {project.type === 'mobile' && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border bg-emerald-500/10 border-emerald-400/30 text-emerald-400 flex items-center gap-1">
                <Smartphone size={9} /> Mobile
              </span>
            )}
          </div>
          {project.status && (
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border bg-background/60 border-cyan/30 text-cyan backdrop-blur-sm whitespace-nowrap">
              {project.status}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3 mt-8">
          <Star size={12} className="text-cyan fill-cyan" />
          <span className="text-xs font-mono text-cyan tracking-widest uppercase">Featured</span>
        </div>

        <h3 className="text-3xl md:text-4xl font-mono font-bold text-foreground mb-1 leading-tight">{project.title}</h3>
        <p className="text-cyan font-mono text-sm mb-4">{project.short}</p>
        <p className="text-secondary-foreground text-sm leading-relaxed mb-5 max-w-xl line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map(t => (
            <span key={t} className="text-xs font-mono px-2 py-0.5 bg-violet/10 text-violet border border-violet/20 rounded">{t}</span>
          ))}
        </div>

        <div className="flex items-center gap-5" onClick={e => e.stopPropagation()}>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-mono text-cyan hover:text-cyan/80 transition-colors">
              <ExternalLink size={13} /> Live Demo
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
              <Github size={13} /> Source Code
            </a>
          )}
          {!project.live && !project.repo && (
            <span className="text-xs font-mono text-muted-foreground italic">~/source_code — coming soon</span>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─── Tall Card ──────────────────────────────────────────── */

function TallCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <article onClick={onClick} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onClick()}
      data-testid={`project-tall-${project.id}`}
      className="relative rounded-2xl overflow-hidden group h-full min-h-[340px] border border-border hover:border-cyan/50 transition-all duration-300 cursor-pointer"
      style={{ background: '#0d0d14' }}>
      <img src={project.image} alt={project.title}
        className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-105 transform"
        loading="lazy" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/50 to-[#0d0d14]/20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/60 to-transparent" />

      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <div className="w-7 h-7 rounded-full bg-violet/20 border border-violet/40 flex items-center justify-center">
          <ArrowRight size={11} className="text-violet" />
        </div>
      </div>

      <div className="relative z-10 p-6 flex flex-col h-full min-h-[340px]">
        <div className="flex flex-wrap gap-1.5 mb-auto">
          <FwBadge name={project.primaryFramework} />
          {project.type === 'mobile' && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border bg-emerald-500/10 border-emerald-400/30 text-emerald-400 flex items-center gap-1">
              <Smartphone size={9} /> Mobile
            </span>
          )}
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-mono font-bold text-foreground mb-1">{project.title}</h3>
          <p className="text-violet font-mono text-xs mb-3">{project.short}</p>
          <p className="text-secondary-foreground text-xs leading-relaxed mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 bg-violet/10 text-violet border border-violet/20 rounded">{t}</span>
            ))}
            {project.tech.length > 4 && <span className="text-[10px] font-mono px-1.5 py-0.5 text-muted-foreground">+{project.tech.length - 4}</span>}
          </div>
          <div className="flex items-center gap-4" onClick={e => e.stopPropagation()}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-mono text-cyan hover:underline">
                <ExternalLink size={11} /> Live
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
                <Github size={11} /> Repo
              </a>
            )}
            {!project.live && !project.repo && (
              <span className="text-[10px] font-mono text-muted-foreground italic">coming soon</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── Normal Card ────────────────────────────────────────── */

function NormalCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <article onClick={onClick} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onClick()}
      data-testid={`project-normal-${project.id}`}
      className="relative rounded-2xl overflow-hidden group h-56 border border-border hover:border-cyan/50 transition-all duration-300 cursor-pointer"
      style={{ background: '#0d0d14' }}>
      <img src={project.image} alt={project.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-500 group-hover:scale-105 transform"
        loading="lazy" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/60 to-[#0d0d14]/10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <div className="w-6 h-6 rounded-full bg-cyan/20 border border-cyan/40 flex items-center justify-center">
          <ArrowRight size={10} className="text-cyan" />
        </div>
      </div>

      <div className="relative z-10 p-5 flex flex-col h-full">
        <div className="flex flex-wrap gap-1.5 mb-auto"><FwBadge name={project.primaryFramework} /></div>
        <div>
          <h3 className="text-lg font-mono font-bold text-foreground mb-0.5">{project.title}</h3>
          <p className="text-muted-foreground font-mono text-[10px] mb-3">{project.short}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 bg-violet/10 text-violet border border-violet/20 rounded">{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] font-mono text-cyan hover:underline">
                <ExternalLink size={10} /> Live
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors">
                <Github size={10} /> Repo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── Small Card (others grid) ──────────────────────────── */

function SmallCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      data-testid={`card-other-${project.id}`}
      className="relative rounded-xl overflow-hidden border border-border hover:border-cyan/30 transition-all duration-200 group h-36 cursor-pointer"
      style={{ background: '#0d0d14' }}
    >
      <img src={project.image} alt={project.title}
        className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300"
        loading="lazy" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/70 to-transparent" />

      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-5 h-5 rounded-full bg-cyan/20 border border-cyan/40 flex items-center justify-center">
          <ArrowRight size={9} className="text-cyan" />
        </div>
      </div>

      <div className="relative z-10 p-4 flex flex-col h-full">
        <FwBadge name={project.primaryFramework} />
        <div className="mt-auto">
          <h4 className="text-sm font-bold font-mono text-foreground mb-1">{project.title}</h4>
          <div className="flex flex-wrap gap-1 mb-2">
            {project.tech.slice(0, 2).map(t => (
              <span key={t} className="text-[9px] font-mono text-muted-foreground">{t}</span>
            ))}
          </div>
          <div className="flex gap-3" onClick={e => e.stopPropagation()}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-cyan flex items-center gap-0.5 hover:underline">
                <ExternalLink size={9} /> Live
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-muted-foreground flex items-center gap-0.5 hover:text-foreground transition-colors">
                <Github size={9} /> Repo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
