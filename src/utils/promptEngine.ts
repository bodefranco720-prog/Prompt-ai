export const generateWebPrompt = (data: any) => {
  const {
    projectType, websiteName, businessName, industry, targetAudience, websiteGoal,
    pagesRequired, designStyle, colorPreferences, typographyPreference, features, technology, extraRequirements
  } = data;

  const pagesFormatted = Array.isArray(pagesRequired) 
    ? pagesRequired.map((p: string) => `- ${p}`).join('\n') 
    : (pagesRequired ? pagesRequired.split(',').map((p: string) => `- ${p.trim()}`).join('\n') : '- Home\n- Features\n- Pricing\n- Contact');

  const featuresFormatted = Array.isArray(features) && features.length > 0
    ? features.map((f: string) => `- ${f}`).join('\n')
    : '- Responsive Design\n- Clean navigation\n- Contact Form';

  const techFormatted = Array.isArray(technology) 
    ? technology.join(', ') 
    : (technology || 'Modern React, TypeScript, and Tailwind CSS');

  return `You are an elite Lead Frontend Architect, UX/UI Designer, and Full-Stack Web Engineer.

PROJECT CONTEXT & IDENTITY:
- Application Type: ${projectType || 'Modern SaaS Web Application'}
- Brand / Project Name: "${websiteName || businessName || 'PromptForge'}"
- Industry / Vertical: ${industry || 'Technology & Digital Products'}
- Primary Objective: ${websiteGoal || 'Drive customer engagement, conversions, and provide an intuitive product experience.'}
- Target Audience: ${targetAudience || 'General digital consumers and modern professionals.'}

SITEMAP & PAGES REQUIRED:
${pagesFormatted}

DESIGN SYSTEM & VISUAL LANGUAGE:
- Aesthetic Paradigm: ${designStyle || 'Modern, clean, and minimalist'}
- Color Palette: ${colorPreferences || 'High-contrast accessible theme with refined neutral undertones'}
- Typography Hierarchy: ${typographyPreference || 'Modern sans-serif (Inter / Plus Jakarta Sans) with optical scaling'}

MANDATORY CORE FEATURES & COMPONENTS:
${featuresFormatted}

RECOMMENDED TECHNOLOGY STACK:
- ${techFormatted}

ENGINEERING STANDARDS & CONSTRAINTS:
1. Strict WCAG 2.1 AA accessibility compliance (color contrast, ARIA landmarks, keyboard navigation).
2. Mobile-first responsive breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px).
3. Component-driven architecture with separation of state, logic, and presentation.
4. Optimized for Core Web Vitals (minimal layout shifts, fast initial contentful paint).

${extraRequirements ? `ARCHITECTURAL CONSTRAINTS & ENHANCEMENTS:\n${extraRequirements}\n` : ''}
DELIVERABLE:
Provide a production-ready, modular code implementation or an exhaustive technical specification including folder structure, state management pattern, and essential component layouts.`;
};

export const generateImagePrompt = (data: any) => {
  const {
    imageType, subject, scene, environment, background, cameraAngle, composition,
    lighting, mood, colorPalette, cameraLens, depthOfField, visualStyle, aspectRatio,
    imageQuality, details, negativePrompt, brandInfo
  } = data;

  const promptParts = [
    imageType ? `${imageType} of` : 'A photorealistic professional photograph of',
    subject,
    scene && `in a ${scene}`,
    environment && `, environment: ${environment}`,
    background && `, background: ${background}`,
    cameraAngle && `, shot from ${cameraAngle}`,
    composition && `, ${composition} composition`,
    lighting && `, ${lighting}`,
    mood && `, ${mood} atmosphere`,
    colorPalette && `, ${colorPalette} color grading`,
    cameraLens && `, shot on ${cameraLens}`,
    depthOfField && `, ${depthOfField}`,
    visualStyle && `, ${visualStyle} aesthetic`,
    brandInfo && `, aesthetic cues for ${brandInfo}`,
    details && `, ${details}`,
    imageQuality ? `, ${imageQuality}` : ', masterpiece, highly detailed, 8k resolution, photorealistic'
  ].filter(Boolean).join(' ');

  let finalPrompt = promptParts;
  
  if (aspectRatio) {
    const cleanAr = aspectRatio.split(' ')[0];
    finalPrompt += ` --ar ${cleanAr}`; 
  }

  if (negativePrompt) {
    finalPrompt += `\n\n[Negative Prompt]: ${negativePrompt}, low quality, blurry, deformed, distorted, signature, watermark.`;
  }

  return finalPrompt;
};

