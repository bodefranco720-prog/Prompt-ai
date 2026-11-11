import * as React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { PromptOutput } from '../components/generators/PromptOutput';
import { generateImagePrompt } from '../utils/promptEngine';
import { Image as ImageIcon, Wand2, RotateCcw, Sparkles } from 'lucide-react';
import { useAppStore } from '../store';

const imageTypes = [
  'Photo', 'Digital Art', '3D Render', 'Anime', 'Illustration', 
  'Oil Painting', 'Concept Art', 'Realistic', 'Cinematic', 'Vector', 'Logo',
  'Product Photography', 'Portrait', 'Fashion', 'Food Photography', 'Architecture'
];

const cameraAngles = [
  'Eye Level', 'Low Angle', 'High Angle', 'Top Down', 'Macro', 'Drone Aerial', 'Wide Angle', 'Close Up'
];

const lightingOptions = [
  'Natural Light', 'Studio Light', 'Dramatic Volumetric', 'Golden Hour', 
  'Cinematic Rim Lighting', 'Cyberpunk Neon', 'Soft Diffused', 'Moody Chiaroscuro'
];

const moodOptions = [
  'Mysterious', 'Vibrant', 'Dark & Atmospheric', 'Peaceful', 'Energetic', 
  'Romantic', 'Epic', 'Luxury', 'Minimalist'
];

const colorPalettes = [
  'Vibrant & Bold', 'Pastel', 'Monochromatic Dark', 'Neon Cyberpunk', 
  'Earthy Tones', 'Moody Teal & Orange', 'High Contrast Black & Gold'
];

const lensOptions = [
  '35mm Street Lens', '50mm Prime Lens', '85mm Portrait Lens', 'Macro 100mm', 
  'Shallow Depth of Field (f/1.4)', 'Deep Focus (f/8)'
];

const visualStyles = [
  'Photorealistic', 'Cyberpunk', 'Fantasy Unreal Engine 5', 'Minimalist Editorial', 
  'Sci-Fi Octane Render', 'Vintage 35mm Film', 'Hyperrealistic 8K'
];

const aspectRatios = ['1:1', '16:9', '9:16', '4:5', '3:2', '21:9'];

const imageQualities = [
  'Highly detailed, 8K resolution, Masterpiece, Ultra realistic',
  'Unreal Engine 5 render, ray tracing, octane render, 8K',
  'Authentic 35mm Kodak Portra film grain, soft bloom, natural textures',
  'Crisp sharp vector linework, high dynamic range'
];

const enhancementPresets = [
  { label: 'Cinematic', tag: 'anamorphic lens flare, cinematic lighting, 8k resolution, photorealistic' },
  { label: 'Photorealistic', tag: 'shot on 85mm lens, f/1.8, highly realistic skin and surface texture' },
  { label: 'Luxury', tag: 'high-end commercial aesthetic, elegant gold reflections, minimalist luxury feel' },
  { label: 'Commercial', tag: 'clean studio lighting, professional product staging, sharp commercial focus' },
  { label: 'Creative', tag: 'surrealist composition, artistic lighting, award-winning concept art' },
  { label: 'Detailed', tag: 'intricate micro-details, hyper-detailed textures, volumetric atmospheric dust' },
  { label: 'Social Media', tag: 'high engagement aesthetic, vibrant colors, viral social media creative' },
];

const initialForm = {
  imageType: 'Photo',
  subject: '',
  scene: '',
  environment: '',
  cameraAngle: 'Eye Level',
  lighting: 'Studio Light',
  mood: 'Vibrant',
  colorPalette: 'High Contrast Black & Gold',
  cameraLens: '85mm Portrait Lens',
  depthOfField: 'Shallow Depth of Field (f/1.4)',
  visualStyle: 'Photorealistic',
  aspectRatio: '16:9',
  imageQuality: 'Highly detailed, 8K resolution, Masterpiece, Ultra realistic',
  details: '',
  negativePrompt: 'blurry, low quality, distorted, extra limbs, watermark, text, out of frame',
  brandInfo: ''
};

