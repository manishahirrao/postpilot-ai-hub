import React from 'react';

const AnimatedAgentIcon: React.FC = () => {
  return (
    <div className="w-32 h-32 flex items-center justify-center">
      <svg 
        viewBox="0 0 120 120" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Premium gradient */}
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#0066ff', stopOpacity:1}} />
            <stop offset="35%" style={{stopColor:'#00d4ff', stopOpacity:1}} />
            <stop offset="65%" style={{stopColor:'#7c3aed', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#ec4899', stopOpacity:1}} />
          </linearGradient>
          
          {/* Agent core glow */}
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:0.9}} />
            <stop offset="70%" style={{stopColor:'#00d4ff', stopOpacity:0.6}} />
            <stop offset="100%" style={{stopColor:'#0066ff', stopOpacity:0.3}} />
          </radialGradient>
          
          {/* Advanced glow effect */}
          <filter id="advancedGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer rings representing the OS framework */}
        <circle 
          cx="60" 
          cy="60" 
          r="50" 
          fill="none" 
          stroke="url(#primaryGradient)" 
          strokeWidth="2" 
          opacity="0.3"
        />
        <circle 
          cx="60" 
          cy="60" 
          r="40" 
          fill="none" 
          stroke="url(#primaryGradient)" 
          strokeWidth="2" 
          opacity="0.5"
        />
        
        {/* Central AI Agent Core */}
        <circle 
          cx="60" 
          cy="60" 
          r="22" 
          fill="url(#coreGlow)" 
          filter="url(#advancedGlow)"
        />
        
        {/* Agent processing nodes with animations */}
        <g opacity="0.9">
          <circle cx="40" cy="40" r="6" fill="url(#primaryGradient)">
            <animate 
              attributeName="r" 
              values="6;9;6" 
              dur="3s" 
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="80" cy="40" r="6" fill="url(#primaryGradient)">
            <animate 
              attributeName="r" 
              values="6;9;6" 
              dur="3s" 
              begin="1s" 
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="40" cy="80" r="6" fill="url(#primaryGradient)">
            <animate 
              attributeName="r" 
              values="6;9;6" 
              dur="3s" 
              begin="2s" 
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="80" cy="80" r="6" fill="url(#primaryGradient)">
            <animate 
              attributeName="r" 
              values="6;9;6" 
              dur="3s" 
              begin="0.5s" 
              repeatCount="indefinite"
            />
          </circle>
        </g>
        
        {/* Dynamic data connections */}
        <g stroke="url(#primaryGradient)" strokeWidth="2" fill="none" opacity="0.7">
          <path d="M40 40 Q60 30 80 40">
            <animate 
              attributeName="opacity" 
              values="0.4;1;0.4" 
              dur="2s" 
              repeatCount="indefinite"
            />
          </path>
          <path d="M80 40 Q90 60 80 80">
            <animate 
              attributeName="opacity" 
              values="0.4;1;0.4" 
              dur="2s" 
              begin="0.5s" 
              repeatCount="indefinite"
            />
          </path>
          <path d="M80 80 Q60 90 40 80">
            <animate 
              attributeName="opacity" 
              values="0.4;1;0.4" 
              dur="2s" 
              begin="1s" 
              repeatCount="indefinite"
            />
          </path>
          <path d="M40 80 Q30 60 40 40">
            <animate 
              attributeName="opacity" 
              values="0.4;1;0.4" 
              dur="2s" 
              begin="1.5s" 
              repeatCount="indefinite"
            />
          </path>
        </g>
        
        {/* Central agent indicator */}
        <circle cx="60" cy="60" r="10" fill="white" opacity="0.9"/>
        <circle cx="60" cy="60" r="5" fill="url(#primaryGradient)">
          <animate 
            attributeName="r" 
            values="5;7;5" 
            dur="1.5s" 
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Orbital efficiency indicators */}
        <g stroke="url(#primaryGradient)" strokeWidth="1" fill="none" opacity="0.2">
          <circle cx="60" cy="60" r="28">
            <animateTransform 
              attributeName="transform" 
              type="rotate" 
              values="0 60 60;360 60 60" 
              dur="20s" 
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="60" cy="60" r="33">
            <animateTransform 
              attributeName="transform" 
              type="rotate" 
              values="360 60 60;0 60 60" 
              dur="25s" 
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default AnimatedAgentIcon;