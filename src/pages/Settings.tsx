import * as React from 'react';
import { useAppStore } from '../store';
import { Card, CardContent } from '../components/ui/Card';
import { Label } from '../components/ui/Label';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { 
  Settings as SettingsIcon, Trash2, RotateCcw, Download, 
  Upload, Bell, Save, Sparkles, ShieldAlert 
} from 'lucide-react';
import { ConfirmModal } from '../components/ui/ConfirmModal';

export default function Settings() {
  const { 
    settings, prompts, history, updateSettings, resetSettings, 
    clearHistory, clearAllData, importData, addToast 
  } = useAppStore();

  const [activeModal, setActiveModal] = React.useState<'clearHistory' | 'clearAll' | 'resetSettings' | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleExportData = () => {
    const backup = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      prompts,
      history,
      settings,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `promptforge-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast({ title: 'Full backup exported successfully', type: 'success' });
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && (json.prompts || json.history || json.settings)) {
          importData(json);
          addToast({ title: 'Data imported successfully', type: 'success' });
        } else {
          addToast({ title: 'Invalid backup file format', type: 'error' });
        }
      } catch {
        addToast({ title: 'Failed to parse JSON file', type: 'error' });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 text-slate-900 dark:text-white">
          <SettingsIcon className="w-8 h-8 text-blue-500" />
          Platform Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Customize your experience, preferences, and data storage.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance & Interface */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" /> Appearance & Display
            </h3>
            
            <div className="grid gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <Label className="text-sm font-semibold">Theme Mode</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Choose between light, dark, or system preference.</p>
                </div>
                <Select 
                  value={settings.theme} 
                  onChange={(e) => updateSettings({ theme: e.target.value as any })} 
                  className="w-full sm:w-48 text-sm"
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                  <option value="system">System Preference</option>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <Label className="text-sm font-semibold">Default Output Style</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Rendering style for generated prompt previews.</p>
                </div>
                <Select 
                  value={settings.defaultOutputStyle || 'syntax'} 
                  onChange={(e) => updateSettings({ defaultOutputStyle: e.target.value as any })} 
                  className="w-full sm:w-48 text-sm"
                >
                  <option value="syntax">Syntax Highlighted</option>
                  <option value="plain">Plain Monospace</option>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generator Workflow Preferences */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Save className="w-4 h-4 text-purple-500" /> Workflow & Defaults
            </h3>
            
            <div className="grid gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <Label className="text-sm font-semibold">Default Generator Category</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">The primary generator opened when starting a new draft.</p>
                </div>
                <Select 
                  value={settings.defaultCategory} 
                  onChange={(e) => updateSettings({ defaultCategory: e.target.value as any })} 
                  className="w-full sm:w-48 text-sm"
                >
                  <option value="web">Web Generator</option>
                  <option value="image">Image Generator</option>
                  <option value="video">Video Generator</option>
                  <option value="business">Business Generator</option>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-semibold">Auto-save Generated Prompts</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Automatically store prompts in your local history.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.autoSave} 
                    onChange={(e) => updateSettings({ autoSave: e.target.checked })} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-semibold">In-app Notification Toasts</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Show notification toasts for actions like copying and saving.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications} 
                    onChange={(e) => updateSettings({ notifications: e.target.checked })} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Backup & Migration */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-500" /> Data Backup & Migration
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/40">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Export Full Workspace</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Download all saved prompts, history, and settings as a JSON file.
                  </p>
                </div>
                <Button size="sm" variant="outline" onClick={handleExportData} className="w-full gap-2 text-xs">
                  <Download className="w-3.5 h-3.5" /> Export JSON
                </Button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/40">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Import Workspace</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Restore previously exported prompts and templates from a JSON file.
                  </p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImportFile} 
                  accept=".json" 
                  className="hidden" 
                />
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()} 
                  className="w-full gap-2 text-xs"
                >
                  <Upload className="w-3.5 h-3.5" /> Import JSON
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 dark:border-red-900/40 bg-red-50/20 dark:bg-red-950/10">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-base font-bold text-red-700 dark:text-red-400 border-b border-red-200 dark:border-red-900/40 pb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500" /> Danger Zone
            </h3>
            
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div>
                  <Label className="text-sm font-semibold">Clear Prompt History</Label>
                  <p className="text-xs text-slate-500">Deletes recent session history ({history.length} items). Saved prompts in library remain safe.</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setActiveModal('clearHistory')}
                  className="shrink-0 text-xs text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 dark:border-red-900/50"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear History
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div>
                  <Label className="text-sm font-semibold">Reset Settings to Default</Label>
                  <p className="text-xs text-slate-500">Restores all theme, display, and workflow preferences to factory defaults.</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setActiveModal('resetSettings')}
                  className="shrink-0 text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Settings
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50">
                <div>
                  <Label className="text-sm font-semibold text-red-600 dark:text-red-400">Clear All Workspace Data</Label>
                  <p className="text-xs text-red-500/80">Permanently erases all saved prompts ({prompts.length}), history, and custom settings.</p>
                </div>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => setActiveModal('clearAll')}
                  className="shrink-0 text-xs gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Erase All Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Modals */}
      <ConfirmModal
        isOpen={activeModal === 'clearHistory'}
        title="Clear Prompt History"
        message="Are you sure you want to clear your generation history? This will delete all temporary generated prompts from history. Your saved prompts in My Prompts will NOT be deleted."
        confirmText="Clear History"
        variant="danger"
        onConfirm={() => {
          clearHistory();
          setActiveModal(null);
          addToast({ title: 'History cleared', type: 'success' });
        }}
        onCancel={() => setActiveModal(null)}
      />

      <ConfirmModal
        isOpen={activeModal === 'resetSettings'}
        title="Reset Settings"
        message="Are you sure you want to reset all platform settings back to default? Your saved prompts will be preserved."
        confirmText="Reset Settings"
        variant="primary"
        onConfirm={() => {
          resetSettings();
          setActiveModal(null);
          addToast({ title: 'Settings restored to defaults', type: 'success' });
        }}
        onCancel={() => setActiveModal(null)}
      />

      <ConfirmModal
        isOpen={activeModal === 'clearAll'}
        title="Permanently Erase All Data"
        message="WARNING: This action is permanent and cannot be undone. It will delete all your saved prompts, favorites, history, and custom settings."
        confirmText="Yes, Erase Everything"
        variant="danger"
        onConfirm={() => {
          clearAllData();
          setActiveModal(null);
          addToast({ title: 'All workspace data erased', type: 'success' });
        }}
        onCancel={() => setActiveModal(null)}
      />
    </div>
  );
}
