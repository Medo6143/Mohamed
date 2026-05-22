export default function Footer() {
  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground font-mono text-sm">
          © 2026 Mohamed Wael. Built with React.
        </p>
        
        <div className="flex items-center gap-6 text-sm font-mono text-muted-foreground">
          <a href="https://github.com/Medo6143" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/mohamed-wael-469744273/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}