import * as React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { 
  Info, Sparkles, Shield, Zap, Target, CheckCircle2, 
  Layers, Cpu, ArrowRight, BookOpen, Share2 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  const workflowSteps = [
    {
      step: '01',
      title: 'Select Domain Generator',
      desc: 'Choose between Web, Image, Video, or Business generator based on your project requirements.',
      icon: Layers
    },
    {
      step: '02',
      title: 'Configure Structured Inputs',
      desc: 'Fill out domain-specific parameters like target audience, visual style, camera dynamics, or business goals.',
      icon: Cpu
    },
    {
      step: '03',
      title: 'Generate with Smart Engine',
      desc: 'Our rule-based prompt synthesis algorithm weaves your criteria into high-performance AI instructions.',
      icon: Sparkles
    },
    {
      step: '04',
      title: 'Refine, Save & Deploy',
      desc: 'Inspect word and character counts, apply quick enhancements, copy, or export in TXT and JSON formats.',
      icon: Share2
    }
  ];

  const features = [
    {
      title: 'Web Architecture Prompts',
      desc: 'Generates full-stack technical specifications, design tokens, component hierarchies, and WCAG accessibility standards.'
    },
    {
      title: 'Cinematic Image Prompts',
      desc: 'Engineered for Midjourney v6 and DALL-E 3 with photorealistic camera lenses, lighting models, and negative prompts.'
    },
    {
      title: 'Director-Grade Video Prompts',
      desc: 'Orchestrates camera movements (dolly, orbit, drone), shot pacing, framerates, and color grading for Runway Gen-2 and Sora.'
    },
    {
      title: 'Executive Business Prompts',
      desc: 'Formulates go-to-market strategies, sales objection matrices, and investor business plans.'
    }
  ];

  const benefits = [
    'Save 90% of time spent rewriting and troubleshooting vague AI prompts',
    'Eliminate generic AI hallucinations by enforcing rigid constraints and contexts',
    'Private and secure: zero prompt telemetry, 100% stored in local browser cache',
    'Fast workflow with 20 pre-built professional starter templates and instant search'
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 text-slate-900 dark:text-white">
          <Info className="w-8 h-8 text-blue-500" />
          About PromptForge AI
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
          The ultimate platform for professional prompt engineering across Web, Image, Video, and Business.
        </p>
      </div>

      {/* Hero Banner with Visual Backdrop */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20 border-blue-500/20 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 md:p-10 relative z-10">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" /> PromptForge AI Platform
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              “Generate Better Prompts. Create Better Results.”
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              PromptForge AI was designed to eliminate the trial-and-error guesswork in modern generative AI. By structuring domain-specific context, role definitions, constraints, and styling tokens, we empower builders to get peak performance from any AI model on the first attempt.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg aspect-video bg-slate-900">
              <img 
                src="/images/hero-banner.jpg" 
                alt="PromptForge AI Core Engine" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* SECTION 1: MISSION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base max-w-3xl">
          Our mission is to democratize prompt engineering by turning unstructured ideas into comprehensive, context-dense, and highly actionable AI instructions. We bridge the gap between creative intention and AI comprehension, giving designers, developers, filmmakers, and business leaders the exact semantic leverage needed to achieve extraordinary results.
        </p>
      </section>

      {/* SECTION 2: WORKFLOW */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-500" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How It Works: 4-Step Workflow</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflowSteps.map((step, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-500 font-mono">{step.step}</span>
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <step.icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">{step.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: CORE FEATURES */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Core Capabilities & Features</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800 space-y-2 hover:border-blue-500/40 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{feat.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: KEY BENEFITS */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-500" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why Choose PromptForge AI?</h2>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800">
          <ul className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Call to action */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold">Ready to craft better prompts?</h3>
          <p className="text-sm text-blue-100 mt-1">Start generating professional prompts in seconds for free.</p>
        </div>
        <Button 
          onClick={() => navigate('/generate/web')}
          className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 border-0 shadow-md shrink-0"
        >
          Explore Web Generator <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
