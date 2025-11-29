
import React from 'react';
import { SaboteurType } from './types';

interface IllustrationProps {
  className?: string;
  color?: string;
}

const StrokeFilter = () => (
  <defs>
    <filter id="displacement" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
);

// --- Base Shape Components for Reusability ---
const FaceBase: React.FC<{ children: React.ReactNode, className?: string, color?: string }> = ({ children, className, color }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ overflow: 'visible' }}>
    <StrokeFilter />
    {/* Color Blob Background (Misaligned print effect) */}
    {color && (
      <path 
        d="M20,20 Q50,10 80,20 T80,80 Q50,90 20,80 T20,20" 
        fill={color} 
        opacity="0.2" 
        transform="translate(5, 5)"
        style={{ mixBlendMode: 'multiply' }}
      />
    )}
    <g filter="url(#displacement)" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
  </svg>
);

// --- Individual Saboteurs ---

export const JudgeFace: React.FC<IllustrationProps> = ({ className, color }) => (
  <FaceBase className={className} color={color}>
    {/* Head */}
    <rect x="20" y="15" width="60" height="70" rx="5" />
    {/* Eyes */}
    <path d="M30,35 L45,40 M70,35 L55,40" strokeWidth="3" /> {/* Angry Brows */}
    <circle cx="35" cy="45" r="3" fill="currentColor" />
    <circle cx="65" cy="45" r="3" fill="currentColor" />
    {/* Nose */}
    <path d="M50,45 L45,60 L55,60" />
    {/* Mouth */}
    <path d="M35,75 Q50,65 65,75" />
    {/* Hair */}
    <path d="M20,15 L25,5 L35,15 L45,5 L55,15 L65,5 L75,15 L80,15" />
  </FaceBase>
);

export const ControllerFace: React.FC<IllustrationProps> = ({ className, color }) => (
  <FaceBase className={className} color={color}>
    {/* Head - Trapezoid */}
    <path d="M25,20 L75,20 L85,80 L15,80 Z" />
    {/* Eyes - Intense */}
    <circle cx="35" cy="40" r="8" />
    <circle cx="35" cy="40" r="2" fill="currentColor" />
    <circle cx="65" cy="40" r="8" />
    <circle cx="65" cy="40" r="2" fill="currentColor" />
    {/* Brows */}
    <path d="M25,30 L45,35 M75,30 L55,35" strokeWidth="3" />
    {/* Mouth - Gritted */}
    <rect x="35" y="60" width="30" height="10" rx="2" />
    <path d="M35,65 L65,65 M45,60 L45,70 M55,60 L55,70" />
  </FaceBase>
);

export const SticklerFace: React.FC<IllustrationProps> = ({ className, color }) => (
  <FaceBase className={className} color={color}>
    {/* Head - Perfect Rectangle */}
    <rect x="25" y="20" width="50" height="60" />
    {/* Glasses */}
    <circle cx="40" cy="45" r="8" />
    <circle cx="60" cy="45" r="8" />
    <path d="M48,45 L52,45 M25,45 L32,45 M68,45 L75,45" />
    {/* Mouth - Straight line */}
    <path d="M40,70 L60,70" strokeWidth="3" />
    {/* Hair - Neat part */}
    <path d="M25,30 Q30,20 75,20" fill="none" />
    <path d="M60,20 L60,25" />
  </FaceBase>
);

export const PleaserFace: React.FC<IllustrationProps> = ({ className, color }) => (
  <FaceBase className={className} color={color}>
    {/* Head - Round oval */}
    <ellipse cx="50" cy="50" rx="30" ry="35" />
    {/* Eyes - Big arches */}
    <path d="M35,45 Q40,35 45,45" />
    <path d="M55,45 Q60,35 65,45" />
    {/* Cheeks */}
    <path d="M30,55 Q35,60 40,55" opacity="0.5" />
    <path d="M60,55 Q65,60 70,55" opacity="0.5" />
    {/* Mouth - Big Smile */}
    <path d="M35,65 Q50,85 65,65" />
  </FaceBase>
);