export const generateVideoPrompt = (data: any) => {
  const {
    videoType, videoSubject, storyConcept, sceneDescription, characters, characterActions,
    environment, cameraMovement, shotType, lens, lighting, timeOfDay, weather, mood,
    visualStyle, motionStyle, transitions, duration, aspectRatio, frameRate, colorGrading,
    specialEffects, audioDetails, negativeRequirements
  } = data;

  return `You are an award-winning Film Director, Director of Photography (DP), and Generative AI Motion Artist.

DIRECTORIAL BRIEF:
- Video Format: ${videoType || 'Cinematic Production'}
- Core Subject: ${videoSubject || 'Not specified'}
- Narrative Concept: ${storyConcept || 'Dynamic sequence capturing movement and emotional resonance.'}

SCENE & ENVIRONMENT:
- Environment: ${environment || sceneDescription || 'Richly textured environment with atmospheric depth.'}
- Time of Day / Lighting: ${timeOfDay || 'Golden Hour'} / ${lighting || 'Volumetric natural light with subtle rim illumination'}
- Weather: ${weather || 'Clear atmosphere with soft airborne particles'}
- Mood / Vibe: ${mood || 'Cinematic, immersive, and visually compelling'}

CHARACTERS & CHOREOGRAPHY:
- Characters: ${characters || 'Focal subject'}
- Action / Movement: ${characterActions || 'Organic, fluid continuous movement through the frame'}

CINEMATOGRAPHY & CAMERA DYNAMICS:
- Camera Movement: ${cameraMovement || 'Tracking Subject with subtle stabilization'}
- Shot Framing: ${shotType || 'Wide cinematic framing'}
- Focal Length / Lens: ${lens || '50mm anamorphic lens with gentle edge bokeh'}
- Motion Style: ${motionStyle || 'Fluid cinematic pacing without abrupt jerks'}

COLOR & POST-PRODUCTION:
- Visual Style: ${visualStyle || 'Hyperrealistic 35mm film aesthetic'}
- Color Grading: ${colorGrading || 'Rich contrast with film emulation'}
- Aspect Ratio: ${aspectRatio || '16:9'}
- Target Frame Rate: ${frameRate || '24fps'}
- Duration: ${duration || '10-15s'}
${specialEffects ? `- Special Effects: ${specialEffects}` : ''}
${audioDetails ? `- Audio / Sound Design Cues: ${audioDetails}` : ''}

NEGATIVE CONSTRAINTS:
${negativeRequirements || 'Avoid jitter, sudden morphing, camera clipping, stuttering frame rate, or warped anatomy.'}

PROMPT DIRECTIVE:
Synthesize this into a highly dense, authoritative prompt optimized for text-to-video generators (Runway Gen-2, Sora, Pika).`;
};

export const generateBusinessPrompt = (data: any) => {
  const {
    businessType, businessName, industry, productService, targetMarket, targetCustomer,
    businessGoal, problemStatement, problemToSolve, solution, uvp, competitors, 
    pricingModel, marketingChannels, toneOfVoice, brandVoice, budget, locationMarket,
    offer, cta, businessChallenges, desiredOutput, tone, outputFormat, promptPurpose, extraDetails
  } = data;

  const resolvedProblem = problemStatement || problemToSolve || 'Customer friction, inefficiencies, or high cost of alternative solutions.';
  const resolvedTone = toneOfVoice || brandVoice || tone || 'Professional & Strategic';
  const resolvedFormat = outputFormat || 'Executive Strategy Document';
  const resolvedPurpose = promptPurpose || 'Go-To-Market & Growth Strategy';

  return `You are a Senior Management Consultant, Venture Partner, and Chief Marketing Officer.

STRATEGIC DOSSIER:
- Organization: "${businessName || 'PromptForge'}"
- Business Archetype: ${businessType || 'B2B SaaS'}
- Industry / Niche: ${industry || 'Artificial Intelligence & Software'}
- Target Market & ICP: ${targetMarket || targetCustomer || 'High-growth companies and proactive professionals'}
- Strategic Mission & Goal: ${businessGoal || 'Achieve product-market fit, scale recurring revenue, and establish market dominance.'}

MARKET POSITIONING & VALUE PROPOSITION:
- Problem Statement: ${resolvedProblem}
- Solution Framework: ${solution || productService || 'Streamlined, high-leverage digital workflow platform.'}
- Unique Value Proposition (UVP): ${uvp || offer || 'Delivering 10x faster execution with specialized domain accuracy.'}
${competitors ? `- Competitor Landscape: ${competitors}` : ''}
${pricingModel ? `- Pricing & Monetization Model: ${pricingModel}` : ''}
${marketingChannels ? `- Distribution Channels: ${marketingChannels}` : ''}

EXECUTIVE REQUIREMENTS:
- Primary Deliverable: ${resolvedPurpose}
- Output Structure: ${resolvedFormat}
- Voice & Tone: ${resolvedTone}

${extraDetails ? `SPECIFIC DIRECTIVES & CONSTRAINTS:\n${extraDetails}\n` : ''}
EXECUTION TASK:
Produce an exhaustive, highly structured, and actionable ${resolvedPurpose}. Avoid generic business clichés. Include concrete milestones, actionable execution steps, and quantifiable success metrics.`;
};
