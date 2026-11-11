import * as React from 'react';
import { useAppStore } from '../store';
import { PromptCard } from '../components/ui/PromptCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { 
  Search, BookOpen, LayoutGrid, List, Download, 
  ArrowUpDown, Star, Plus 
} from 'lucide-react';
import { Select } from '../components/ui/Select';
import { PromptCategory } from '../types';
import { useNavigate } from 'react-router-dom';

export default function MyPrompts() {
  const { prompts, addToast } = useAppStore();
  const navigate = useNavigate();

  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState<PromptCategory | 'all'>('all');
  const [onlyFavorites, setOnlyFavorites] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'newest' | 'oldest' | 'az'>('newest');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const filteredPrompts = prompts
    .filter(p => {
      const matchesSearch = 
        p.title.toLowerCase().includes(search.toLowerCase()) || 
        p.promptText.toLowerCase().includes(search.toLowerCase()) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));
      const matchesCategory = filter === 'all' || p.category === filter;
      const matchesFavorite = !onlyFavorites || p.isFavorite;
      return matchesSearch && matchesCategory && matchesFavorite;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'az') return a.title.localeCompare(b.title);
      return 0;
    });

  const handleExportAllJSON = () => {
    if (prompts.length === 0) {
      addToast({ title: 'No prompts to export', type: 'error' });
      return;
    }
    const blob = new Blob([JSON.stringify(prompts, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `promptforge-library-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast({ title: `Exported ${prompts.length} prompts (JSON)`, type: 'success' });
  };

  const handleExportAllCSV = () => {
    if (prompts.length === 0) {
      addToast({ title: 'No prompts to export', type: 'error' });
      return;
    }
    const headers = ['ID', 'Title', 'Category', 'Created At', 'Favorite', 'Tags', 'Prompt Text'];
    const rows = prompts.map(p => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      p.category,
      p.createdAt,
      p.isFavorite ? 'Yes' : 'No',
      `"${(p.tags || []).join(', ')}"`,
      `"${p.promptText.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `promptforge-library-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast({ title: `Exported ${prompts.length} prompts (CSV)`, type: 'success' });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 text-slate-900 dark:text-white">
            <BookOpen className="w-8 h-8 text-blue-500" />
            My Prompts Library
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Organize, search, inspect, and export your curated prompts ({prompts.length} total saved).
          </p>
        </div>

        {prompts.length > 0 && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportAllJSON} className="text-xs gap-1.5">
              <Download className="w-3.5 h-3.5" /> Export JSON
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportAllCSV} className="text-xs gap-1.5">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </Button>
          </div>
        )}
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search prompts by title, keywords, or tags..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as PromptCategory | 'all')}
              className="w-full sm:w-40 text-xs font-medium"
            >
              <option value="all">All Categories</option>
              <option value="web">Web Prompts</option>
              <option value="image">Image Prompts</option>
              <option value="video">Video Prompts</option>
              <option value="business">Business Prompts</option>
            </Select>

            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                onlyFavorites 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400' 
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Show only starred favorites"
            >
              <Star className={`w-4 h-4 ${onlyFavorites ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">Favorites</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <Select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-32 text-xs font-medium"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">Title A-Z</option>
            </Select>
          </div>

          <div className="flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-400'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-400'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Prompts Display */}
      {prompts.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white/40 dark:bg-slate-900/40 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Your library is empty</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Save generated prompts from any generator or clone starter templates to build your personal library.
            </p>
          </div>
          <Button onClick={() => navigate('/generate/web')} className="gap-2">
            <Plus className="w-4 h-4" /> Create First Prompt
          </Button>
        </div>
      ) : filteredPrompts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">No matching prompts</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting your category or search query.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
          {filteredPrompts.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  );
}
