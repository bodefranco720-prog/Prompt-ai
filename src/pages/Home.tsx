import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Globe, Image as ImageIcon, Video, Briefcase, Zap, Shield, Sparkles, Cloud, ArrowRight, CheckCircle2, Lock, Clock, BookOpen, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppStore } from '../store';

export default function Home() {
  const navigate = useNavigate();
  const { prompts } = useAppStore();

  const totalPrompts = prompts.length;
  const favoritePrompts = prompts.filter(p => p.isFavorite).length;
  const webPrompts = prompts.filter(p => p.category === 'web').length;
  const imagePrompts = prompts.filter(p => p.category === 'image').length;
  const videoPrompts = prompts.filter(p => p.category === 'video').length;
  const businessPrompts = prompts.filter(p => p.category === 'business').length;

  const generators = [
    {
      id: 'web',
      title: 'Web Generator',
      tag: 'Full-Stack & UX Architecture',
      description: 'Generate production-ready prompts for websites, landing pages, dashboards, and SaaS platforms.',
      icon: Globe,
      image: '/images/web-preview.jpg',
      color: 'bg-blue-600',
      glow: 'hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]',
      border: 'border-blue-500/20',
      path: '/generate/web'
    },
    {
      id: 'image',
      title: 'Image Generator',
      tag: 'Midjourney v6 & DALL-E 3',
      description: 'Create photorealistic prompts with optical lenses, studio lighting models, and negative constraints.',
      icon: ImageIcon,
      image: '/images/image-preview.jpg',
      color: 'bg-purple-600',
      glow: 'hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(147,51,234,0.25)]',
      border: 'border-purple-500/20',
      path: '/generate/image'
    },
    {
      id: 'video',
      title: 'Video Generator',
      tag: 'Runway Gen-2 & Sora',
      description: 'Orchestrate cinematic camera choreography, framerates, lighting angles, and narrative motion pacing.',
      icon: Video,
      image: '/images/video-preview.jpg',
      color: 'bg-emerald-600',
      glow: 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(5,150,105,0.25)]',
      border: 'border-emerald-500/20',
      path: '/generate/video'
    },
    {
      id: 'business',
      title: 'Business Generator',
      tag: 'Strategy & Growth Funnels',
      description: 'Formulate high-leverage prompts for executive GTM strategy, investor decks, objection matrices, and SOPs.',
      icon: Briefcase,
      image: '/images/business-preview.jpg',
      color: 'bg-amber-600',
      glow: 'hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(217,119,6,0.25)]',
      border: 'border-amber-500/20',
      path: '/generate/business'
    }
  ];

  return (
    <div className="flex flex-col gap-10 pb-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-[#0B0F19] px-6 py-12 md:py-16 lg:py-20 border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-[#0B0F19] to-[#0B0F19]" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>AI Prompt Engineering Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Generate Better Prompts.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                Create Better Results.
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Eliminate prompt trial-and-error. Generate structured, context-rich AI instructions for web apps, photorealistic images, cinematic video shots, and executive business strategy.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button size="lg" onClick={() => navigate('/generate/web')} className="gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-7 shadow-lg shadow-blue-600/30 border-0 font-semibold">
                Start Creating Free <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/templates')} className="rounded-xl px-7 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white backdrop-blur-md bg-white/5 font-semibold">
                <Globe className="w-4 h-4 mr-2" /> 20 Starter Templates
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 mt-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-white font-medium text-xs sm:text-sm">
                  <Zap className="w-4 h-4 text-blue-400 shrink-0" /> 4 Generators
                </div>
                <span className="text-[11px] text-slate-400">Web, Image, Video, Biz</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-white font-medium text-xs sm:text-sm">
                  <Shield className="w-4 h-4 text-purple-400 shrink-0" /> Local Storage
                </div>
                <span className="text-[11px] text-slate-400">100% Private in Browser</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-white font-medium text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-pink-400 shrink-0" /> Smart Presets
                </div>
                <span className="text-[11px] text-slate-400">Instant Enhancements</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-white font-medium text-xs sm:text-sm">
                  <Cloud className="w-4 h-4 text-emerald-400 shrink-0" /> Instant Export
                </div>
                <span className="text-[11px] text-slate-400">TXT, JSON & CSV Support</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 blur-2xl rounded-3xl" />
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900 aspect-video lg:aspect-[4/3]">
              <img 
                src="/images/hero-banner.jpg" 
                alt="PromptForge AI Intelligence Engine" 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white">Prompt Synthesis Active</span>
                </div>
                <span className="text-[11px] text-blue-300 font-mono">v1.2 Production</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Generators Section with Visual Thumbnails */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Specialized AI Generators</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Select a category to craft domain-specific AI prompt specifications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {generators.map((gen, index) => (
            <motion.div
              key={gen.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className={`h-full flex flex-col transition-all duration-300 group overflow-hidden relative border bg-white dark:bg-[#0B0F19] ${gen.border} ${gen.glow} rounded-2xl shadow-sm hover:shadow-xl`}>
                {/* Visual Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                  <img 
                    src={gen.image} 
                    alt={gen.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {gen.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${gen.color} text-white shadow-md`}>
                      <gen.icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight drop-shadow-sm">{gen.title}</h3>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col h-full relative z-10 justify-between space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {gen.description}
                  </p>
                  
                  <Button 
                    className={`w-full gap-2 ${gen.color} hover:brightness-110 text-white border-0 font-semibold text-xs py-2`} 
                    onClick={() => navigate(gen.path)}
                  >
                    Open Generator <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Cards Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Workspace Overview</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/my-prompts')} className="text-xs text-blue-500 hover:text-blue-600 gap-1">
            View All Prompts <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div 
            onClick={() => navigate('/my-prompts')}
            className="cursor-pointer p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/70 dark:border-slate-800/80 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Total Prompts</span>
              <BookOpen className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{totalPrompts}</div>
          </div>

          <div 
            onClick={() => navigate('/favorites')}
            className="cursor-pointer p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/70 dark:border-slate-800/80 hover:border-amber-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Favorites</span>
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{favoritePrompts}</div>
          </div>

          <div 
            onClick={() => navigate('/generate/web')}
            className="cursor-pointer p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/70 dark:border-slate-800/80 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Web Prompts</span>
              <Globe className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{webPrompts}</div>
          </div>

          <div 
            onClick={() => navigate('/generate/image')}
            className="cursor-pointer p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/70 dark:border-slate-800/80 hover:border-purple-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Image Prompts</span>
              <ImageIcon className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{imagePrompts}</div>
          </div>

          <div 
            onClick={() => navigate('/generate/video')}
            className="cursor-pointer p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/70 dark:border-slate-800/80 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Video Prompts</span>
              <Video className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{videoPrompts}</div>
          </div>

          <div 
            onClick={() => navigate('/generate/business')}
            className="cursor-pointer p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/70 dark:border-slate-800/80 hover:border-amber-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Business Prompts</span>
              <Briefcase className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{businessPrompts}</div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="flex flex-col items-center justify-center pt-8 border-t border-slate-200 dark:border-slate-800">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">Trusted by Creators, Developers & Business Leaders</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
            <Zap className="w-4 h-4 text-blue-500" /> Instant Generation
          </div>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Domain-Specific Schemas
          </div>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
            <Lock className="w-4 h-4 text-purple-500" /> Private & Secure
          </div>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
            <Clock className="w-4 h-4 text-amber-500" /> Lifetime Local Storage
          </div>
        </div>
      </section>
    </div>
  );
}
