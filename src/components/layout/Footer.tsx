import * as React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 mt-auto shrink-0">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">PromptForge AI</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Create smarter prompts. Get better results.</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-sm text-slate-600 dark:text-slate-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
            <Link to="/generate/web" className="hover:text-blue-600 dark:hover:text-blue-400">Generators</Link>
            <Link to="/templates" className="hover:text-blue-600 dark:hover:text-blue-400">Templates</Link>
            <Link to="/help" className="hover:text-blue-600 dark:hover:text-blue-400">Help</Link>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Terms</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} PromptForge AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
