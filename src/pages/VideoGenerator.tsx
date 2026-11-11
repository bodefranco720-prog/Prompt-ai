import * as React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { PromptOutput } from '../components/generators/PromptOutput';
import { generateVideoPrompt } from '../utils/promptEngine';
import { Video, Wand2, RotateCcw, Sparkles } from 'lucide-react';
import { useAppStore } from '../store';

const videoTypes = [
  'Cinematic', 'Commercial', 'Short Form', 'Product Video', 'Explainer', 
  'Reel', 'Documentary', 'Animation', 'Story', 'Music Video', 'Teaser', 'Trailer'
];

const cameraMovements = [
  'Static', 'Pan (Left to Right)', 'Tilt (Up to Down)', 'Dolly In / Out', 
  'Tracking Subject', 'Crane / Jib Boom', '360 Circular Orbit', 'Cinematic Handheld', 'FPV Drone Flythrough', 'Smooth Optical Zoom'
];

const shotTypes = [
  'Wide Shot', 'Medium Shot', 'Close Up', 'Extreme Close Up', 'POV (First Person)', 'Aerial Vista', 'Over-the-Shoulder'
];

const aspectRatios = ['16:9 (Widescreen)', '9:16 (Vertical Reel / TikTok)', '1:1 (Square)', '4:5 (Instagram)', '2.39:1 (Anamorphic Cinema)'];

const frameRates = ['24fps (Cinematic Standard)', '30fps (Broadcast / Web)', '60fps (High Smoothness)', '120fps (Super Slow Motion)'];

const visualStyles = [
  'Hyperrealistic 35mm Film', 'Cyberpunk Neon Aesthetic', 'Moody Nordic Noir', 
  'Commercial High Key Gloss', 'Retro 1980s VHS Grain', 'Pixar 3D Animation'
];

const enhancementPresets = [
  { label: 'Cinematic', tag: 'anamorphic lens flares, rich color grading, shallow depth of field, high dynamic range' },
  { label: 'Viral', tag: 'high kinetic pacing, fast hook transition, vibrant eye-catching colors, dynamic zoom in' },
  { label: 'Commercial', tag: 'sleek studio lighting, pristine product isolation, elegant reflective floor sweep' },
  { label: 'Storytelling', tag: 'emotional character arch, atmospheric tension, subtle dramatic pauses' },
  { label: 'Professional', tag: 'broadcast-ready composition, seamless stabilization, clean color correction' },
];

const initialForm = {
  videoType: 'Cinematic',
  videoSubject: '',
  storyConcept: '',
  sceneDescription: '',
  characters: '',
  characterActions: '',
  environment: '',
  cameraMovement: 'Tracking Subject',
  shotType: 'Wide Shot',
  lens: '50mm Anamorphic Lens',
  lighting: 'Golden Hour Rim Light',
  timeOfDay: 'Sunset / Dusk',
  weather: 'Clear with light atmospheric mist',
  mood: 'Epic & Mysterious',
  visualStyle: 'Hyperrealistic 35mm Film',
  motionStyle: 'Fluid and cinematic continuous motion',
  transitions: 'Seamless match cut',
  duration: '10-15 seconds',
  aspectRatio: '16:9 (Widescreen)',
  frameRate: '24fps (Cinematic Standard)',
  colorGrading: 'Kodak 5219 film emulation with warm highlights and teal shadows',
  specialEffects: '',
  audioDetails: '',
  negativeRequirements: 'jittery motion, sudden warping, morphing artifacts, jerky cuts, blurry focus'
};