export const HyperAchieverFace: React.FC<IllustrationProps> = ({ className, color }) => (
  <FaceBase className={className} color={color}>
    {/* Head - Tall */}
    <path d="M30,20 L70,20 L75,80 L25,80 Z" />
    {/* Hair - Spiky/Crown like */}
    <path d="M30,20 L30,10 L40,20 L50,10 L60,20 L70,10 L70,20" />
    {/* Eyes - Winking/Confident */}
    <path d="M35,45 L45,40 M45,45 L35,40" /> {/* Wink */}
    <circle cx="65" cy="42" r="4" />
    <circle cx="65" cy="42" r="1" fill="currentColor" />
    {/* Smile - Toothy */}
    <path d="M35,65 Q50,75 65,65 Z" />
    <path d="M35,65 Q50,68 65,65" />
  </FaceBase>
);

export const VictimFace: React.FC<IllustrationProps> = ({ className, color }) => (
  <FaceBase className={className} color={color}>
    {/* Head - Drooping */}
    <path d="M30,25 Q50,15 70,25 L65,85 Q50,95 35,85 Z" />
    {/* Eyes - Sad */}
    <path d="M35,45 Q40,40 45,45" />
    <path d="M55,45 Q60,40 65,45" />
    <circle cx="40" cy="48" r="1.5" fill="currentColor" />
    <circle cx="60" cy="48" r="1.5" fill="currentColor" />
    {/* Tear */}
    <path d="M60,55 Q63,60 60,65 Q57,60 60,55" fill={color || "currentColor"} stroke="none" />
    <path d="M60,55 Q63,60 60,65 Q57,60 60,55" fill="none" stroke="currentColor" strokeWidth="1" />
    {/* Mouth - Wobbly Frown */}
    <path d="M40,75 Q50,70 60,75" />
  </FaceBase>
);

export const HyperRationalFace: React.FC<IllustrationProps> = ({ className, color }) => (
  <FaceBase className={className} color={color}>
    {/* Head - Boxy */}
    <rect x="25" y="20" width="50" height="55" rx="2" />
    {/* Eyes - Lines */}
    <path d="M35,40 L45,40" />
    <path d="M55,40 L65,40" />
    {/* Nose - Triangle */}
    <path d="M50,45 L45,55 L55,55 Z" />
    {/* Mouth - Flat Zigzag */}
    <path d="M35,70 L40,65 L45,70 L50,65 L55,70 L60,65 L65,70" />
    {/* Antenna (Robot vibe) */}
    <path d="M50,20 L50,10" />
    <circle cx="50" cy="8" r="3" />
  </FaceBase>
);

export const HyperVigilantFace: React.FC<IllustrationProps> = ({ className, color }) => (
  <FaceBase className={className} color={color}>
    {/* Head - Oval */}
    <path d="M25,30 Q50,10 75,30 Q80,50 75,80 Q50,90 25,80 Q20,50 25,30" />
    {/* Eyes - Huge and Staring */}
    <circle cx="35" cy="45" r="10" fill="white" />
    <circle cx="35" cy="45" r="2" fill="currentColor" />
    <circle cx="65" cy="45" r="10" fill="white" />
    <circle cx="65" cy="45" r="2" fill="currentColor" />
    {/* Mouth - Squiggly nervous */}
    <path d="M40,70 Q45,65 50,70 T60,70" />
    {/* Sweat drops */}
    <path d="M15,40 L20,35 M85,40 L80,35" strokeWidth="2" />
  </FaceBase>
);

export const RestlessFace: React.FC<IllustrationProps> = ({ className, color }) => (
  <FaceBase className={className} color={color}>
    {/* Head - Messy */}
    <path d="M30,30 Q50,25 70,30 L75,75 Q50,85 25,75 Z" />
    {/* Hair - Scribble */}
    <path d="M20,30 Q25,10 40,20 T60,10 T80,30" strokeWidth="2" />
    {/* Eyes - Asymmetric */}
    <circle cx="35" cy="45" r="6" />
    <circle cx="35" cy="45" r="2" fill="currentColor" />
    <circle cx="65" cy="42" r="8" />
    <circle cx="65" cy="42" r="2" fill="currentColor" />
    {/* Mouth - Open circle */}
    <circle cx="50" cy="65" r="5" />
  </FaceBase>
);

