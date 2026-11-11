import * as React from 'react';
import { useAppStore } from '../store';
import { PromptCard } from '../components/ui/PromptCard';
import { Input } from '../components/ui/Input';
import { Search, Star } from 'lucide-react';
import { PromptCategory } from '../types';

export default function Favorites() {
  const prompts = useAppStore(state => state.prompts);
  const [search, setSearch] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState<'all' | PromptCategory>('all');

  const favoritePrompts = prompts.filter(p => {
    if (!p.isFavorite) return false;
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch = 
      p.title.toLowerCase().includes(search.toLowerCase()) || 
      p.promptText.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 text-slate-900 dark:text-white">
            <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
            Favorite Prompts
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Quick access to your curated and starred prompts.
          </p>
        </div>
      </div>

      {prompts.some(p => p.isFavorite) && (
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
              placeholder="Search favorites..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
        </div>
      )}

      {favoritePrompts.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white/40 dark:bg-slate-900/40">
          <Star className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No favorites found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Star any prompt across your library to pin it here for rapid access.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritePrompts.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  );
}
