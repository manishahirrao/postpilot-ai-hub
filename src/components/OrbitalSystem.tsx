import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface OrbitalNode {
  id: string;
  radius: number;
  speed: number;
  size: number;
  color: string;
  delay: number;
  opacity: number;
}

interface OrbitalSystemProps {
  centerSize?: number;
  nodes?: OrbitalNode[];
  className?: string;
  interactive?: boolean;
}

const defaultNodes: OrbitalNode[] = [
  {
    id: "node-1",
    radius: 60,
    speed: 15,
    size: 8,
    color: "from-cyan-400 to-blue-500",
    delay: 0,
    opacity: 0.8
  },
  {
    id: "node-2",
    radius: 90,
    speed: 25,
    size: 6,
    color: "from-purple-400 to-pink-500",
    delay: 2,
    opacity: 0.7
  },
  {
    id: "node-3",
    radius: 120,
    speed: 35,
    size: 10,
    color: "from-blue-400 to-cyan-500",
    delay: 4,
    opacity: 0.6
  },
  {
    id: "node-4",
    radius: 150,
    speed: 45,
    size: 4,
    color: "from-pink-400 to-purple-500",
    delay: 6,
    opacity: 0.5
  },
  {
    id: "node-5",
    radius: 180,
    speed: 60,
    size: 7,
    color: "from-indigo-400 to-blue-500",
    delay: 8,
    opacity: 0.4
  }
];

export function OrbitalSystem({ 
  centerSize = 40, 
  nodes = defaultNodes, 
  className = "",
  interactive = false 
}: OrbitalSystemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      {/* Orbital Rings */}
      {nodes.map((node, index) => (
        <motion.div
          key={`ring-${node.id}`}
          className="absolute border border-purple-300/20 rounded-full"
          style={{
            width: node.radius * 2,
            height: node.radius * 2,
            left: `calc(50% - ${node.radius}px)`,
            top: `calc(50% - ${node.radius}px)`,
          }}
          animate={{
            rotate: 360,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{
            rotate: {
              duration: node.speed,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 0.3,
              ease: "easeInOut",
            }
          }}
        />
      ))}

      {/* Center Hub */}
      <motion.div
        className="absolute bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
        style={{
          width: centerSize,
          height: centerSize,
          left: `calc(50% - ${centerSize / 2}px)`,
          top: `calc(50% - ${centerSize / 2}px)`,
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          boxShadow: isHovered 
            ? "0 0 30px rgba(168, 85, 247, 0.6)"
            : "0 0 20px rgba(168, 85, 247, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Orbital Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className={`absolute bg-gradient-to-r ${node.color} rounded-full`}
          style={{
            width: node.size,
            height: node.size,
            opacity: node.opacity,
          }}
          animate={{
            x: [
              `calc(50% - ${node.size / 2}px + ${node.radius}px)`,
              `calc(50% - ${node.size / 2}px)`,
              `calc(50% - ${node.size / 2}px - ${node.radius}px)`,
              `calc(50% - ${node.size / 2}px)`,
              `calc(50% - ${node.size / 2}px + ${node.radius}px)`,
            ],
            y: [
              `calc(50% - ${node.size / 2}px)`,
              `calc(50% - ${node.size / 2}px - ${node.radius}px)`,
              `calc(50% - ${node.size / 2}px)`,
              `calc(50% - ${node.size / 2}px + ${node.radius}px)`,
              `calc(50% - ${node.size / 2}px)`,
            ],
            scale: isHovered ? 1.3 : 1,
          }}
          transition={{
            x: {
              duration: node.speed,
              repeat: Infinity,
              ease: "linear",
              delay: node.delay,
            },
            y: {
              duration: node.speed,
              repeat: Infinity,
              ease: "linear",
              delay: node.delay,
            },
            scale: {
              duration: 0.3,
              ease: "easeInOut",
            }
          }}
        />
      ))}

      {/* Connecting Lines */}
      {interactive && isHovered && nodes.map((node, index) => (
        <motion.div
          key={`line-${node.id}`}
          className="absolute border-t border-purple-400/30"
          style={{
            width: node.radius,
            left: `calc(50% + ${centerSize / 2}px)`,
            top: `calc(50% - 0.5px)`,
            transformOrigin: 'left center',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: node.speed,
            repeat: Infinity,
            ease: "linear",
            delay: node.delay,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
        />
      ))}
    </div>
  );
}

// Complex Multi-Layer Orbital System
export function ComplexOrbitalSystem({ className = "" }: { className?: string }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.016); // ~60fps
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const layers = [
    {
      radius: 100,
      nodes: 6,
      speed: 0.5,
      nodeSize: 6,
      color: "from-cyan-400 to-blue-500",
      opacity: 0.7,
    },
    {
      radius: 150,
      nodes: 8,
      speed: -0.3,
      nodeSize: 4,
      color: "from-purple-400 to-pink-500",
      opacity: 0.6,
    },
    {
      radius: 200,
      nodes: 12,
      speed: 0.2,
      nodeSize: 8,
      color: "from-blue-400 to-cyan-500",
      opacity: 0.5,
    },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Central Pulsing Core */}
      <motion.div
        className="absolute w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
        style={{
          left: 'calc(50% - 32px)',
          top: 'calc(50% - 32px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            "0 0 20px rgba(168, 85, 247, 0.3)",
            "0 0 40px rgba(168, 85, 247, 0.8)",
            "0 0 20px rgba(168, 85, 247, 0.3)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dynamic Orbital Layers */}
      {layers.map((layer, layerIndex) => (
        <div key={`layer-${layerIndex}`} className="absolute inset-0">
          {/* Orbital Ring */}
          <motion.div
            className="absolute border border-purple-300/20 rounded-full"
            style={{
              width: layer.radius * 2,
              height: layer.radius * 2,
              left: `calc(50% - ${layer.radius}px)`,
              top: `calc(50% - ${layer.radius}px)`,
            }}
            animate={{
              rotate: layer.speed > 0 ? 360 : -360,
            }}
            transition={{
              duration: Math.abs(20 / layer.speed),
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Orbital Nodes */}
          {Array.from({ length: layer.nodes }).map((_, nodeIndex) => {
            const angle = (nodeIndex / layer.nodes) * 2 * Math.PI + time * layer.speed;
            const x = Math.cos(angle) * layer.radius;
            const y = Math.sin(angle) * layer.radius;

            return (
              <motion.div
                key={`node-${layerIndex}-${nodeIndex}`}
                className={`absolute bg-gradient-to-r ${layer.color} rounded-full`}
                style={{
                  width: layer.nodeSize,
                  height: layer.nodeSize,
                  left: `calc(50% + ${x}px - ${layer.nodeSize / 2}px)`,
                  top: `calc(50% + ${y}px - ${layer.nodeSize / 2}px)`,
                  opacity: layer.opacity,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2 + layerIndex,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: nodeIndex * 0.2,
                }}
              />
            );
          })}
        </div>
      ))}

      {/* Energy Pulses */}
      <motion.div
        className="absolute w-32 h-32 border-2 border-purple-400/30 rounded-full"
        style={{
          left: 'calc(50% - 64px)',
          top: 'calc(50% - 64px)',
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="absolute w-48 h-48 border border-cyan-400/20 rounded-full"
        style={{
          left: 'calc(50% - 96px)',
          top: 'calc(50% - 96px)',
        }}
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.2, 0, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeOut",
          delay: 2,
        }}
      />
    </div>
  );
}