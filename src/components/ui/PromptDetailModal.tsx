import * as React from 'react';
import { Prompt } from '../../types';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';
import { Textarea } from './Textarea';
import { X, Copy, Download, Star, Check, Edit3, Eye, FileText, FileJson } from 'lucide-react';
import { useAppStore } from '../../store';

interface PromptDetailModalProps {
  prompt: Prompt | null;
  isOpen: boolean;
  initialMode?: 'view' | 'edit';
  onClose: () => void;
}

export const PromptDetailModal: React.FC<PromptDetailModalProps> = ({
  prompt,
  isOpen,
  initialMode = 'view',
  onClose,
}) => {
  if (!isOpen || !prompt) return null;

  const [mode, setMode] = React.useState<'view' | 'edit'>(initialMode);
  const [title, setTitle] = React.useState(prompt.title);
  const [promptText, setPromptText] = React.useState(prompt.promptText);
  const [tagsInput, setTagsInput] = React.useState((prompt.tags || []).join(', '));
  const [copied, setCopied] = React.useState(false);

  const { updatePrompt, toggleFavorite, addToast } = useAppStore();

  React.useEffect(() => {
    setTitle(prompt.title);
    setPromptText(prompt.promptText);
    setTagsInput((prompt.tags || []).join(', '));
    setMode(initialMode);
  }, [prompt, initialMode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      addToast({ title: 'Copied to clipboard', type: 'success' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast({ title: 'Failed to copy', type: 'error' });
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([promptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '-').toLowerCase()}-prompt.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast({ title: 'Downloaded as TXT', type: 'success' });
  };

  const handleDownloadJson = () => {
    const exportData = {
      id: prompt.id,
      title,
      category: prompt.category,
      prompt: promptText,
      createdAt: prompt.createdAt,
      favorite: prompt.isFavorite,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '-').toLowerCase()}-prompt.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast({ title: 'Downloaded as JSON', type: 'success' });
  };

  const handleSave = () => {
    const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    updatePrompt(prompt.id, {
      title,
      promptText,
      tags: parsedTags,
    });
    addToast({ title: 'Prompt updated successfully', type: 'success' });
    setMode('view');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              {prompt.category}
            </span>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate max-w-md">
              {mode === 'edit' ? 'Edit Prompt' : title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(prompt.id)}
              className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Favorite"
            >
              <Star className={`w-5 h-5 ${prompt.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
            <button
              onClick={() => setMode(mode === 'view' ? 'edit' : 'view')}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={mode === 'view' ? 'Edit' : 'View'}
            >
              {mode === 'view' ? <Edit3 className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {mode === 'edit' ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Tags (comma separated)</Label>
                <Input 
                  value={tagsInput} 
                  onChange={(e) => setTagsInput(e.target.value)} 
                  placeholder="e.g. saas, dark-mode, landing-page"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Prompt Content</Label>
                <Textarea 
                  value={promptText} 
                  onChange={(e) => setPromptText(e.target.value)} 
                  className="min-h-[220px] font-mono text-sm leading-relaxed"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {prompt.tags && prompt.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {prompt.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[350px] overflow-y-auto">
                {promptText}
              </div>
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Created: {new Date(prompt.createdAt).toLocaleString()}</span>
                <span>{promptText.split(/\s+/).filter(Boolean).length} words • {promptText.length} chars</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleDownloadTxt} className="gap-1.5 text-xs">
              <FileText className="w-3.5 h-3.5" /> TXT
            </Button>
            <Button size="sm" variant="outline" onClick={handleDownloadJson} className="gap-1.5 text-xs">
              <FileJson className="w-3.5 h-3.5" /> JSON
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {mode === 'edit' ? (
              <>
                <Button size="sm" variant="outline" onClick={() => setMode('view')}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" onClick={handleCopy} className="gap-1.5">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
                <Button size="sm" onClick={onClose}>
                  Done
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