export default function VideoGenerator() {
  const [formData, setFormData] = React.useState(initialForm);
  const [activeEnhancements, setActiveEnhancements] = React.useState<string[]>(['Cinematic', 'Professional']);
  const [generatedPrompt, setGeneratedPrompt] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const { addToast, settings, addPrompt } = useAppStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleEnhancement = (label: string) => {
    setActiveEnhancements(prev =>
      prev.includes(label) ? prev.filter(e => e !== label) : [...prev, label]
    );
  };

  const handleReset = () => {
    setFormData(initialForm);
    setActiveEnhancements(['Cinematic', 'Professional']);
    setGeneratedPrompt(null);
    addToast({ title: 'Form reset to default', type: 'info' });
  };

  const handleGenerate = () => {
    if (!formData.videoSubject && !formData.sceneDescription) {
      addToast({ title: 'Please provide a Video Subject or Scene Description', type: 'error' });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const enhancementsTag = activeEnhancements.map(e => {
        const item = enhancementPresets.find(p => p.label === e);
        return item ? item.tag : e;
      }).join('; ');

      const combinedData = {
        ...formData,
        aspectRatio: formData.aspectRatio.split(' ')[0],
        frameRate: formData.frameRate.split(' ')[0],
        specialEffects: [formData.specialEffects, enhancementsTag ? `Directorial Enhancements: ${enhancementsTag}` : ''].filter(Boolean).join(', ')
      };

      const prompt = generateVideoPrompt(combinedData);
      setGeneratedPrompt(prompt);
      setIsGenerating(false);

      if (settings.autoSave) {
        addPrompt({
          title: `${formData.videoSubject.slice(0, 30) || 'Video Sequence'} Prompt`,
          category: 'video',
          promptText: prompt,
          isFavorite: false,
          tags: ['video', formData.videoType.toLowerCase(), formData.aspectRatio.split(' ')[0]]
        });
      }

      addToast({ title: 'Video prompt generated successfully', type: 'success' });
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 text-slate-900 dark:text-white">
            <Video className="w-8 h-8 text-emerald-500" />
            Video Prompt Generator
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Engineered shot lists and motion prompts for Runway Gen-2, Sora, Pika, and Stable Video.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5 self-start sm:self-auto text-xs">
          <RotateCcw className="w-3.5 h-3.5" /> Reset Form
        </Button>
      </div>

      {/* Enhancement Presets */}
      <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" /> Director Enhancements (Click to toggle)
        </div>
        <div className="flex flex-wrap gap-2">
          {enhancementPresets.map(enh => {
            const isActive = activeEnhancements.includes(enh.label);
            return (
              <button
                key={enh.label}
                type="button"
                onClick={() => toggleEnhancement(enh.label)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  isActive 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                }`}
              >
                {isActive && '✓ '} {enh.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="videoType">Video Format / Type</Label>
                <Select name="videoType" value={formData.videoType} onChange={handleInputChange}>
                  {videoTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aspectRatio">Aspect Ratio</Label>
                <Select name="aspectRatio" value={formData.aspectRatio} onChange={handleInputChange}>
                  {aspectRatios.map(ar => <option key={ar} value={ar}>{ar}</option>)}
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="videoSubject">Video Subject *</Label>
                <Input 
                  name="videoSubject" 
                  placeholder="e.g. A sleek matte-black electric supercar speeding along a coastal mountain road" 
                  value={formData.videoSubject} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="storyConcept">Concept & Narrative Context</Label>
                <Input 
                  name="storyConcept" 
                  placeholder="e.g. High-energy opening scene establishing speed and cutting-edge engineering" 
                  value={formData.storyConcept} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="sceneDescription">Scene Description & Environment</Label>
                <Textarea 
                  name="sceneDescription" 
                  placeholder="Describe the environment, time of day, weather, background scenery..." 
                  value={formData.sceneDescription} 
                  onChange={handleInputChange} 
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="characters">Characters / Actors</Label>
                <Input 
                  name="characters" 
                  placeholder="e.g. A solitary driver in racing helmet" 
                  value={formData.characters} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="characterActions">Character Actions</Label>
                <Input 
                  name="characterActions" 
                  placeholder="e.g. Shifts gears, glances at illuminated heads-up display" 
                  value={formData.characterActions} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            {/* Cinematography & Camera */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Camera & Motion Dynamics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cameraMovement">Camera Movement</Label>
                  <Select name="cameraMovement" value={formData.cameraMovement} onChange={handleInputChange}>
                    {cameraMovements.map(m => <option key={m} value={m}>{m}</option>)}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shotType">Shot Type & Framing</Label>
                  <Select name="shotType" value={formData.shotType} onChange={handleInputChange}>
                    {shotTypes.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frameRate">Frame Rate</Label>
                  <Select name="frameRate" value={formData.frameRate} onChange={handleInputChange}>
                    {frameRates.map(fr => <option key={fr} value={fr}>{fr}</option>)}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lens">Lens / Focal Length</Label>
                  <Input 
                    name="lens" 
                    placeholder="e.g. 50mm Anamorphic" 
                    value={formData.lens} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lighting">Lighting & Atmosphere</Label>
                  <Input 
                    name="lighting" 
                    placeholder="e.g. Golden hour rim lighting with lens flare" 
                    value={formData.lighting} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visualStyle">Visual & Color Grading Style</Label>
                  <Select name="visualStyle" value={formData.visualStyle} onChange={handleInputChange}>
                    {visualStyles.map(v => <option key={v} value={v}>{v}</option>)}
                  </Select>
                </div>
              </div>
            </div>

            {/* Audio, Dialogue & Constraints */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="audioDetails">Audio, Music & Voiceover Cues</Label>
                  <Input 
                    name="audioDetails" 
                    placeholder="e.g. Low rhythmic bass rumble accelerating into cinematic synth swell" 
                    value={formData.audioDetails} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialEffects">Special Effects & Transitions</Label>
                  <Input 
                    name="specialEffects" 
                    placeholder="e.g. Heat distortion waves behind exhaust, speed motion blur" 
                    value={formData.specialEffects} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="negativeRequirements">Negative Video Constraints (Artifacts to prevent)</Label>
                <Input 
                  name="negativeRequirements" 
                  placeholder="e.g. jittery camera, face morphing, warping geometry, stuttering frame rate" 
                  value={formData.negativeRequirements} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">
                Camera: {formData.cameraMovement} • {formData.aspectRatio.split(' ')[0]}
              </span>
              <Button 
                size="lg" 
                onClick={handleGenerate} 
                isLoading={isGenerating} 
                className="w-full sm:w-auto gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white border-0 px-8"
              >
                <Wand2 className="w-4 h-4" />
                Generate Video Prompt
              </Button>
            </div>
          </CardContent>
        </Card>

        {generatedPrompt && (
          <div id="output-section">
            <PromptOutput 
              promptText={generatedPrompt} 
              category="video" 
              title={`${formData.videoSubject.slice(0, 30) || 'Video Sequence'} Prompt`} 
              onRegenerate={handleGenerate}
            />
          </div>
        )}
      </div>
    </div>
  );
}
