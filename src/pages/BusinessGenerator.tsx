import * as React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { PromptOutput } from '../components/generators/PromptOutput';
import { generateBusinessPrompt } from '../utils/promptEngine';
import { Briefcase, Wand2, RotateCcw, Sparkles } from 'lucide-react';
import { useAppStore } from '../store';

const businessTypes = [
  'SaaS', 'Agency', 'E-commerce', 'Startup', 'Consulting', 'Local Business', 
  'B2B Enterprise', 'B2C Consumer', 'Freelancer', 'Healthcare', 'Real Estate', 'Education', 'FinTech', 'Custom'
];

const promptPurposes = [
  'Go-To-Market Strategy', 'Business Plan', 'Marketing Strategy', 'Sales Pitch Deck', 
  'High-Converting Ad Copy', 'B2B Cold Email Sequence', 'Competitor Analysis', 
  'Ideal Customer Profile (ICP)', 'SWOT Analysis', 'Product Launch Plan', 'Standard Operating Procedure (SOP)', 'Financial Model Outline'
];

const outputFormats = [
  'Executive Strategy Document', 'Step-by-Step Execution Plan', 'Structured Table', 
  'Bullet Points with Action Items', 'Executive Summary', 'Pitch Deck Presentation Outline', 'In-Depth Analytical Report'
];

const toneOptions = [
  'Professional & Strategic', 'Authoritative & Credible', 'Persuasive & High Converting', 
  'Inspiring & Visionary', 'Friendly & Accessible', 'Urgent & Compelling', 'Empathetic & Customer-Centric'
];

const enhancementPresets = [
  { label: 'Professional', tag: 'rigorous corporate terminology, clear executive framing, actionable KPIs' },
  { label: 'High Converting', tag: 'focus on persuasive psychological triggers, strong call-to-action hooks, objection mitigation' },
  { label: 'Persuasive', tag: 'compelling storytelling arc, social proof emphasis, clear return on investment (ROI)' },
  { label: 'Detailed', tag: 'thorough breakdown with timelines, milestones, risk mitigation matrices, and team roles' },
  { label: 'Executive', tag: 'C-suite summary level, high-level business impact, defensible market moats' },
];

const initialForm = {
  businessType: 'SaaS',
  businessName: '',
  industry: '',
  targetMarket: '',
  businessGoal: '',
  problemStatement: '',
  solution: '',
  uvp: '',
  competitors: '',
  pricingModel: 'Freemium / Monthly Subscription',
  marketingChannels: 'Organic Search (SEO), LinkedIn B2B, Content Marketing',
  toneOfVoice: 'Professional & Strategic',
  outputFormat: 'Executive Strategy Document',
  promptPurpose: 'Go-To-Market Strategy',
  language: 'English',
  extraDetails: ''
};

