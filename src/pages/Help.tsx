import * as React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { HelpCircle, ChevronDown, Sparkles, BookOpen, Download, ShieldCheck } from 'lucide-react';
import { cn } from '../utils/cn';

const faqs = [
  {
    question: 'What is a prompt?',
    answer: "A prompt is a structured set of instructions, context, constraints, and formatting directives given to an Artificial Intelligence model (such as ChatGPT, Claude, Midjourney, Runway, or Gemini). The quality, specificity, and architecture of a prompt directly govern the accuracy, depth, and aesthetics of the AI's generated output."
  },
  {
    question: 'How do I create a prompt in PromptForge AI?',
    answer: 'Creating a prompt is simple and structured: 1) Select your domain from the sidebar or dashboard (Web, Image, Video, or Business); 2) Fill in the tailored parameter fields (or use one-click Quick Enhancement presets); 3) Click "Generate Prompt" to run our smart engineering engine; 4) Refine the output, copy to clipboard, or save it directly into your permanent library.'
  },
  {
    question: 'How does Web Generator work?',
    answer: 'The Web Generator creates production-grade specifications and architecture prompts for modern websites, SaaS apps, dashboards, and e-commerce stores. It intelligently captures your project type, brand identity, page requirements, visual styling, tech stack, and accessibility constraints (WCAG & Core Web Vitals) to create prompt blueprints ready for code-generating models.'
  },
  {
    question: 'How does Image Generator work?',
    answer: 'The Image Generator crafts high-impact, photorealistic visual prompts optimized for image engines like Midjourney v6, DALL-E 3, and Stable Diffusion. You configure composition, camera angles, lighting conditions, depth of field, mood, style presets, and negative prompts, with automatic aspect ratio formatting (e.g., --ar 16:9).'
  },
  {
    question: 'How does Video Generator work?',
    answer: 'The Video Generator creates detailed director shot lists and cinematic production prompts designed for text-to-video AI platforms like Runway Gen-2, Sora, Pika, and Stable Video. It orchestrates camera movement (pan, tilt, dolly, orbit, FPV drone), shot framing, lighting, motion dynamics, aspect ratio, frame rate, and transitions.'
  },
  {
    question: 'How does Business Generator work?',
    answer: 'The Business Generator outputs strategic executive briefs, marketing funnels, sales playbooks, product launch plans, and financial business plans. By capturing industry context, target customer profile, competitors, brand voice, and desired deliverables, it generates actionable blueprints ready for real-world execution.'
  },
  {
    question: 'How are prompts stored and secured?',
    answer: "PromptForge AI is private by design. All generated prompts, favorites, history records, and custom settings are stored locally in your browser's persistent storage engine (localStorage). Your data is never sold, analyzed, or sent to unauthorized third-party servers."
  },
  {
    question: 'How do I export prompts?',
    answer: 'Every prompt in PromptForge AI features one-click export buttons. You can copy the raw text to your clipboard, export as a clean plain text (.txt) file, or download a structured (.json) file complete with metadata, category tags, and timestamps. You can also export your entire library from the Settings page.'
  }
];

export default function Help() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 text-slate-900 dark:text-white">
          <HelpCircle className="w-8 h-8 text-blue-500" />
          Help & User Guide
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Everything you need to know to engineer world-class prompts with PromptForge AI.
        </p>
      </div>

      {/* Quick guide cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="p-2 w-fit rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Use Enhancements</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Click one-click enhancement chips in each generator to inject stylistic formulas instantly.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="p-2 w-fit rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-500">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Save to Library</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Save prompts to your library, tag them, mark favorites, and organize your prompt catalog.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="p-2 w-fit rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-500">
            <Download className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Export TXT & JSON</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Export individual prompts or your complete library at any time from prompt cards or Settings.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <CardContent className="p-0 divide-y divide-slate-200 dark:divide-slate-800">
            {faqs.map((faq, index) => (
              <div key={index} className="p-5 sm:p-6 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between text-left font-medium focus:outline-none"
                >
                  <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-4",
                      openIndex === index ? "rotate-180 text-blue-500" : ""
                    )} 
                  />
                </button>
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index ? "max-h-96 mt-3 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base pr-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
