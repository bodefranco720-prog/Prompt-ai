export type PromptCategory = 'web' | 'image' | 'video' | 'business';

export interface Prompt {
  id: string;
  title: string;
  category: PromptCategory;
  promptText: string;
  createdAt: string;
  isFavorite: boolean;
  tags: string[];
}

export interface Template {
  id: string;
  title: string;
  category: PromptCategory;
  promptText: string;
  preview: string;
  tags: string[];
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  autoSave: boolean;
  notifications: boolean;
  defaultCategory: PromptCategory;
  defaultOutputStyle: 'syntax' | 'plain';
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

export interface AppState {
  prompts: Prompt[];
  history: Prompt[];
  settings: UserSettings;
  toasts: Toast[];
  
  // Actions
  addPrompt: (prompt: Omit<Prompt, 'id' | 'createdAt'>) => Prompt;
  updatePrompt: (id: string, updates: Partial<Prompt>) => void;
  deletePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  clearHistory: () => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  resetSettings: () => void;
  clearAllData: () => void;
  importData: (data: { prompts?: Prompt[]; history?: Prompt[]; settings?: Partial<UserSettings> }) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}
