import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Smartphone, Globe } from 'lucide-react';
import { useProjects } from '@/lib/projectsStore';
import { trackProjectView } from '@/lib/analytics';

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

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [, setLocation] = useLocation();
  const { projects, loading } = useProjects();
  const project = projects.find(p => p.id === params.id);
  useEffect(() => { if (project) trackProjectView(project.id); }, [project?.id]);

  if (!project && loading) return <div className="min-h-screen bg-background" />;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground font-mono">
        <p className="text-6xl text-muted-foreground mb-6">404</p>
        <p className="text-xl mb-8">Project not found</p>
        <button
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 text-cyan hover:underline"
        >
          <ArrowLeft size={16} /> Back to portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero image */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-violet/10" />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <button
            onClick={() => setLocation('/')}
            data-testid="btn-back"
            className="flex items-center gap-2 text-sm font-mono text-foreground/80 hover:text-cyan transition-colors glass-panel px-4 py-2 rounded-lg border border-border"
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl pb-24 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Type + framework badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.type === 'mobile' && (
              <span className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border bg-emerald-500/10 border-emerald-400/30 text-emerald-400">
                <Smartphone size={11} /> Mobile App
              </span>
            )}
            {project.type === 'web' && (
              <span className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border bg-cyan/10 border-cyan/30 text-cyan">
                <Globe size={11} /> Web App
              </span>
            )}
            <span className={`text-xs font-mono px-3 py-1.5 rounded-full border ${fwColors[project.primaryFramework] ?? 'bg-secondary/50 border-border text-muted-foreground'}`}>
              {project.primaryFramework}
            </span>
            {project.status && (
              <span className="text-xs font-mono px-3 py-1.5 rounded-full border bg-cyan/5 border-cyan/20 text-cyan">
                {project.status}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-foreground mb-2">{project.title}</h1>
          <p className="text-xl text-cyan font-mono mb-8">{project.short}</p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-detail-live"
                className="flex items-center gap-2 px-6 py-3 bg-cyan text-background font-mono font-bold rounded hover:bg-cyan/90 transition-all text-sm"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-detail-repo"
                className="flex items-center gap-2 px-6 py-3 glass-panel border border-border text-foreground font-mono rounded hover:border-cyan/40 hover:text-cyan transition-all text-sm"
              >
                <Github size={15} /> Source Code
              </a>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Description */}
            <div className="md:col-span-2">
              <h2 className="text-sm font-mono text-cyan mb-4 tracking-widest">// about this project</h2>
              <div className="glass-panel rounded-xl p-6 border border-border">
                <p className="text-secondary-foreground leading-relaxed whitespace-pre-line">
                  {project.fullDescription || project.description}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech stack */}
              <div>
                <h2 className="text-sm font-mono text-cyan mb-4 tracking-widest">// tech stack</h2>
                <div className="glass-panel rounded-xl p-5 border border-border">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs font-mono px-2.5 py-1 bg-violet/10 text-violet border border-violet/20 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <h2 className="text-sm font-mono text-cyan mb-4 tracking-widest">// details</h2>
                <div className="glass-panel rounded-xl p-5 border border-border space-y-3 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="text-foreground">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="text-foreground capitalize">{project.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Framework</span>
                    <span className="text-cyan">{project.primaryFramework}</span>
                  </div>
                  {project.live && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Live</span>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline truncate ml-2">View</a>
                    </div>
                  )}
                  {project.repo && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GitHub</span>
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline truncate ml-2">Repo</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