export default function BusinessGenerator() {
  const [formData, setFormData] = React.useState(initialForm);
  const [activeEnhancements, setActiveEnhancements] = React.useState<string[]>(['Professional', 'Executive']);
  const [generatedPrompt, setGeneratedPrompt] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const { addToast, settings, addPrompt } = useAppStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleEnhancement = (label: string) => {
    setActiveEnhancements(prev =>
      prev.includes(label) ? prev.filter(e => e !== label) : [...prev, label]
    );
  };

  const handleReset = () => {
    setFormData(initialForm);
    setActiveEnhancements(['Professional', 'Executive']);
    setGeneratedPrompt(null);
    addToast({ title: 'Form reset to default', type: 'info' });
  };

  const handleGenerate = () => {
    if (!formData.industry && !formData.businessGoal && !formData.businessName) {
      addToast({ title: 'Please provide Business Name, Industry, or Goal', type: 'error' });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const enhancementsTag = activeEnhancements.map(e => {
        const item = enhancementPresets.find(p => p.label === e);
        return item ? item.tag : e;
      }).join('; ');

      const combinedData = {
        ...formData,
        extraDetails: [
          formData.extraDetails,
          enhancementsTag ? `Strategic Execution Standards: ${enhancementsTag}` : ''
        ].filter(Boolean).join('\n')
      };

      const prompt = generateBusinessPrompt(combinedData);
      setGeneratedPrompt(prompt);
      setIsGenerating(false);

      if (settings.autoSave) {
        addPrompt({
          title: `${formData.businessName || 'Business'} ${formData.promptPurpose}`,
          category: 'business',
          promptText: prompt,
          isFavorite: false,
          tags: ['business', formData.businessType.toLowerCase(), formData.promptPurpose.toLowerCase().replace(/\s+/g, '-')]
        });
      }

      addToast({ title: 'Business prompt generated successfully', type: 'success' });
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 text-slate-900 dark:text-white">
            <Briefcase className="w-8 h-8 text-amber-500" />
            Business Prompt Generator
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Formulate high-leverage prompts for executive strategy, marketing funnels, pitch decks, and operations.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5 self-start sm:self-auto text-xs">
          <RotateCcw className="w-3.5 h-3.5" /> Reset Form
        </Button>
      </div>

      {/* Enhancement Presets */}
      <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Sparkles className="w-3.5 h-3.5" /> Strategic Enhancements (Click to toggle)
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
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
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
                <Label htmlFor="promptPurpose">Primary Purpose / Deliverable</Label>
                <Select name="promptPurpose" value={formData.promptPurpose} onChange={handleInputChange}>
                  {promptPurposes.map(p => <option key={p} value={p}>{p}</option>)}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Model / Type</Label>
                <Select name="businessType" value={formData.businessType} onChange={handleInputChange}>
                  {businessTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">Company / Brand Name</Label>
                <Input 
                  name="businessName" 
                  placeholder="e.g. PromptForge AI or NextWave Labs" 
                  value={formData.businessName} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry / Vertical *</Label>
                <Input 
                  name="industry" 
                  placeholder="e.g. Artificial Intelligence, B2B SaaS, HealthTech" 
                  value={formData.industry} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="businessGoal">Primary Strategic Goal</Label>
                <Input 
                  name="businessGoal" 
                  placeholder="e.g. Scale ARR from $500k to $2M through inbound content marketing and automated outbound sales" 
                  value={formData.businessGoal} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="targetMarket">Target Market & Ideal Customer Profile</Label>
                <Input 
                  name="targetMarket" 
                  placeholder="e.g. Tech-enabled marketing agencies with 10-50 employees seeking automated workflows" 
                  value={formData.targetMarket} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            {/* Problem & Value Proposition */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Value Proposition & Market Context</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="problemStatement">Problem Statement</Label>
                  <Textarea 
                    name="problemStatement" 
                    placeholder="What specific pain point does your audience face daily?" 
                    value={formData.problemStatement} 
                    onChange={handleInputChange} 
                    className="min-h-[75px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution">Solution & Key Benefits</Label>
                  <Textarea 
                    name="solution" 
                    placeholder="How does your product solve this pain point 10x better?" 
                    value={formData.solution} 
                    onChange={handleInputChange} 
                    className="min-h-[75px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uvp">Unique Value Proposition (UVP)</Label>
                  <Input 
                    name="uvp" 
                    placeholder="e.g. The only AI prompt engine with 4 specialized domain frameworks" 
                    value={formData.uvp} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="competitors">Key Competitors (Optional)</Label>
                  <Input 
                    name="competitors" 
                    placeholder="e.g. Generic prompt directories, ChatGPT plugins" 
                    value={formData.competitors} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pricingModel">Pricing Model</Label>
                  <Input 
                    name="pricingModel" 
                    placeholder="e.g. $29/mo Pro Tier or Usage-based API" 
                    value={formData.pricingModel} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketingChannels">Marketing Channels</Label>
                  <Input 
                    name="marketingChannels" 
                    placeholder="e.g. LinkedIn B2B outbound, SEO blogs, Twitter threads" 
                    value={formData.marketingChannels} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
            </div>

            {/* Tone & Output Structure */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Output Formatting & Tone</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="toneOfVoice">Tone of Voice</Label>
                  <Select name="toneOfVoice" value={formData.toneOfVoice} onChange={handleInputChange}>
                    {toneOptions.map(t => <option key={t} value={t}>{t}</option>)}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outputFormat">Output Format Structure</Label>
                  <Select name="outputFormat" value={formData.outputFormat} onChange={handleInputChange}>
                    {outputFormats.map(o => <option key={o} value={o}>{o}</option>)}
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="extraDetails">Extra Specifics or Constraints</Label>
                <Textarea 
                  name="extraDetails" 
                  placeholder="e.g. Include 3 risk mitigations, a 30-60-90 day milestone table, and budget allocation guidance." 
                  value={formData.extraDetails} 
                  onChange={handleInputChange} 
                  className="min-h-[80px]"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">
                Deliverable: {formData.promptPurpose} • {activeEnhancements.length} enhancements active
              </span>
              <Button 
                size="lg" 
                onClick={handleGenerate} 
                isLoading={isGenerating} 
                className="w-full sm:w-auto gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:brightness-110 text-white border-0 px-8"
              >
                <Wand2 className="w-4 h-4" />
                Generate Business Prompt
              </Button>
            </div>
          </CardContent>
        </Card>

        {generatedPrompt && (
          <div id="output-section">
            <PromptOutput 
              promptText={generatedPrompt} 
              category="business" 
              title={`${formData.businessName || 'Business'} ${formData.promptPurpose}`} 
              onRegenerate={handleGenerate}
            />
          </div>
        )}
      </div>
    </div>
  );
}
