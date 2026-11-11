import * as React from 'react';
import { Card, CardContent, CardFooter } from './Card';
import { Button } from './Button';
import { Prompt } from '../../types';
import { useAppStore } from '../../store';
import { 
  Copy, Star, Trash2, Globe, Image as ImageIcon, Video, Briefcase, 
  Download, Eye, Edit3, CopyPlus, Share2, FileText, FileJson, Check 
} from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';
import { PromptDetailModal } from './PromptDetailModal';

export const PromptCard: React.FC<{ prompt: Prompt }> = ({ prompt }) => {
  const { toggleFavorite, deletePrompt, addPrompt, addToast } = useAppStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);
  const [detailMode, setDetailMode] = React.useState<'view' | 'edit'>('view');
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.promptText);
      setCopied(true);
      addToast({ title: 'Copied to clipboard', type: 'success' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast({ title: 'Failed to copy', type: 'error' });
    }
  };

  const handleDuplicate = () => {
    addPrompt({
      title: `${prompt.title} (Copy)`,
      category: prompt.category,
      promptText: prompt.promptText,
      isFavorite: false,
      tags: [...(prompt.tags || [])]
    });
    addToast({ title: 'Prompt duplicated successfully', type: 'success' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: prompt.title,
          text: prompt.promptText,
        });
        addToast({ title: 'Shared successfully', type: 'success' });
      } catch {
        // User cancelled or failed
      }
    } else {
      handleCopy();
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([prompt.promptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prompt.title.replace(/\s+/g, '-').toLowerCase()}-prompt.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast({ title: 'Downloaded prompt as TXT', type: 'success' });
  };

  const handleOpenModal = (mode: 'view' | 'edit') => {
    setDetailMode(mode);
    setIsDetailModalOpen(true);
  };

  const Icon = {
    web: Globe,
    image: ImageIcon,
    video: Video,
    business: Briefcase
  }[prompt.category];

  const categoryColor = {
    web: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
    image: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
    video: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
    business: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20'
  }[prompt.category];

  return (
    <>
      <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-all duration-200 border-slate-200/80 dark:border-slate-800 group">
        <CardContent className="p-5 flex-1 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${categoryColor} shadow-sm`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {prompt.title}
                </h4>
                <p className="text-xs text-slate-500">{new Date(prompt.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <button 
              onClick={() => toggleFavorite(prompt.id)}
              className="text-slate-400 hover:text-amber-500 transition-colors p-1 rounded-md"
              title={prompt.isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
            >
              <Star className={`w-5 h-5 ${prompt.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>
          
          <div 
            onClick={() => handleOpenModal('view')}
            className="cursor-pointer bg-slate-50 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl p-3.5 text-sm text-slate-600 dark:text-slate-300 font-mono line-clamp-3 border border-slate-100 dark:border-slate-800/80 transition-colors"
            title="Click to view full prompt"
          >
            {prompt.promptText}
          </div>

          {prompt.tags && prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {prompt.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  #{tag}
                </span>
              ))}
              {prompt.tags.length > 3 && (
                <span className="px-1.5 py-0.5 rounded-md text-[11px] text-slate-400">
                  +{prompt.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-3 px-4 flex flex-wrap items-center justify-between gap-1 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" onClick={() => handleOpenModal('view')} title="View full prompt" className="h-8 w-8 p-0">
              <Eye className="w-3.5 h-3.5" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => handleOpenModal('edit')} title="Edit prompt" className="h-8 w-8 p-0">
              <Edit3 className="w-3.5 h-3.5" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDuplicate} title="Duplicate prompt" className="h-8 w-8 p-0">
              <CopyPlus className="w-3.5 h-3.5" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleShare} title="Share prompt" className="h-8 w-8 p-0">
              <Share2 className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" onClick={handleDownloadTxt} title="Download TXT" className="h-8 w-8 p-0">
              <Download className="w-3.5 h-3.5" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCopy} title="Copy" className="h-8 w-8 p-0">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950" 
              onClick={() => setIsDeleteModalOpen(true)} 
              title="Delete prompt"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Prompt"
        message={`Are you sure you want to delete "${prompt.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        onConfirm={() => {
          deletePrompt(prompt.id);
          setIsDeleteModalOpen(false);
          addToast({ title: 'Prompt deleted', type: 'success' });
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      {/* Full Detail / Edit Modal */}
      <PromptDetailModal
        prompt={prompt}
        isOpen={isDetailModalOpen}
        initialMode={detailMode}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </>
  );
};