// --- Composite Logo for Header ---
export const SaboteurLogo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative ${className} flex items-center justify-center`}>
      {/* Outer circular frame/mask */}
      <div className="absolute inset-0 rounded-full border-4 border-sketch-rust/30 dark:border-sketch-rust/50 bg-[#F5F2E8] dark:bg-[#252525] overflow-hidden shadow-inner">
          {/* Background Texture */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
             <filter id="noise">
               <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
             </filter>
             <rect width="100%" height="100%" filter="url(#noise)"/>
          </svg>
          
          {/* Tightly Packed Grid of Saboteurs to mimic the reference cluster */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0 transform scale-125">
             <div className="text-sketch-slate opacity-80 transform -translate-x-2 -translate-y-2">
                <HyperAchieverFace className="w-full h-full" color="#365E85" />
             </div>
             <div className="text-sketch-ochre opacity-80 transform translate-x-2 -translate-y-2">
                <SticklerFace className="w-full h-full" color="#D99834" />
             </div>
             <div className="text-sketch-sage opacity-80 transform -translate-x-2 translate-y-2">
                <VictimFace className="w-full h-full" color="#5FA686" />
             </div>
             <div className="text-sketch-clay opacity-80 transform translate-x-2 translate-y-2">
                <ControllerFace className="w-full h-full" color="#DE6E4B" />
             </div>
          </div>
          
          {/* Center Piece (The Judge) - Breaking the grid */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 z-10 drop-shadow-lg">
             <div className="w-full h-full bg-[#FDFBF7] dark:bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg border-2 border-sketch-rust/20">
                <JudgeFace className="w-full h-full text-sketch-rust" color="#D94F3D" />
             </div>
          </div>
      </div>
      
      {/* Decorative Outer Ring Doodle */}
      <div className="absolute -inset-1 rounded-full border-2 border-sketch-slate/20 dark:border-white/10 border-dashed animate-[spin_60s_linear_infinite]"></div>
  </div>
);

// --- Doodles & Decor ---

export const DoodleArrow: React.FC<IllustrationProps> = ({ className, color }) => (
  <svg viewBox="0 0 100 50" className={className} style={{ overflow: 'visible' }}>
    <StrokeFilter />
    <g filter="url(#displacement)" stroke={color || "currentColor"} strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M10,25 Q50,5 90,25" />
      <path d="M80,15 L90,25 L80,35" />
    </g>
  </svg>
);

export const DoodleStar: React.FC<IllustrationProps> = ({ className, color }) => (
  <svg viewBox="0 0 50 50" className={className} style={{ overflow: 'visible' }}>
     <StrokeFilter />
     <path 
       filter="url(#displacement)" 
       d="M25,5 L30,20 L45,20 L35,30 L40,45 L25,35 L10,45 L15,30 L5,20 L20,20 Z" 
       stroke={color || "currentColor"} 
       strokeWidth="2" 
       fill="none" 
       strokeLinejoin="round"
     />
  </svg>
);

export const DoodleCoil: React.FC<IllustrationProps> = ({ className, color }) => (
  <svg viewBox="0 0 100 50" className={className} style={{ overflow: 'visible' }}>
    <StrokeFilter />
    <path 
      filter="url(#displacement)"
      d="M10,25 C20,10 30,40 40,25 C50,10 60,40 70,25 C80,10 90,40 100,25"
      stroke={color || "currentColor"}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export const DoodleUnderline: React.FC<IllustrationProps> = ({ className, color }) => (
  <svg viewBox="0 0 200 20" className={className} preserveAspectRatio="none">
    <StrokeFilter />
    <path 
      filter="url(#displacement)"
      d="M5,10 Q50,15 100,5 T195,10"
      stroke={color || "currentColor"}
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);


export const getSaboteurFace = (type: SaboteurType, className?: string, color?: string) => {
  const props = { className, color };
  switch (type) {
    case SaboteurType.Judge: return <JudgeFace {...props} />;
    case SaboteurType.Controller: return <ControllerFace {...props} />;
    case SaboteurType.Stickler: return <SticklerFace {...props} />;
    case SaboteurType.Pleaser: return <PleaserFace {...props} />;
    case SaboteurType.HyperAchiever: return <HyperAchieverFace {...props} />;
    case SaboteurType.Victim: return <VictimFace {...props} />;
    case SaboteurType.HyperRational: return <HyperRationalFace {...props} />;
    case SaboteurType.HyperVigilant: return <HyperVigilantFace {...props} />;
    case SaboteurType.Restless: return <RestlessFace {...props} />;
    default: return <JudgeFace {...props} />;
  }
};