export default function ImageGenerator() {
  const [formData, setFormData] = React.useState(initialForm);
  const [activeEnhancements, setActiveEnhancements] = React.useState<string[]>(['Cinematic', 'Detailed']);
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
    setActiveEnhancements(['Cinematic', 'Detailed']);
    setGeneratedPrompt(null);
    addToast({ title: 'Form reset to default', type: 'info' });
  };

  const handleGenerate = () => {
    if (!formData.subject) {
      addToast({ title: 'Please provide a Subject for the image', type: 'error' });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const enhancementsTag = activeEnhancements.map(e => {
        const item = enhancementPresets.find(p => p.label === e);
        return item ? item.tag : e;
      }).join(', ');

      const combinedData = {
        ...formData,
        details: [formData.details, enhancementsTag, formData.brandInfo ? `Brand Context: ${formData.brandInfo}` : ''].filter(Boolean).join(', ')
      };

      const prompt = generateImagePrompt(combinedData);
      setGeneratedPrompt(prompt);
      setIsGenerating(false);

      if (settings.autoSave) {
        addPrompt({
          title: `${formData.subject.slice(0, 30)} (Image)`,
          category: 'image',
          promptText: prompt,
          isFavorite: false,
          tags: ['image', formData.imageType.toLowerCase(), formData.aspectRatio]
        });
      }

      addToast({ title: 'Image prompt generated successfully', type: 'success' });
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 text-slate-900 dark:text-white">
            <ImageIcon className="w-8 h-8 text-purple-500" />
            Image Prompt Generator
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Generate photorealistic, studio-quality prompts for Midjourney, DALL-E 3, and Stable Diffusion.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5 self-start sm:self-auto text-xs">
          <RotateCcw className="w-3.5 h-3.5" /> Reset Form
        </Button>
      </div>

      {/* Enhancement Buttons */}
      <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          <Sparkles className="w-3.5 h-3.5" /> Style Enhancements (Click to toggle)
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
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-purple-400'
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
                <Label htmlFor="imageType">Image Type / Medium</Label>
                <Select name="imageType" value={formData.imageType} onChange={handleInputChange}>
                  {imageTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aspectRatio">Aspect Ratio</Label>
                <Select name="aspectRatio" value={formData.aspectRatio} onChange={handleInputChange}>
                  {aspectRatios.map(ar => <option key={ar} value={ar}>{ar} ({ar === '16:9' ? 'Widescreen' : ar === '9:16' ? 'Vertical Story' : ar === '1:1' ? 'Square' : ar === '4:5' ? 'Social Post' : ar})</option>)}
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="subject">Main Subject *</Label>
                <Input 
                  name="subject" 
                  placeholder="e.g. A futuristic sleek cybernetic mechanical watch with glowing internal sapphire gears" 
                  value={formData.subject} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scene">Scene & Composition</Label>
                <Input 
                  name="scene" 
                  placeholder="e.g. Resting on a wet black slate rock with delicate water ripples" 
                  value={formData.scene} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="environment">Environment / Background</Label>
                <Input 
                  name="environment" 
                  placeholder="e.g. Dark moody volcanic rock landscape with distant city fog" 
                  value={formData.environment} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            {/* Camera & Lighting */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Camera & Cinematography</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cameraAngle">Camera Angle</Label>
                  <Select name="cameraAngle" value={formData.cameraAngle} onChange={handleInputChange}>
                    {cameraAngles.map(angle => <option key={angle} value={angle}>{angle}</option>)}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lighting">Lighting Setup</Label>
                  <Select name="lighting" value={formData.lighting} onChange={handleInputChange}>
                    {lightingOptions.map(light => <option key={light} value={light}>{light}</option>)}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cameraLens">Lens & Focal Length</Label>
                  <Select name="cameraLens" value={formData.cameraLens} onChange={handleInputChange}>
                    {lensOptions.map(lens => <option key={lens} value={lens}>{lens}</option>)}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mood">Mood / Atmosphere</Label>
                  <Select name="mood" value={formData.mood} onChange={handleInputChange}>
                    {moodOptions.map(m => <option key={m} value={m}>{m}</option>)}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="colorPalette">Color Palette</Label>
                  <Select name="colorPalette" value={formData.colorPalette} onChange={handleInputChange}>
                    {colorPalettes.map(c => <option key={c} value={c}>{c}</option>)}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visualStyle">Visual Style Preset</Label>
                  <Select name="visualStyle" value={formData.visualStyle} onChange={handleInputChange}>
                    {visualStyles.map(v => <option key={v} value={v}>{v}</option>)}
                  </Select>
                </div>
              </div>
            </div>

            {/* Quality & Negative Prompts */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imageQuality">Image Quality & Rendering Engine</Label>
                <Select name="imageQuality" value={formData.imageQuality} onChange={handleInputChange}>
                  {imageQualities.map(q => <option key={q} value={q}>{q}</option>)}
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="details">Extra Aesthetic Details</Label>
                  <Input 
                    name="details" 
                    placeholder="e.g. golden rim reflection, atmospheric dust motes, water droplets" 
                    value={formData.details} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandInfo">Brand / Logo Info (Optional)</Label>
                  <Input 
                    name="brandInfo" 
                    placeholder="e.g. Minimalist luxury watch brand aesthetic" 
                    value={formData.brandInfo} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="negativePrompt">Negative Prompt (Elements to avoid)</Label>
                <Textarea 
                  name="negativePrompt" 
                  placeholder="e.g. blurry, low quality, distorted, extra limbs, watermark, signature" 
                  value={formData.negativePrompt} 
                  onChange={handleInputChange} 
                  className="min-h-[70px]"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">
                Aspect ratio: {formData.aspectRatio} • {activeEnhancements.length} enhancements active
              </span>
              <Button 
                size="lg" 
                onClick={handleGenerate} 
                isLoading={isGenerating} 
                className="w-full sm:w-auto gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white border-0 px-8"
              >
                <Wand2 className="w-4 h-4" />
                Generate Image Prompt
              </Button>
            </div>
          </CardContent>
        </Card>

        {generatedPrompt && (
          <div id="output-section">
            <PromptOutput 
              promptText={generatedPrompt} 
              category="image" 
              title={`${formData.subject.slice(0, 30) || 'Image'} Prompt`} 
              onRegenerate={handleGenerate}
            />
          </div>
        )}
      </div>
    </div>
  );
}
