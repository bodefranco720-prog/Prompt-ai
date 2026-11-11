import * as React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Globe, Image as ImageIcon, Video, Briefcase, 
  BookOpen, Clock, Star, LayoutTemplate, Settings as SettingsIcon, 
  HelpCircle, Info, Menu, Search, Sun, Moon, Laptop, Sparkles 
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAppStore } from '../../store';
import { Toaster } from '../ui/Toaster';
import { Footer } from './Footer';
import { GlobalSearchModal } from './GlobalSearchModal';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings, updateSettings } = useAppStore();

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (settings.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(settings.theme);
    }
  }, [settings.theme]);

  const toggleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(settings.theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    updateSettings({ theme: nextTheme });
  };

  const NavItem = ({ to, icon: Icon, children }: { to: string; icon: React.ElementType; children: React.ReactNode }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-semibold'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50'
        )
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      {children}
    </NavLink>
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-x-4 border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-[#0B0F19]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-slate-700 dark:text-slate-300 lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/logo.png" 
              alt="PromptForge Logo" 
              className="w-10 h-10 rounded-full shadow-sm object-cover"
              referrerPolicy="no-referrer"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              PromptForge AI
            </h1>
          </div>
        </div>

        {/* Global Search Button */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-400 text-sm hover:border-blue-500/50 transition-all shadow-inner"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search prompts, templates, tools...</span>
            </span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 sm:hidden text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Current theme: ${settings.theme} (Click to toggle)`}
          >
            {settings.theme === 'light' && <Sun className="h-5 w-5 text-amber-500" />}
            {settings.theme === 'dark' && <Moon className="h-5 w-5 text-blue-400" />}
            {settings.theme === 'system' && <Laptop className="h-5 w-5 text-purple-400" />}
          </button>

          <button
            onClick={() => navigate('/settings')}
            className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Settings"
          >
            <SettingsIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={cn(
            'fixed inset-0 z-50 lg:static lg:block lg:w-64 lg:shrink-0 lg:border-r lg:border-slate-200 lg:dark:border-slate-800 lg:bg-white lg:dark:bg-[#0B0F19]',
            isMobileMenuOpen ? 'block' : 'hidden'
          )}
        >
          {/* Mobile backdrop */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-slate-900/80 lg:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#0B0F19] lg:static lg:w-full h-full flex flex-col">
            <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 lg:hidden">
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="PromptForge Logo" 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-bold text-lg text-slate-900 dark:text-white">PromptForge</span>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-3">
                  Generators
                </div>
                <div className="space-y-1">
                  <NavItem to="/" icon={Home}>Dashboard</NavItem>
                  <NavItem to="/generate/web" icon={Globe}>Web Prompts</NavItem>
                  <NavItem to="/generate/image" icon={ImageIcon}>Image Prompts</NavItem>
                  <NavItem to="/generate/video" icon={Video}>Video Prompts</NavItem>
                  <NavItem to="/generate/business" icon={Briefcase}>Business Prompts</NavItem>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-3">
                  Library
                </div>
                <div className="space-y-1">
                  <NavItem to="/my-prompts" icon={BookOpen}>My Prompts</NavItem>
                  <NavItem to="/favorites" icon={Star}>Favorites</NavItem>
                  <NavItem to="/history" icon={Clock}>History</NavItem>
                  <NavItem to="/templates" icon={LayoutTemplate}>Templates</NavItem>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-3">
                  System
                </div>
                <div className="space-y-1">
                  <NavItem to="/settings" icon={SettingsIcon}>Settings</NavItem>
                  <NavItem to="/help" icon={HelpCircle}>Help & Guide</NavItem>
                  <NavItem to="/about" icon={Info}>About</NavItem>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
      
      <GlobalSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
      <Toaster />
    </div>
  );
}
