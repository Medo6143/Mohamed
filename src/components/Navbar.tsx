import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => scrollTo(e, '#home')}
            className="text-2xl font-mono font-bold text-cyan flex items-center gap-2"
          >
            MW<span className="text-violet animate-pulse">_</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 text-sm font-medium text-secondary-foreground">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="hover:text-cyan transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/201067333964"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-md bg-cyan/10 text-cyan border border-cyan/30 hover:bg-cyan/20 hover:border-cyan transition-all font-mono text-sm neon-border"
            >
              Hire Me
            </a>
          </nav>

          <button
            className="md:hidden text-foreground hover:text-cyan transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-8 text-xl font-mono text-foreground">
              {navLinks.map((link) => (
                <motion.li key={link.name} whileHover={{ scale: 1.1 }}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="hover:text-cyan transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <motion.li whileHover={{ scale: 1.05 }}>
                <a
                  href="https://wa.me/201067333964"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 mt-4 rounded-md bg-cyan/10 text-cyan border border-cyan/50 hover:bg-cyan/20 transition-all text-lg inline-block"
                >
                  Hire Me
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}