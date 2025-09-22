
import React, { useState, useCallback } from 'react';
import type { FormState, PromptOutput, VideoOnlyFormState, VideoOnlyPromptOutput } from './types';
import { generateStyledPrompt, generateVideoOnlyPrompt } from './services/geminiService';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';
import Header from './components/Header';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import VideoOnlyInputForm from './components/VideoOnlyInputForm';
import VideoOnlyOutputDisplay from './components/VideoOnlyOutputDisplay';

const App: React.FC = () => {
  // State for the main Photo + Video workflow
  const [formState, setFormState] = useState<FormState>({
    vibe: "",
    photoStyle: "General",
    outfitImage: null,
    manualWardrobe: "",
    videoVibe: "General",
    poseStyle: "General",
    actionText: "",
    keepLuxuryLayer: true,
    isCloseup: false,
    isMidShot: false,
    isFullBody: false,
  });
  const [promptOutput, setPromptOutput] = useState<PromptOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State for the Video-Only workflow
  const [videoOnlyFormState, setVideoOnlyFormState] = useState<VideoOnlyFormState>({
    videoVibe: "General",
    poseStyle: "General",
    actionText: "",
    refImage: null,
    keepLuxuryLayer: true,
  });
  const [videoOnlyOutput, setVideoOnlyOutput] = useState<VideoOnlyPromptOutput | null>(null);
  const [isVideoOnlyLoading, setIsVideoOnlyLoading] = useState<boolean>(false);
  const [videoOnlyError, setVideoOnlyError] = useState<string | null>(null);


  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setPromptOutput(null);

    try {
      // Pass the state directly to the generation service.
      // Outfit logic is now handled inside geminiService.
      const result = await generateStyledPrompt(formState);
      setPromptOutput(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [formState]);

  const handleVideoOnlyGenerate = useCallback(async () => {
    setIsVideoOnlyLoading(true);
    setVideoOnlyError(null);
    setVideoOnlyOutput(null);
    try {
      const result = await generateVideoOnlyPrompt(videoOnlyFormState);
      setVideoOnlyOutput(result);
    } catch (err) {
      console.error(err);
      setVideoOnlyError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsVideoOnlyLoading(false);
    }
  }, [videoOnlyFormState]);


  return (
    <div className="min-h-screen font-sans">
      <main className="max-w-[1180px] mx-auto px-4 pb-12">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-5">
          
          <div className="lg:sticky lg:top-5 self-start space-y-5">
            <InputForm
              formState={formState}
              setFormState={setFormState}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
            <VideoOnlyInputForm
              formState={videoOnlyFormState}
              // FIX: Pass the correct state setter for the video-only form to resolve the type mismatch.
              setFormState={setVideoOnlyFormState}
              onGenerate={handleVideoOnlyGenerate}
              isLoading={isVideoOnlyLoading}
            />
          </div>

          <div className="mt-6 lg:mt-0 space-y-6">
            {isLoading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {promptOutput && !isLoading && <OutputDisplay output={promptOutput} />}
             {!isLoading && !error && !promptOutput && (
                <div className="flex flex-col items-center justify-center h-full min-h-[50vh] bg-aimuse-pearl/30 rounded-aimuse p-8 border border-aimuse-stroke shadow-atelier-inset">
                    <h2 className="text-2xl font-serif font-bold text-aimuse-ink/70">Your styled prompts will appear here</h2>
                    <p className="text-aimuse-muted mt-2">Enter a vibe and click "Generate" to start.</p>
                </div>
            )}
            
            {isVideoOnlyLoading && !isLoading && <Loader />}
            {videoOnlyError && <ErrorMessage message={videoOnlyError} />}
            {videoOnlyOutput && !isVideoOnlyLoading && <VideoOnlyOutputDisplay output={videoOnlyOutput} />}
            
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-aimuse-muted text-xs mt-2.5 max-w-[1120px] mx-auto px-4">
        <p>© AiMUSE Visuals Atelier</p>
      </footer>
    </div>
  );
};

export default App;
