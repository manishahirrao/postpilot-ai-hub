import { motion } from "framer-motion";

interface OrbitLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function OrbitLogo({ size = "md", className = "" }: OrbitLogoProps) {
  const sizes = {
    sm: { container: "w-8 h-8", nucleus: "w-3 h-3", ring1: "w-6 h-6", ring2: "w-8 h-8", node: "w-2 h-2" },
    md: { container: "w-10 h-10", nucleus: "w-4 h-4", ring1: "w-8 h-8", ring2: "w-10 h-10", node: "w-2.5 h-2.5" },
    lg: { container: "w-80 h-80", nucleus: "w-20 h-20", ring1: "w-40 h-40", ring2: "w-60 h-60", node: "w-8 h-8" }
  };

  const sizeConfig = sizes[size];

  return (
    <div className={`relative ${sizeConfig.container} ${className}`}>
      {/* Central nucleus */}
      <motion.div 
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${sizeConfig.nucleus} bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-2xl shadow-cyan-500/50`}
        animate={{ 
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px rgba(6, 182, 212, 0.5)",
            "0 0 40px rgba(139, 92, 246, 0.8)",
            "0 0 20px rgba(6, 182, 212, 0.5)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Concentric rings */}
      <motion.div 
        className={`orbital-ring ${sizeConfig.ring1} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-cyan-500/30`}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className={`orbital-ring ${sizeConfig.ring2} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-purple-500/30`}
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      {size === "lg" && (
        <motion.div 
          className="orbital-ring w-80 h-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-blue-500/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      {/* Orbital nodes */}
      <motion.div 
        className={`orbital-node ${sizeConfig.node} top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50`}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className={`orbital-node ${sizeConfig.node} bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg shadow-purple-500/50`}
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div 
        className={`orbital-node ${sizeConfig.node} left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-cyan-500 shadow-lg shadow-blue-500/50`}
        animate={{ x: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div 
        className={`orbital-node ${sizeConfig.node} right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-400 to-purple-500 shadow-lg shadow-violet-500/50`}
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4.5 }}
      />
    </div>
  );
}
