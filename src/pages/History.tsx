import * as React from 'react';
import { useAppStore } from '../store';
import { PromptCard } from '../components/ui/PromptCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Clock, Trash2, Search, Filter } from 'lucide-react';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { PromptCategory } from '../types';

export default function History() {
  const { history, clearHistory, addToast } = useAppStore();
  const [isClearModalOpen, setIsClearModalOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState<'all' | PromptCategory>('all');

  const filteredHistory = history.filter(prompt => {
    const matchesCategory = categoryFilter === 'all' || prompt.category === categoryFilter;
    const matchesSearch = 
      prompt.title.toLowerCase().includes(search.toLowerCase()) ||
      prompt.promptText.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 text-slate-900 dark:text-white">
            <Clock className="w-8 h-8 text-blue-500" />
            Prompt History
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Automatically tracks your recently generated prompts. (Stored locally up to 50 entries)
          </p>
        </div>
        {history.length > 0 && (
          <Button variant="danger" size="sm" onClick={() => setIsClearModalOpen(true)} className="gap-2 shrink-0">
            <Trash2 className="w-4 h-4" /> Clear History
          </Button>
        )}
      </div>

      {/* Filter and Search Bar */}
      {history.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            {(['all', 'web', 'image', 'video', 'business'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  categoryFilter === cat 
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search history..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
        </div>
      )}

      {history.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white/40 dark:bg-slate-900/40">
          <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No history yet</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Generate prompts using any of our 4 generators to see your recent activity automatically logged here.
          </p>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">No matching history found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={isClearModalOpen}
        title="Clear Generation History"
        message="Are you sure you want to clear all prompt generation history? Your saved prompts in My Prompts library will remain safe."
        confirmText="Clear History"
        variant="danger"
        onConfirm={() => {
          clearHistory();
          setIsClearModalOpen(false);
          addToast({ title: 'History cleared', type: 'success' });
        }}
        onCancel={() => setIsClearModalOpen(false)}
      />
    </div>
  );
}
