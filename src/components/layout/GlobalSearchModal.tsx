import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { Search, X, Globe, Image as ImageIcon, Video, Briefcase, BookOpen, Star, Clock, LayoutTemplate, ArrowRight } from 'lucide-react';
import { PromptCategory } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = React.useState('');
  const navigate = useNavigate();
  const { prompts } = useAppStore();

  const generators = [
    { title: 'Web Prompt Generator', path: '/generate/web', category: 'web' as PromptCategory, icon: Globe, desc: 'Websites, SaaS, e-commerce & dashboards' },
    { title: 'Image Prompt Generator', path: '/generate/image', category: 'image' as PromptCategory, icon: ImageIcon, desc: 'Midjourney, DALL-E & Stable Diffusion' },
    { title: 'Video Prompt Generator', path: '/generate/video', category: 'video' as PromptCategory, icon: Video, desc: 'Cinematic AI video & reels' },
    { title: 'Business Prompt Generator', path: '/generate/business', category: 'business' as PromptCategory, icon: Briefcase, desc: 'Marketing, sales & operations' },
  ];

  const staticTemplates = [
    { title: 'Modern SaaS Website', category: 'web', path: '/templates' },
    { title: 'E-commerce Store Experience', category: 'web', path: '/templates' },
    { title: 'Minimalist Portfolio', category: 'web', path: '/templates' },
    { title: 'Luxury Product Ad', category: 'image', path: '/templates' },
    { title: 'Cinematic Cyberpunk Portrait', category: 'image', path: '/templates' },
    { title: 'Product Commercial 3D', category: 'video', path: '/templates' },
    { title: 'Cinematic Viral Reel', category: 'video', path: '/templates' },
    { title: 'Go-to-Market Strategy', category: 'business', path: '/templates' },
    { title: 'Product Launch Playbook', category: 'business', path: '/templates' },
  ];

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle search
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  const filteredGenerators = generators.filter(g => 
    g.title.toLowerCase().includes(cleanQuery) || g.desc.toLowerCase().includes(cleanQuery) || g.category.includes(cleanQuery)
  );

  const filteredPrompts = prompts.filter(p =>
    p.title.toLowerCase().includes(cleanQuery) || 
    p.promptText.toLowerCase().includes(cleanQuery) ||
    (p.tags && p.tags.some(t => t.toLowerCase().includes(cleanQuery)))
  ).slice(0, 5);

  const filteredTemplates = staticTemplates.filter(t =>
    t.title.toLowerCase().includes(cleanQuery) || t.category.includes(cleanQuery)
  ).slice(0, 5);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  const hasResults = filteredGenerators.length > 0 || filteredPrompts.length > 0 || filteredTemplates.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[80vh]"
        role="dialog"
      >
        <div className="relative flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search generators, templates, prompts, or tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full h-14 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none text-base"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="ml-2 px-2 py-1 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700"
          >
            ESC
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {/* Quick Generators */}
          {filteredGenerators.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2">
                Generators & Tools
              </div>
              <div className="space-y-1">
                {filteredGenerators.map((gen, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(gen.path)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                        <gen.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {gen.title}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1">{gen.desc}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Templates */}
          {filteredTemplates.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2">
                Starter Templates
              </div>
              <div className="space-y-1">
                {filteredTemplates.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item.path)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                        <LayoutTemplate className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-400 uppercase">{item.category}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User Saved Prompts */}
          {filteredPrompts.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2">
                My Saved Prompts
              </div>
              <div className="space-y-1">
                {filteredPrompts.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect('/my-prompts')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1">{item.promptText}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {!hasResults && query && (
            <div className="text-center py-10">
              <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for &quot;web&quot;, &quot;image&quot;, &quot;saas&quot;, or &quot;business&quot;.</p>
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Navigate with click or arrow keys</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
