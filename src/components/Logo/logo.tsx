import React from 'react';

interface AgentOSLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const AgentOSLogo = ({ size = 'md' }: AgentOSLogoProps) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <svg 
      viewBox="0 0 110 110" 
      xmlns="http://www.w3.org/2000/svg"
      className={sizeMap[size]}
    >
      <defs>
        {/* Premium gradient */}
        <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0066ff', stopOpacity: 1 }} />
          <stop offset="35%" style={{ stopColor: '#00d4ff', stopOpacity: 1 }} />
          <stop offset="65%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Agent core glow */}
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
          <stop offset="70%" style={{ stopColor: '#00d4ff', stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: '#0066ff', stopOpacity: 0.3 }} />
        </radialGradient>
        
        {/* Advanced glow effect */}
        <filter id="advancedGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring representing the OS framework */}
      <circle cx="55" cy="55" r="45" fill="none" stroke="url(#primaryGradient)" strokeWidth="3" opacity="0.4"/>
      <circle cx="55" cy="55" r="35" fill="none" stroke="url(#primaryGradient)" strokeWidth="2" opacity="0.6"/>
      
      {/* Central AI Agent Core */}
      <circle cx="55" cy="55" r="20" fill="url(#coreGlow)" filter="url(#advancedGlow)"/>
      
      {/* Agent processing nodes */}
      <g opacity="0.9">
        <circle cx="35" cy="35" r="6" fill="url(#primaryGradient)">
          <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="75" cy="35" r="6" fill="url(#primaryGradient)">
          <animate attributeName="r" values="6;8;6" dur="3s" begin="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="35" cy="75" r="6" fill="url(#primaryGradient)">
          <animate attributeName="r" values="6;8;6" dur="3s" begin="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="75" cy="75" r="6" fill="url(#primaryGradient)">
          <animate attributeName="r" values="6;8;6" dur="3s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
      </g>
      
      {/* Dynamic data connections */}
      <g stroke="url(#primaryGradient)" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M35 35 Q55 25 75 35">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
        </path>
        <path d="M75 35 Q85 55 75 75">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.5s" repeatCount="indefinite"/>
        </path>
        <path d="M75 75 Q55 85 35 75">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="1s" repeatCount="indefinite"/>
        </path>
        <path d="M35 75 Q25 55 35 35">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="1.5s" repeatCount="indefinite"/>
        </path>
      </g>
      
      {/* Central agent indicator */}
      <circle cx="55" cy="55" r="8" fill="white" opacity="0.9"/>
      <circle cx="55" cy="55" r="4" fill="url(#primaryGradient)">
        <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      
      {/* Orbital efficiency indicators */}
      <g stroke="url(#primaryGradient)" strokeWidth="1" fill="none" opacity="0.3">
        <circle cx="55" cy="55" r="25">
          <animateTransform attributeName="transform" type="rotate" values="0 55 55;360 55 55" dur="20s" repeatCount="indefinite"/>
        </circle>
        <circle cx="55" cy="55" r="30">
          <animateTransform attributeName="transform" type="rotate" values="360 55 55;0 55 55" dur="25s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  );
};

export default AgentOSLogo;