import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowRight, Send, User, MessageSquare, CheckCircle, Download } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useProfile, cvDownloadUrl } from '@/lib/profileStore';


type FormState = 'idle' | 'sending' | 'sent';

export default function Contact() {
  const { cvUrl } = useProfile();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setFormState('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error');
      setFormState('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      // Fallback to mailto if API fails
      const subject = encodeURIComponent(form.subject || `Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
      window.open(`mailto:mohamedwaeltorad@gmail.com?subject=${subject}&body=${body}`, '_blank');
      setFormState('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  }

  return (
    <section id="contact" className="py-28 relative bg-secondary/30 border-t border-border/50 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.07] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00d4ff 0%, #7c3aed 50%, transparent 70%)' }} />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan font-mono text-sm mb-2 tracking-widest">// let's connect</p>
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-foreground">
            GET IN TOUCH<span className="text-cyan">_</span>
          </h2>
          <p className="text-lg text-secondary-foreground max-w-xl mx-auto">
            Available for freelance projects, full-time remote roles, and collaboration. Let's build something great.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <ContactCard
              icon={<Mail size={18} />}
              label="Email"
              value="mohamedwaeltorad@gmail.com"
              href="mailto:mohamedwaeltorad@gmail.com"
            />
            <ContactCard
              icon={<FaWhatsapp size={18} />}
              label="WhatsApp"
              value="+20 106 733 3964"
              href="https://wa.me/201067333964?text=Hello%20I%20want%20to%20start%20a%20new%20project"
            />
            <ContactCard
              icon={<Linkedin size={18} />}
              label="LinkedIn"
              value="Mohamed Wael"
              href="https://www.linkedin.com/in/mohamed-wael-469744273/"
            />
            <ContactCard
              icon={<Github size={18} />}
              label="GitHub"
              value="@Medo6143"
              href="https://github.com/Medo6143"
            />

            <div className="pt-4 space-y-3">
              <a
                href="https://wa.me/201067333964?text=Hello%20I%20want%20to%20start%20a%20new%20project"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-start-project"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan text-background font-mono font-bold rounded hover:bg-cyan/90 transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
              >
                [Start Your Project] <ArrowRight size={16} />
              </a>
              <a
                href={cvDownloadUrl(cvUrl)}
                download="Mohamed_Wael_CV.pdf"
                data-testid="button-download-cv"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 glass-panel border border-border text-foreground font-mono rounded hover:border-cyan/40 hover:text-cyan transition-all"
              >
                <Download size={16} /> [Download CV]
              </a>
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-panel rounded-2xl border border-border p-8">
              {formState === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle size={56} className="text-cyan mx-auto mb-5" />
                  <h3 className="text-2xl font-mono font-bold text-foreground mb-3">Message Sent!</h3>
                  <p className="text-secondary-foreground mb-6">
                    Your email client opened with the message pre-filled. Mohamed will get back to you soon.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    data-testid="button-send-another"
                    className="text-cyan font-mono text-sm hover:underline"
                  >
                    &gt; Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate data-testid="contact-form">
                  <p className="text-xs font-mono text-cyan mb-6 tracking-widest">// send a message</p>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <FormField
                      label="Name"
                      icon={<User size={14} />}
                      error={errors.name}
                    >
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        data-testid="input-name"
                        className="form-input"
                      />
                    </FormField>

                    <FormField
                      label="Email"
                      icon={<Mail size={14} />}
                      error={errors.email}
                    >
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        data-testid="input-email"
                        className="form-input"
                      />
                    </FormField>
                  </div>

                  <div className="mb-5">
                    <FormField label="Subject" icon={<MessageSquare size={14} />}>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="What's this about? (optional)"
                        data-testid="input-subject"
                        className="form-input"
                      />
                    </FormField>
                  </div>

                  <div className="mb-6">
                    <FormField
                      label="Message"
                      icon={<MessageSquare size={14} />}
                      error={errors.message}
                    >
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        rows={5}
                        data-testid="input-message"
                        className="form-input resize-none"
                      />
                    </FormField>
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    data-testid="button-submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan text-background font-mono font-bold rounded hover:bg-cyan/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                  >
                    {formState === 'sending' ? (
                      <>
                        <span className="animate-spin w-4 h-4 border-2 border-background border-t-transparent rounded-full" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} /> [Send Message]
                      </>
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground font-mono mt-3 text-center">
                    Opens your email client with the message pre-filled
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, label, value, href }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`contact-link-${label.toLowerCase()}`}
      className="flex items-center gap-4 p-4 glass-panel rounded-xl border border-border hover:border-cyan/40 hover:text-cyan transition-all group"
    >
      <div className="w-9 h-9 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0 group-hover:bg-cyan/20 transition-colors">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-mono text-muted-foreground mb-0.5">{label}</p>
        <p className="text-sm font-mono text-foreground truncate">{value}</p>
      </div>
    </a>
  );
}

function FormField({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground mb-2">
        <span className="text-cyan">{icon}</span> {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-400 font-mono mt-1">{error}</p>
      )}
    </div>
  );
}
