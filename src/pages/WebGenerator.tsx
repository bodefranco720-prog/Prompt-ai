import * as React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { PromptOutput } from '../components/generators/PromptOutput';
import { generateWebPrompt } from '../utils/promptEngine';
import { Globe, Wand2, RotateCcw, Sparkles, Check } from 'lucide-react';
import { useAppStore } from '../store';

const projectTypes = [
  'Website', 'Landing Page', 'Dashboard', 'SaaS Product', 'E-commerce', 
  'Portfolio', 'Blog', 'Agency', 'Restaurant', 'Corporate Portal', 'Custom'
];

const designStyles = [
  'Modern', 'Minimalist', 'Luxury', 'Dark Mode', 'Colorful', 
  'Corporate', 'Creative', 'Glassmorphism', 'Brutalist', 'Neo-brutalist'
];

const availableFeatures = [
  'Responsive Design', 'Contact Form', 'Search Bar', 'Dark Mode', 
  'Micro-animations', 'SEO Optimization', 'Authentication', 
  'Payment Gateway', 'Interactive Dashboard', 'Blog System', 'Live Chat', 'Newsletter'
];

const techOptions = [
  'React + Tailwind CSS', 'Next.js (App Router)', 'Vue.js + Tailwind', 
  'HTML5 / CSS3 / Vanilla JS', 'Node.js + Express', 'TypeScript + Vite', 
  'WordPress / Headless', 'Shopify / Liquid'
];

const enhancementPresets = [
  { label: 'Modern', tag: 'clean modern layout with generous negative space' },
  { label: 'High Converting', tag: 'conversion-optimized copy, sticky CTA buttons, and social proof sections' },
  { label: 'Clean Code', tag: 'modular component architecture, strict type safety, and clean folder structure' },
  { label: 'SEO Optimized', tag: 'semantic HTML5, OpenGraph tags, schema markup, and fast Core Web Vitals' },
  { label: 'Fully Responsive', tag: 'fluid mobile-first typography and seamless adaptive breakpoints' },
];

const initialForm = {
  projectType: 'SaaS Product',
  websiteName: '',
  industry: '',
  targetAudience: '',
  websiteGoal: '',
  pagesRequired: 'Home, Features, Pricing, About, Contact',
  designStyle: 'Modern',
  colorPreferences: 'Sleek dark theme with vibrant blue accents',
  typographyPreference: 'Modern sans-serif (Inter or Plus Jakarta Sans)',
  features: ['Responsive Design', 'Contact Form', 'Dark Mode', 'SEO Optimization'],
  technology: 'React + Tailwind CSS',
  extraRequirements: ''
};

