import type { FormState, PromptOutput, VideoOnlyFormState, VideoOnlyPromptOutput } from '../types';

// The main generation logic is now on the server. This function calls our secure endpoint.
export const generateStyledPrompt = async (inputs: FormState): Promise<PromptOutput> => {
  try {
    const response = await fetch('/api/generatePrompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'styled', inputs }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.error || `Server error: ${response.statusText}`);
    }

    const result: PromptOutput = await response.json();
    return result;
  } catch (error) {
    console.error("Error calling generation endpoint:", error);
    throw new Error(`Failed to generate prompt: ${error instanceof Error ? error.message : 'An unknown error occurred.'}`);
  }
};

// The video-only logic is also on the server now. This function calls the same secure endpoint with a different type.
export const generateVideoOnlyPrompt = async (inputs: VideoOnlyFormState): Promise<VideoOnlyPromptOutput> => {
   try {
    const response = await fetch('/api/generatePrompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'video_only', inputs }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.error || `Server error: ${response.statusText}`);
    }

    const result: VideoOnlyPromptOutput = await response.json();
    return result;
  } catch (error) {
    console.error("Error calling video-only generation endpoint:", error);
    throw new Error(`Failed to generate prompt: ${error instanceof Error ? error.message : 'An unknown error occurred.'}`);
  }
};
