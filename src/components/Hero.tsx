import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

import { FaWhatsapp } from 'react-icons/fa';

const PROFILE_KEY = 'mw_admin_profile';
function getCvUrl() {
  try { const r = localStorage.getItem(PROFILE_KEY); return r ? (JSON.parse(r).cvUrl || '/Mohamed_Wael_CV.pdf') : '/Mohamed_Wael_CV.pdf'; }
  catch { return '/Mohamed_Wael_CV.pdf'; }
}

const ROLES = [
  "Frontend Developer",
  "Full-Stack Engineer",
  "React & Angular Specialist",
  "AI Automation with n8n"
];

export default function Hero() {
  const [cvUrl] = useState(getCvUrl);
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentRole = ROLES[roleIndex];
      
      if (!isDeleting) {
        setRoleText(currentRole.substring(0, roleText.length + 1));
        if (roleText === currentRole) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setRoleText(currentRole.substring(0, roleText.length - 1));
        if (roleText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [roleText, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-dot-grid">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-cyan font-mono mb-4 flex items-center gap-2">
              <span className="text-violet">~</span> /welcome
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-foreground mb-6 tracking-tight">
              Mohamed Wael.
            </h1>
            <h2 className="text-2xl md:text-4xl font-mono text-secondary-foreground h-[40px] md:h-[50px] mb-6">
              &gt; <span className="text-cyan">{roleText}</span>
              <span className="animate-pulse">_</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              Building scalable web applications & intelligent automation systems from Cairo, Egypt — available for remote & on-site opportunities.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#projects"
                className="px-6 py-3 bg-cyan text-background font-bold font-mono rounded hover:bg-cyan/90 transition-colors"
              >
                [View My Work]
              </a>
              <a
                href="#contact"
                className="px-6 py-3 glass-panel text-foreground font-mono rounded hover:bg-white/5 transition-colors neon-border"
              >
                [Contact Me]
              </a>
              <a
                href={cvUrl}
                download="Mohamed_Wael_CV.pdf"
                data-testid="button-download-cv-hero"
                className="px-6 py-3 border border-border text-secondary-foreground font-mono rounded hover:text-foreground hover:border-cyan/50 transition-colors"
              >
                [Download CV]
              </a>
            </div>

            <div className="flex items-center gap-6">
              <SocialLink href="https://github.com/Medo6143" icon={<Github size={24} />} />
              <SocialLink href="https://www.linkedin.com/in/mohamed-wael-469744273/" icon={<Linkedin size={24} />} />
              <SocialLink href="mailto:mohamedwaeltorad@gmail.com" icon={<Mail size={24} />} />
              <SocialLink href="https://wa.me/201067333964" icon={<FaWhatsapp size={24} />} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-secondary-foreground hover:text-cyan transition-colors hover:scale-110 transform duration-200"
    >
      {icon}
    </a>
  );
}