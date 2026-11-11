import * as React from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Copy, Save, Star, Download, Share2, RefreshCw, Sparkles, Check, FileText, FileJson } from 'lucide-react';
import { useAppStore } from '../../store';

interface PromptOutputProps {
  promptText: string;
  category: 'web' | 'image' | 'video' | 'business';
  title: string;
  onRegenerate?: () => void;
}

export function PromptOutput({ promptText, category, title, onRegenerate }: PromptOutputProps) {
  const [text, setText] = React.useState(promptText);
  const [copied, setCopied] = React.useState(false);
  const { addPrompt, addToast } = useAppStore();

  React.useEffect(() => {
    setText(promptText);
  }, [promptText]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      addToast({ title: 'Copied to clipboard', type: 'success' });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      addToast({ title: 'Failed to copy', type: 'error' });
    }
  };

  const handleSave = () => {
    addPrompt({
      title,
      category,
      promptText: text,
      isFavorite: false,
      tags: [],
    });
    addToast({ title: 'Prompt saved to library', type: 'success' });
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\\s+/g, '-').toLowerCase()}-prompt.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast({ title: 'Downloaded as TXT', type: 'success' });
  };

  const handleDownloadJson = () => {
    const promptData = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title,
      category,
      prompt: text,
      createdAt: new Date().toISOString(),
      favorite: false,
      tags: []
    };
    const blob = new Blob([JSON.stringify(promptData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\\s+/g, '-').toLowerCase()}-prompt.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast({ title: 'Downloaded as JSON', type: 'success' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `PromptForge AI - ${title}`,
          text: text,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleEnhance = (action: string) => {
    let newText = text;
    if (action === 'Improve') {
      newText = newText + '\\n\\n[ENHANCED]: Ensure maximum professional clarity, remove ambiguity, and structure with best practices.';
    } else if (action === 'Expand') {
      newText = newText + '\\n\\n[EXPAND]: Provide comprehensive details, step-by-step breakdown, and consider edge cases.';
    } else if (action === 'Simplify') {
      newText = newText + '\\n\\n[SIMPLIFY]: Keep this extremely concise and to the point. No fluff.';
    }
    setText(newText);
    addToast({ title: `Prompt ${action.toLowerCase()}d`, type: 'success' });
  };

  const wordCount = text.split(/\\s+/).filter(Boolean).length;
  const charCount = text.length;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-500" />
          Generated Prompt
        </h3>
        <div className="flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400 items-center">
          <span>{wordCount} words</span>
          <span>&bull;</span>
          <span>{charCount} chars</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => handleEnhance('Improve')} variant="glass" size="sm" className="h-8 text-xs">
          Improve
        </Button>
        <Button onClick={() => handleEnhance('Expand')} variant="glass" size="sm" className="h-8 text-xs">
          Expand
        </Button>
        <Button onClick={() => handleEnhance('Simplify')} variant="glass" size="sm" className="h-8 text-xs">
          Simplify
        </Button>
        <Button onClick={() => setText('')} variant="glass" size="sm" className="h-8 text-xs text-red-500 hover:text-red-600">
          Clear
        </Button>
        {onRegenerate && (
          <Button onClick={onRegenerate} variant="outline" size="sm" className="gap-2 h-8 text-xs ml-auto">
            <RefreshCw className="w-3 h-3" /> Regenerate
          </Button>
        )}
      </div>

      <Card className="border-blue-200 dark:border-blue-900 shadow-sm bg-blue-50/50 dark:bg-blue-950/20">
        <CardContent className="p-0">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[300px] p-6 bg-transparent resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-xl text-slate-800 dark:text-slate-200 font-mono text-sm leading-relaxed"
            spellCheck="false"
          />
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleCopy} variant="primary" className="gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
        <Button onClick={handleSave} variant="secondary" className="gap-2">
          <Save className="w-4 h-4" /> Save
        </Button>
        <Button onClick={handleDownloadTxt} variant="outline" className="gap-2">
          <FileText className="w-4 h-4" /> TXT
        </Button>
        <Button onClick={handleDownloadJson} variant="outline" className="gap-2">
          <FileJson className="w-4 h-4" /> JSON
        </Button>
        <Button onClick={handleShare} variant="outline" className="gap-2">
          <Share2 className="w-4 h-4" /> Share
        </Button>
        {onRegenerate && (
          <Button onClick={onRegenerate} variant="ghost" className="gap-2 ml-auto">
            <RefreshCw className="w-4 h-4" /> Regenerate
          </Button>
        )}
      </div>
    </div>
  );
}
