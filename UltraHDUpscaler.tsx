import React, { useState, useRef, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import type { OutfitImage } from '../types';

// Add Juxtapose to the window object for TypeScript
declare global {
  interface Window {
    juxtapose: any;
  }
}

const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div>
        <label className="block text-sm font-semibold text-aimuse-text mb-1.5">{label}</label>
        {children}
    </div>
);

const Slider: React.FC<{
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ label, value, min, max, step, onChange }) => (
    <div>
        <label className="flex justify-between text-sm font-medium text-aimuse-text mb-1.5">
            <span>{label}</span>
            <span>{value.toFixed(2)}</span>
        </label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-aimuse-blush/50 rounded-lg appearance-none cursor-pointer accent-aimuse-blue"
        />
    </div>
);


const UltraHDUpscaler: React.FC = () => {
    const [inputImage, setInputImage] = useState<OutfitImage | null>(null);
    const [showSlider, setShowSlider] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    // State for sharpening controls
    const [microDetail, setMicroDetail] = useState(0.7);
    const [clarity, setClarity] = useState(0.5);
    const [edgeProtect, setEdgeProtect] = useState(0.6);
    const [dehalo, setDehalo] = useState(0.18);
    const [upscale4k, setUpscale4k] = useState(false);

    useEffect(() => {
        if (showSlider && inputImage && sliderRef.current && window.juxtapose) {
            sliderRef.current.innerHTML = '';

            const sliderId = `juxtapose-slider-${Date.now()}`;
            const sliderContainer = document.createElement('div');
            sliderContainer.id = sliderId;
            sliderContainer.style.height = '460px';
            sliderContainer.style.maxWidth = '100%';
            sliderRef.current.appendChild(sliderContainer);

            const beforeImageUrl = `data:${inputImage.mimeType};base64,${inputImage.base64}`;
            const afterImageUrl = beforeImageUrl; // Placeholder

            new window.juxtapose.JXSlider(`#${sliderId}`, [
                { src: beforeImageUrl, label: "Before" },
                { src: afterImageUrl, label: "After (Ultra Crisp Sharp)" }
            ], {
                animate: true,
                showLabels: true,
                showCredits: false,
                startingPosition: "50%",
                makeResponsive: true
            });
        }
    }, [showSlider, inputImage]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setShowSlider(false);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = (reader.result as string).split(',')[1];
                setInputImage({ base64: base64String, mimeType: file.type });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleApplySharpen = () => {
        setIsLoading(true);
        setTimeout(() => {
            alert("Ultra Crisp Sharpener feature is not yet available. Showing comparison slider with the original image for UI demonstration.");
            setShowSlider(true);
            setIsLoading(false);
        }, 1000);
    };

    const commonFileStyles = "block w-full text-sm text-aimuse-muted file:mr-4 file:py-2 file:px-4 file:rounded-form file:border-0 file:text-sm file:font-semibold file:bg-aimuse-blue/20 file:text-aimuse-blue-dark hover:file:bg-aimuse-blue/30 file:transition-colors file:cursor-pointer";

    return (
        <div className="bg-aimuse-pearl/80 backdrop-blur-md border border-aimuse-stroke rounded-aimuse shadow-aimuse-pro p-[18px] pb-4 space-y-5">
            <SectionHeader title="Ultra Crisp Sharpener (optional)" />
            <div className="space-y-4">
                <FormField label="Drop a photo to sharpen (works great on SDXL/MJ outputs)">
                    <input id="uhd-file-input" type="file" accept="image/*" onChange={handleFileChange} className={commonFileStyles} />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                    <Slider label="Micro-detail (fine edges)" min={0} max={1} step={0.05} value={microDetail} onChange={e => setMicroDetail(parseFloat(e.target.value))} />
                    <Slider label="Clarity (mid-tone contrast)" min={0} max={1} step={0.05} value={clarity} onChange={e => setClarity(parseFloat(e.target.value))} />
                    <Slider label="Edge protection (reduce halos)" min={0} max={1} step={0.05} value={edgeProtect} onChange={e => setEdgeProtect(parseFloat(e.target.value))} />
                    <Slider label="Halo suppression" min={0} max={0.3} step={0.02} value={dehalo} onChange={e => setDehalo(parseFloat(e.target.value))} />
                </div>

                <div className="flex items-center gap-2 pt-1">
                    <input 
                        type="checkbox" 
                        id="upscale4k" 
                        checked={upscale4k} 
                        onChange={e => setUpscale4k(e.target.checked)} 
                        className="h-4 w-4 rounded border-aimuse-stroke-dark text-aimuse-blue focus:ring-aimuse-blue"
                    />
                    <label htmlFor="upscale4k" className="text-sm font-medium text-aimuse-text">Also upscale to ~4K</label>
                </div>

                <div className="pt-2">
                    <button
                        type="button"
                        onClick={handleApplySharpen}
                        disabled={!inputImage || isLoading}
                        className="w-full flex justify-center items-center gap-2 px-4 py-3 border-none text-base font-semibold rounded-btn shadow-atelier-btn text-aimuse-ink bg-gradient-to-br from-aimuse-blue to-aimuse-blue-dark hover:shadow-lg hover:shadow-aimuse-blue/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aimuse-blue/50 focus:ring-offset-aimuse-pearl disabled:from-gray-400 disabled:to-gray-500 disabled:text-white disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none disabled:brightness-100 transition-all active:translate-y-0"
                    >
                        {isLoading ? 'Applying...' : 'Apply Ultra Crisp Sharpener'}
                    </button>
                </div>
                
                {isLoading && (
                     <div className="flex justify-center items-center p-6">
                        <div className="w-8 h-8 border-4 border-t-aimuse-blue border-aimuse-blue/20 rounded-full animate-spin" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}

                {showSlider && inputImage && (
                    <div className="pt-4 space-y-4">
                        <div ref={sliderRef} className="rounded-output overflow-hidden border border-aimuse-stroke-dark">
                           {/* Juxtapose slider renders here */}
                        </div>
                        <FormField label="Download result">
                            <a 
                                href={`data:${inputImage.mimeType};base64,${inputImage.base64}`} 
                                download="AiMUSE_crisp.png"
                                className="inline-block w-full text-center px-4 py-3 border border-aimuse-stroke-dark text-base font-semibold rounded-btn shadow-sm bg-white text-aimuse-text hover:bg-aimuse-blush hover:shadow-md hover:-translate-y-px transition-all"
                            >
                                Download Image
                            </a>
                        </FormField>
                    </div>
                )}
                 {!showSlider && !isLoading && !inputImage && (
                    <div className="text-center py-8 text-aimuse-muted text-sm">
                        <p>Upload an image to get started.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default UltraHDUpscaler;