export default function WebGenerator() {
  const [formData, setFormData] = React.useState(initialForm);
  const [activeEnhancements, setActiveEnhancements] = React.useState<string[]>(['Modern', 'Fully Responsive']);
  const [generatedPrompt, setGeneratedPrompt] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const { addToast, settings, addPrompt } = useAppStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists 
          ? prev.features.filter(f => f !== feature) 
          : [...prev.features, feature]
      };
    });
  };

  const toggleEnhancement = (label: string) => {
    setActiveEnhancements(prev => 
      prev.includes(label) ? prev.filter(e => e !== label) : [...prev, label]
    );
  };

  const handleReset = () => {
    setFormData(initialForm);
    setActiveEnhancements(['Modern', 'Fully Responsive']);
    setGeneratedPrompt(null);
    addToast({ title: 'Form reset to default', type: 'info' });
  };

  const handleGenerate = () => {
    if (!formData.websiteName && !formData.industry) {
      addToast({ title: 'Please provide Website/Brand Name or Industry', type: 'error' });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      // compile extra requirements with enhancements
      const enhancementsText = activeEnhancements.map(enh => {
        const item = enhancementPresets.find(p => p.label === enh);
        return item ? item.tag : enh;
      }).join('; ');

      const combinedData = {
        ...formData,
        pagesRequired: formData.pagesRequired.split(',').map(p => p.trim()).filter(Boolean),
        extraRequirements: [
          formData.extraRequirements,
          enhancementsText ? `Mandatory Architectural Focus: ${enhancementsText}` : ''
        ].filter(Boolean).join('\n')
      };

      const prompt = generateWebPrompt(combinedData);
      setGeneratedPrompt(prompt);
      setIsGenerating(false);

      if (settings.autoSave) {
        addPrompt({
          title: `${formData.websiteName || 'Web Project'} Prompt`,
          category: 'web',
          promptText: prompt,
          isFavorite: false,
          tags: ['web', formData.projectType.toLowerCase().replace(/\s+/g, '-')]
        });
      }

      addToast({ title: 'Web prompt generated successfully', type: 'success' });
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 text-slate-900 dark:text-white">
            <Globe className="w-8 h-8 text-blue-500" />
            Web Prompt Generator
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Engineered prompt specifications for websites, SaaS web apps, landing pages, and dashboards.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5 self-start sm:self-auto text-xs">
          <RotateCcw className="w-3.5 h-3.5" /> Reset Form
        </Button>
      </div>

      {/* Quick Enhancement Presets */}
      <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <Sparkles className="w-3.5 h-3.5" /> Quick Enhancements (Click to toggle)
        </div>
        <div className="flex flex-wrap gap-2">
          {enhancementPresets.map(enh => {
            const isActive = activeEnhancements.includes(enh.label);
            return (
              <button
                key={enh.label}
                type="button"
                onClick={() => toggleEnhancement(enh.label)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  isActive 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                {isActive && '✓ '} {enh.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type</Label>
                <Select name="projectType" value={formData.projectType} onChange={handleInputChange}>
                  {projectTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteName">Project / Business Name *</Label>
                <Input 
                  name="websiteName" 
                  placeholder="e.g. PromptForge AI or Apex Logistics" 
                  value={formData.websiteName} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry / Niche *</Label>
                <Input 
                  name="industry" 
                  placeholder="e.g. AI SaaS, FinTech, E-commerce, Healthcare" 
                  value={formData.industry} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input 
                  name="targetAudience" 
                  placeholder="e.g. B2B founders, freelance designers" 
                  value={formData.targetAudience} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="websiteGoal">Primary Website Goal</Label>
                <Input 
                  name="websiteGoal" 
                  placeholder="e.g. Convert visitors into free trial signups and showcase core AI tools" 
                  value={formData.websiteGoal} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="pagesRequired">Pages Required (comma-separated)</Label>
                <Input 
                  name="pagesRequired" 
                  placeholder="e.g. Home, Features, Pricing, About, Contact, Blog" 
                  value={formData.pagesRequired} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            {/* Design & Style */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Design & Styling</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="designStyle">Design Style</Label>
                  <Select name="designStyle" value={formData.designStyle} onChange={handleInputChange}>
                    {designStyles.map(style => <option key={style} value={style}>{style}</option>)}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="colorPreferences">Color Preferences</Label>
                  <Input 
                    name="colorPreferences" 
                    placeholder="e.g. Deep navy blue, electric cyan, white" 
                    value={formData.colorPreferences} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="typographyPreference">Typography</Label>
                  <Input 
                    name="typographyPreference" 
                    placeholder="e.g. Modern sans-serif, Inter, Grotesk" 
                    value={formData.typographyPreference} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
            </div>

            {/* Features Required Checklist */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
              <Label className="text-base font-bold text-slate-900 dark:text-white">
                Features & Components Required
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1">
                {availableFeatures.map(feat => {
                  const isSelected = formData.features.includes(feat);
                  return (
                    <button
                      type="button"
                      key={feat}
                      onClick={() => toggleFeature(feat)}
                      className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-left border transition-all ${
                        isSelected 
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300' 
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 dark:border-slate-700'}`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <span className="truncate">{feat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Technology Stack & Extra Requirements */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technology">Recommended Technology</Label>
                <Select name="technology" value={formData.technology} onChange={handleInputChange}>
                  {techOptions.map(tech => <option key={tech} value={tech}>{tech}</option>)}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="extraRequirements">Extra Technical Requirements & Constraints</Label>
                <Textarea 
                  name="extraRequirements" 
                  placeholder="e.g. Must support multi-currency Stripe billing, i18n localization, and micro-interactions on hover." 
                  value={formData.extraRequirements} 
                  onChange={handleInputChange} 
                  className="min-h-[90px]"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">
                {formData.features.length} features selected • {activeEnhancements.length} enhancements active
              </span>
              <Button 
                size="lg" 
                onClick={handleGenerate} 
                isLoading={isGenerating} 
                className="w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white border-0 px-8"
              >
                <Wand2 className="w-4 h-4" />
                Generate Web Prompt
              </Button>
            </div>
          </CardContent>
        </Card>

        {generatedPrompt && (
          <div id="output-section">
            <PromptOutput 
              promptText={generatedPrompt} 
              category="web" 
              title={`${formData.websiteName || 'Web Project'} Prompt`} 
              onRegenerate={handleGenerate}
            />
          </div>
        )}
      </div>
    </div>
  );
}
