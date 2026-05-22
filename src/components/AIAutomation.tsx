import { motion } from 'framer-motion';
import { Bot, Mail, MessageSquare, Terminal } from 'lucide-react';

export default function AIAutomation() {
  return (
    <section id="ai-automation" className="py-24 relative bg-secondary/20 border-t border-border/50">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-mono font-bold inline-block border-b-2 border-violet pb-2">
              <span className="text-cyan">#</span> AI & Automation
            </h2>
            <Bot className="text-violet w-8 h-8" />
          </div>

          <p className="text-lg text-secondary-foreground mb-12 max-w-3xl leading-relaxed">
            I don't just build apps; I build systems that write code, send emails, and manage workflows. Using n8n and AI APIs, I automate repetitive engineering and business tasks.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <AutomationCard 
                icon={<Mail className="text-cyan" />}
                title="Email & Job Pipelines"
                description="Automated job application pipelines integrating Gmail, Notion, and n8n. Email outreach automation targeting 300+ MENA companies."
              />
              <AutomationCard 
                icon={<MessageSquare className="text-cyan" />}
                title="WhatsApp Systems"
                description="Student Attendance Notification System using Firebase, n8n, and WhatsApp Cloud API for real-time updates."
              />
            </div>
            
            <div className="space-y-6">
              <AutomationCard 
                icon={<Bot className="text-violet" />}
                title="ProposalAI Extension"
                description="AI-powered proposal generator (Chrome Extension MV3). Auto-generates proposals for Upwork, Mostaql, LinkedIn with CV context & first-person AI writing."
              />
              <AutomationCard 
                icon={<Terminal className="text-violet" />}
                title="Career-Ops CLI"
                description="13-command job search automation tool powered by OpenRouter API designed to streamline the technical job hunt."
              />
            </div>
          </div>

          <div className="mt-12 p-6 glass-panel rounded-xl border border-violet/20 flex flex-col md:flex-row items-center gap-6">
            <span className="text-foreground font-mono font-bold shrink-0">Stack_Used:</span>
            <div className="flex flex-wrap gap-3">
              {["n8n", "OpenRouter", "Claude API", "Gmail API", "Notion API", "WhatsApp Cloud API", "Google Sheets", "Chrome Extensions"].map(tool => (
                <span key={tool} className="text-sm px-3 py-1 bg-violet/10 text-violet/90 rounded border border-violet/20">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AutomationCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-panel p-6 rounded-xl border border-border hover:border-cyan/30 transition-all group"
    >
      <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-secondary-foreground text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}