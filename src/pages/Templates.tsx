import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  LayoutTemplate, Search, Copy, Check, Globe, Image as ImageIcon, 
  Video, Briefcase, Sparkles, ArrowRight, BookmarkPlus, Eye 
} from 'lucide-react';
import { useAppStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { PromptCategory } from '../types';

interface TemplateItem {
  id: string;
  category: PromptCategory;
  title: string;
  description: string;
  promptText: string;
  targetGenerator: string;
}

const templates: TemplateItem[] = [
  // WEB (5 templates)
  {
    id: 'web-1',
    category: 'web',
    title: 'SaaS Website',
    description: 'High-converting B2B SaaS landing page with interactive product features and pricing tables.',
    promptText: 'You are an expert Web Architect and UX/UI Designer. Create a comprehensive project specification for a high-converting B2B SaaS website called "CloudMetrics". Target Audience: Technical founders and DevOps leaders. Required pages: Home (Hero, Social Proof, Interactive Feature Tour, Testimonials), Pricing (Tiered monthly/annual toggle with feature comparison matrix), Documentation, and Contact. Design Style: Minimalist dark-mode aesthetic with neon cyan accents, glassmorphism cards, and ultra-crisp typography. Ensure full responsive layout, WCAG AA accessibility, and SEO Core Web Vitals optimization.',
    targetGenerator: '/generate/web'
  },
  {
    id: 'web-2',
    category: 'web',
    title: 'E-commerce Store',
    description: 'Modern direct-to-consumer lifestyle brand store with streamlined checkout.',
    promptText: 'You are an elite E-Commerce Frontend Architect. Build a detailed technical blueprint for an ultra-fast luxury apparel e-commerce store named "Aura Studio". Target Audience: Trend-conscious urban professionals. Key components: Dynamic product catalog grid with instant multi-attribute filtering (size, color, price), interactive 360-degree product preview card, sticky slide-out cart drawer, and frictionless checkout flow. Design System: Clean editorial layout, warm off-white background, elegant serif headings, and micro-interactions on hover.',
    targetGenerator: '/generate/web'
  },
  {
    id: 'web-3',
    category: 'web',
    title: 'Portfolio',
    description: 'Minimalist creative director and developer portfolio with case studies.',
    promptText: 'Act as a Senior Creative Technologist. Design an interactive portfolio website for a Senior Product Designer & Creative Developer. Structure: Interactive hero with smooth custom cursor animations, bento-grid featured case studies with video mockups, interactive timeline of work experience, live playground for creative experiments, and quick booking contact form. Visual Direction: Monospaced typography accents, dark charcoal theme with soft ambient gradients, smooth section transitions.',
    targetGenerator: '/generate/web'
  },
  {
    id: 'web-4',
    category: 'web',
    title: 'Agency Website',
    description: 'Bold digital design & engineering agency portfolio with client testimonials.',
    promptText: 'You are an award-winning Digital Agency Art Director. Formulate a complete design and functional blueprint for a cutting-edge creative agency website called "Vanguard Studio". Include: Bold kinetic typography hero statement, interactive 3D client showcase carousel, awards badge marquee, service breakdown tabs with interactive accordion, and a multi-step project enquiry estimator. Technology: React, Tailwind CSS, Framer Motion, optimized for mobile touch gestures.',
    targetGenerator: '/generate/web'
  },
  {
    id: 'web-5',
    category: 'web',
    title: 'Restaurant Website',
    description: 'Artisanal culinary restaurant site with online table reservation and interactive menu.',
    promptText: 'You are a hospitality UX specialist. Develop a complete website design specification for "L’Artisan Bistro", a fine dining contemporary restaurant. Pages: Story & Chef Philosophy, Seasonal Tasting Menu with dietary tags (vegan, gluten-free), OpenTable/Resy integrated reservation widget, Private Events inquiry form, and Location/Hours with interactive map. Atmosphere: Rich burgundy and deep olive palette, editorial photography layouts, warm typography.',
    targetGenerator: '/generate/web'
  },

  // IMAGE (5 templates)
  {
    id: 'img-1',
    category: 'image',
    title: 'Luxury Product Ad',
    description: 'Studio product photography with dramatic reflections and volumetric lighting.',
    promptText: 'Commercial studio product photography of a luxury matte black mechanical chronograph watch with rose gold indices, resting on a wet dark volcanic rock slab, gentle water mist droplets, soft dramatic rim lighting from top-right, subtle golden hour reflections, shot on Hasselblad H6D-100c, 100mm macro lens, f/4, shallow depth of field, hyper-detailed texture, 8k resolution, cinematic commercial --ar 16:9',
    targetGenerator: '/generate/image'
  },
  {
    id: 'img-2',
    category: 'image',
    title: 'Cinematic Portrait',
    description: 'Atmospheric cyberpunk street portrait with vivid neon bokeh reflections.',
    promptText: 'Cinematic medium close-up portrait of an introspective cybernetic engineer walking through a rainy Tokyo street at midnight, neon reflections gleaming on wet pavement, cyan and magenta ambient city glow, steam rising from street vents, shot on 35mm Arri Alexa, anamorphic lens flare, f/1.4, rich film grain, masterpiece, photorealistic, 8k resolution --ar 4:5',
    targetGenerator: '/generate/image'
  },
  {
    id: 'img-3',
    category: 'image',
    title: 'Fashion Campaign',
    description: 'High-fashion editorial campaign photography with architectural lighting.',
    promptText: 'High-fashion avant-garde editorial photoshoot featuring an elegant model in structured architectural silk garments, minimalist concrete brutalist courtyard backdrop, harsh natural midday sunlight creating striking geometric shadows, Vogue cover aesthetic, dynamic pose, Hasselblad 80mm lens, crisp focus, rich fabric textures, photorealistic --ar 3:4',
    targetGenerator: '/generate/image'
  },
  {
    id: 'img-4',
    category: 'image',
    title: 'Food Advertisement',
    description: 'Gourmet culinary photography with vibrant fresh ingredients and warm steam.',
    promptText: 'Mouthwatering gourmet artisan smash burger with melting aged cheddar, crispy smoked bacon, caramelized onions, and truffle aioli on a toasted brioche bun, floating airborne sesame seeds, wisps of warm savory steam, rustic dark wood table background, shallow depth of field, warm directional studio lighting, 8k food magazine photography --ar 1:1',
    targetGenerator: '/generate/image'
  },
  {
    id: 'img-5',
    category: 'image',
    title: 'Social Media Creative',
    description: 'Modern 3D isometric tech concept illustration for high-engagement social posts.',
    promptText: 'Modern 3D isometric digital workspace illustration featuring floating holographic AI widgets, sleek curved monitor, floating glowing charts, lush clay-render succulent plants, pastel lavender and electric blue color scheme, smooth claymorphism finish, clean studio lighting, octane render, high aesthetic for social media tech campaign --ar 1:1',
    targetGenerator: '/generate/image'
  },

  // VIDEO (5 templates)
  {
    id: 'vid-1',
    category: 'video',
    title: 'Product Commercial',
    description: 'High-end sleek consumer electronics reveal with smooth orbit camera movement.',
    promptText: 'ROLE: Master Commercial Cinematographer. Produce a 15-second high-end tech commercial script and shot-list for a flagship smartphone. Scene: Pure dark studio with reflective liquid floor. Camera Movement: Slow sweeping circular orbit starting extreme close-up on the titanium camera lens ring, revealing illuminated glass back as volumetric light beam sweeps across. Speed: High speed 120fps slowed down to smooth 24fps motion. Color Grading: Crisp cinematic teal and gold contrast. End frame: Front view with holographic screen glowing.',
    targetGenerator: '/generate/video'
  },
  {
    id: 'vid-2',
    category: 'video',
    title: 'Cinematic Reel',
    description: 'Breathtaking travel landscape sequence with dynamic drone flyovers.',
    promptText: 'Cinematic travel reel sequence. Setting: Majestic snow-capped Nordic fjords at dawn. Camera: First-person FPV drone accelerating through a misty canyon, soaring smoothly over a solitary wooden cabin with glowing warm lights, transitioning into an expansive aerial vista as golden sunrise hits the mountain peaks. Motion Style: Flowing, kinetic, seamless transitions. Audio cues: Deep atmospheric synth pad crescendo.',
    targetGenerator: '/generate/video'
  },
  {
    id: 'vid-3',
    category: 'video',
    title: 'YouTube Short',
    description: 'Fast-paced, hook-driven vertical educational or tech highlight reel.',
    promptText: 'Create a 30-second vertical 9:16 viral short video prompt. Subject: "3 AI Tools That Will Save You 10 Hours This Week". Visual Style: Ultra-fast pacing, dynamic kinetic typography overlays on screen, quick push-in zooms on software UI demos, punchy split screens, and energetic sound effect markers (whoosh, pop). Tone: High-energy, crisp, engaging, zero fluff.',
    targetGenerator: '/generate/video'
  },
  {
    id: 'vid-4',
    category: 'video',
    title: 'Brand Advertisement',
    description: 'Inspiring lifestyle brand manifesto video with authentic documentary vibes.',
    promptText: 'Brand Manifesto Commercial for an eco-conscious outdoor athletic apparel brand. Sequence: Handheld 16mm film aesthetic following runners cutting through early morning urban fog into dense pine forest trails. Camera: Dynamic tracking shots, close-up shoe impact kicking dirt in slow motion, authentic sweat and determination. Lighting: Natural golden backlight filter through trees. Voiceover: Uplifting, quiet confidence.',
    targetGenerator: '/generate/video'
  },
  {
    id: 'vid-5',
    category: 'video',
    title: 'Story Scene',
    description: 'Dramatic narrative suspense dialogue sequence with tension lighting.',
    promptText: 'Dramatic cinema scene in a dimly lit 1970s detective office during a thunderstorm. Characters: Two detectives leaning over a desk covered in case files and polaroids. Action: Thunder flashes illuminate tense expressions; one slides a sealed envelope forward without speaking. Camera: Slow creeping dolly push-in between detectives shoulders (over-the-shoulder). Rain streaks on window glass in soft focus background.',
    targetGenerator: '/generate/video'
  },

  // BUSINESS (5 templates)
  {
    id: 'biz-1',
    category: 'business',
    title: 'Marketing Strategy',
    description: 'Omnichannel B2B Go-To-Market blueprint with customer acquisition channels.',
    promptText: 'You are a Chief Marketing Officer. Formulate a comprehensive 90-day Go-To-Market (GTM) Marketing Strategy for a B2B SaaS productivity tool targeting mid-market operations directors. Objective: Generate 500 Qualified Sales Leads with a $15,000 budget. Deliverables: Ideal Customer Profile (ICP) breakdown, Core Value Proposition messaging hierarchy, Channel mix (LinkedIn Thought Leadership, Cold Email outreach sequences, High-intent Google Ads), Content pillars, and Weekly KPI tracking dashboard.',
    targetGenerator: '/generate/business'
  },
  {
    id: 'biz-2',
    category: 'business',
    title: 'Product Launch',
    description: 'Complete 4-phase launch playbook for digital products, mobile apps, or SaaS.',
    promptText: 'You are an Executive Product Launch Strategist. Create an end-to-end 4-Phase Product Launch Playbook for a new AI-powered finance application. Phases required: 1) Pre-launch VIP Waitlist & Beta Recruitment, 2) Launch Day Orchestration (Product Hunt, Press Outreach, Social Blitz, Influencer Seeding), 3) Post-Launch Retention & Onboarding optimization, 4) Momentum Sustaining Strategy. Include specific email subject lines, social announcements, and community activation tactics.',
    targetGenerator: '/generate/business'
  },
  {
    id: 'biz-3',
    category: 'business',
    title: 'Sales Strategy',
    description: 'Enterprise outbound sales playbook with objection handling and pitch framework.',
    promptText: 'Act as a VP of Global Sales. Develop an enterprise outbound sales playbook for closing deals between $20k-$50k ACV. Include: Multi-touch cadence across 14 days (LinkedIn touch, customized cold email, personalized video message, phone call), Pain-point discovery call question framework, Value-based objection handling matrix (Competitor price, Timing, "Send me an email"), and High-urgency closing proposals.',
    targetGenerator: '/generate/business'
  },
  {
    id: 'biz-4',
    category: 'business',
    title: 'Business Plan',
    description: 'Executive pitch deck business plan summary for investors and stakeholders.',
    promptText: 'You are an Angel Investor and Startup Advisor. Draft a rigorous 10-section Executive Business Plan for a venture-backed tech startup in the circular economy sector. Cover: Executive Summary, Market Problem & Unfair Advantage Solution, TAM/SAM/SOM Market Sizing with citations, Business Model & Unit Economics (LTV, CAC, Payback Period), Go-To-Market strategy, Competitive Moat analysis, Financial Projections (3-year revenue and EBITDA), and Funding Ask with Capital Allocation breakdown.',
    targetGenerator: '/generate/business'
  },
  {
    id: 'biz-5',
    category: 'business',
    title: 'Social Media Campaign',
    description: 'High-viral 30-day multi-platform social media calendar and content pillars.',
    promptText: 'You are a Viral Social Media Strategist. Craft a 30-day viral content campaign blueprint for a modern consumer brand across TikTok, Instagram Reels, and X (Twitter). Define: 4 Core Content Pillars (Behind-The-Scenes, Customer Transformation, Contrarian Industry Opinions, Entertaining Memes), 10 Hook Formulas engineered for high watch-time, Call-to-Action strategies for converting views to email subscribers, and Community Engagement protocols.',
    targetGenerator: '/generate/business'
  }
];

export default function Templates() {
  const [search, setSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<'all' | PromptCategory>('all');
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = React.useState<TemplateItem | null>(null);

  const { addToast, addPrompt } = useAppStore();
  const navigate = useNavigate();

  const filtered = templates.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = 
      t.title.toLowerCase().includes(search.toLowerCase()) || 
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.promptText.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = async (template: TemplateItem) => {
    try {
      await navigator.clipboard.writeText(template.promptText);
      setCopiedId(template.id);
      addToast({ title: 'Template copied to clipboard', type: 'success' });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      addToast({ title: 'Failed to copy', type: 'error' });
    }
  };

  const handleSaveToMyPrompts = (template: TemplateItem) => {
    addPrompt({
      title: `${template.title} (Template)`,
      category: template.category,
      promptText: template.promptText,
      isFavorite: false,
      tags: ['template', template.category]
    });
    addToast({ title: 'Saved to My Prompts library', type: 'success' });
  };

  const handleUseTemplate = (template: TemplateItem) => {
    // Copy and navigate to generator
    navigator.clipboard.writeText(template.promptText);
    addToast({ title: 'Template prompt loaded and copied!', type: 'success' });
    navigate(template.targetGenerator);
  };

  const getCategoryIcon = (category: PromptCategory) => {
    switch (category) {
      case 'web': return Globe;
      case 'image': return ImageIcon;
      case 'video': return Video;
      case 'business': return Briefcase;
    }
  };

  const getCategoryBadgeClass = (category: PromptCategory) => {
    switch (category) {
      case 'web': return 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200 dark:border-blue-900';
      case 'image': return 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border-purple-200 dark:border-purple-900';
      case 'video': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900';
      case 'business': return 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-900';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <LayoutTemplate className="w-8 h-8 text-indigo-500" />
            Prompt Templates
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            20 battle-tested, high-performance starter templates across Web, Image, Video & Business.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
            {filtered.length} of {templates.length} Templates
          </span>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800">
          {(['all', 'web', 'image', 'video', 'business'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                activeCategory === cat 
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? 'All (20)' : `${cat} (5)`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search templates..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(template => {
          const Icon = getCategoryIcon(template.category);
          return (
            <Card key={template.id} className="flex flex-col h-full hover:shadow-lg transition-all duration-200 border-slate-200 dark:border-slate-800 group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${getCategoryBadgeClass(template.category)}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {template.category}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-slate-400 hover:text-blue-500"
                    title="Save to My Prompts"
                    onClick={() => handleSaveToMyPrompts(template)}
                  >
                    <BookmarkPlus className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {template.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 space-y-3 pb-3">
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {template.description}
                </p>
                <div 
                  onClick={() => setPreviewTemplate(template)}
                  className="cursor-pointer bg-slate-50 dark:bg-slate-900/90 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-300 font-mono line-clamp-3 border border-slate-200/50 dark:border-slate-800 hover:border-blue-500/40 transition-colors"
                  title="Click to preview full prompt"
                >
                  {template.promptText}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/30">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleCopy(template)}
                  className="gap-1.5 text-xs flex-1"
                >
                  {copiedId === template.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === template.id ? 'Copied' : 'Copy'}
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleUseTemplate(template)}
                  className="gap-1.5 text-xs flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white border-0"
                >
                  Use Template <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <LayoutTemplate className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">No templates found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Try resetting the search or category filter.</p>
        </div>
      )}

      {/* Preview Template Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase border ${getCategoryBadgeClass(previewTemplate.category)}`}>
                {previewTemplate.category}
              </span>
              <button 
                onClick={() => setPreviewTemplate(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{previewTemplate.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{previewTemplate.description}</p>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto">
              {previewTemplate.promptText}
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => handleCopy(previewTemplate)}>
                <Copy className="w-3.5 h-3.5 mr-1" /> Copy Prompt
              </Button>
              <Button size="sm" onClick={() => { handleUseTemplate(previewTemplate); setPreviewTemplate(null); }}>
                Use in Generator <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
