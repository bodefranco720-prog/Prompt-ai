import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { AppState, PromptCategory, UserSettings } from '../types';

const defaultSettings: UserSettings = {
  theme: 'system',
  autoSave: true,
  notifications: true,
  defaultCategory: 'web',
  defaultOutputStyle: 'syntax',
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      prompts: [],
      history: [],
      settings: defaultSettings,
      toasts: [],

      addPrompt: (promptData) => {
        const newPrompt = {
          ...promptData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          prompts: [...state.prompts, newPrompt],
          history: [newPrompt, ...state.history].slice(0, 50), // Keep last 50 in history
        }));

        return newPrompt;
      },

      updatePrompt: (id, updates) => {
        set((state) => ({
          prompts: state.prompts.map((p) => (p.id === id ? { ...p, ...updates } : p)),
          history: state.history.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },

      deletePrompt: (id) => {
        set((state) => ({
          prompts: state.prompts.filter((p) => p.id !== id),
          history: state.history.filter((p) => p.id !== id),
        }));
      },

      toggleFavorite: (id) => {
        set((state) => {
          const updateFn = (p: any) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p);
          return {
            prompts: state.prompts.map(updateFn),
            history: state.history.map(updateFn),
          };
        });
      },

      clearHistory: () => {
        set({ history: [] });
      },

      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },

      resetSettings: () => {
        set({ settings: defaultSettings });
      },

      clearAllData: () => {
        set({
          prompts: [],
          history: [],
          settings: defaultSettings,
        });
      },

      importData: (data) => {
        set((state) => ({
          prompts: data.prompts && Array.isArray(data.prompts) ? data.prompts : state.prompts,
          history: data.history && Array.isArray(data.history) ? data.history : state.history,
          settings: data.settings ? { ...state.settings, ...data.settings } : state.settings,
        }));
      },

      addToast: (toast) => {
        const id = uuidv4();
        set((state) => ({
          toasts: [...state.toasts, { ...toast, id }],
        }));
        setTimeout(() => {
          get().removeToast(id);
        }, 5000);
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      },
    }),
    {
      name: 'promptforge-storage',
      partialize: (state) => ({
        prompts: state.prompts,
        history: state.history,
        settings: state.settings,
      }),
    }
  )
);
